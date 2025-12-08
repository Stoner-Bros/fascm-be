import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from 'src/order-details/infrastructure/persistence/relational/entities/order-detail.entity';
import { OrderInvoiceDetailEntity } from 'src/order-invoice-details/infrastructure/persistence/relational/entities/order-invoice-detail.entity';
import { OrderPhaseEntity } from 'src/order-phases/infrastructure/persistence/relational/entities/order-phase.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderScheduleValidationService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
    @InjectRepository(OrderInvoiceDetailEntity)
    private readonly orderInvoiceDetailRepository: Repository<OrderInvoiceDetailEntity>,
    @InjectRepository(OrderPhaseEntity)
    private readonly orderPhaseRepository: Repository<OrderPhaseEntity>,
  ) {}

  /**
   * Validate that total goods from all phases equal total goods from schedule
   * @param orderScheduleId - ID of the order schedule
   * @throws BadRequestException if validation fails
   */
  async validateTotalGoods(orderScheduleId: string): Promise<void> {
    // Get all order details for this schedule
    const orderDetails = await this.orderDetailRepository
      .createQueryBuilder('od')
      .leftJoin('od.order', 'o')
      .leftJoin('o.orderSchedule', 'os')
      .where('os.id = :orderScheduleId', { orderScheduleId })
      .getMany();

    if (!orderDetails || orderDetails.length === 0) {
      throw new BadRequestException('No order details found for this schedule');
    }

    // Calculate total from order details (grouped by product)
    const scheduleProductTotals = new Map<string, number>();
    for (const detail of orderDetails) {
      const productId = detail.product?.id;
      if (!productId) continue;

      const currentTotal = scheduleProductTotals.get(productId) || 0;
      scheduleProductTotals.set(
        productId,
        currentTotal + (detail.quantity || 0),
      );
    }

    // Get all phases for this schedule
    const phases = await this.orderPhaseRepository.find({
      where: { orderSchedule: { id: orderScheduleId } },
      relations: ['orderInvoice', 'orderInvoice.orderInvoiceDetails'],
    });

    if (!phases || phases.length === 0) {
      throw new BadRequestException('No phases found for this schedule');
    }

    // Calculate total from order invoice details (grouped by product)
    const phaseProductTotals = new Map<string, number>();
    for (const phase of phases) {
      if (!phase.orderInvoice?.orderInvoiceDetails) continue;

      for (const invoiceDetail of phase.orderInvoice.orderInvoiceDetails) {
        const productId = invoiceDetail.product?.id;
        if (!productId) continue;

        const currentTotal = phaseProductTotals.get(productId) || 0;
        phaseProductTotals.set(
          productId,
          currentTotal + (invoiceDetail.quantity || 0),
        );
      }
    }

    // Compare totals for each product
    const errors: string[] = [];

    // Check if all products in schedule are covered by phases
    for (const [productId, scheduleTotal] of scheduleProductTotals.entries()) {
      const phaseTotal = phaseProductTotals.get(productId) || 0;

      if (scheduleTotal !== phaseTotal) {
        errors.push(
          `Product ${productId}: Schedule quantity (${scheduleTotal}) does not match phases total (${phaseTotal})`,
        );
      }
    }

    // Check if phases have products not in schedule
    for (const [productId] of phaseProductTotals.entries()) {
      if (!scheduleProductTotals.has(productId)) {
        errors.push(
          `Product ${productId}: Found in phases but not in schedule`,
        );
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Order schedule validation failed',
        errors,
      });
    }
  }

  /**
   * Check if adding/updating a phase would exceed schedule totals
   * @param orderScheduleId - ID of the order schedule
   * @param newInvoiceDetails - New invoice details to be added
   * @param excludePhaseId - Phase ID to exclude from calculation (for updates)
   */
  async validatePhaseAddition(
    orderScheduleId: string,
    newInvoiceDetails: Array<{ productId: string; quantity: number }>,
    excludePhaseId?: string,
  ): Promise<void> {
    // Get schedule totals
    const orderDetails = await this.orderDetailRepository
      .createQueryBuilder('od')
      .leftJoin('od.order', 'o')
      .leftJoin('o.orderSchedule', 'os')
      .leftJoinAndSelect('od.product', 'p')
      .where('os.id = :orderScheduleId', { orderScheduleId })
      .getMany();

    const scheduleProductTotals = new Map<string, number>();
    for (const detail of orderDetails) {
      const productId = detail.product?.id;
      if (!productId) continue;

      const currentTotal = scheduleProductTotals.get(productId) || 0;
      scheduleProductTotals.set(
        productId,
        currentTotal + (detail.quantity || 0),
      );
    }

    // Get existing phase totals (excluding the one being updated)
    let phasesQuery = this.orderPhaseRepository
      .createQueryBuilder('op')
      .leftJoinAndSelect('op.orderInvoice', 'oi')
      .leftJoinAndSelect('oi.orderInvoiceDetails', 'oid')
      .leftJoinAndSelect('oid.product', 'p')
      .where('op.orderSchedule.id = :orderScheduleId', { orderScheduleId });

    if (excludePhaseId) {
      phasesQuery = phasesQuery.andWhere('op.id != :excludePhaseId', {
        excludePhaseId,
      });
    }

    const phases = await phasesQuery.getMany();

    const existingPhaseTotals = new Map<string, number>();
    for (const phase of phases) {
      if (!phase.orderInvoice?.orderInvoiceDetails) continue;

      for (const invoiceDetail of phase.orderInvoice.orderInvoiceDetails) {
        const productId = invoiceDetail.product?.id;
        if (!productId) continue;

        const currentTotal = existingPhaseTotals.get(productId) || 0;
        existingPhaseTotals.set(
          productId,
          currentTotal + (invoiceDetail.quantity || 0),
        );
      }
    }

    // Check if new details would exceed schedule totals
    const errors: string[] = [];
    for (const newDetail of newInvoiceDetails) {
      const scheduleTotal = scheduleProductTotals.get(newDetail.productId) || 0;
      const existingTotal = existingPhaseTotals.get(newDetail.productId) || 0;
      const newTotal = existingTotal + newDetail.quantity;

      if (newTotal > scheduleTotal) {
        errors.push(
          `Product ${newDetail.productId}: Total quantity (${newTotal}) would exceed schedule quantity (${scheduleTotal})`,
        );
      }
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Phase addition would exceed schedule limits',
        errors,
      });
    }
  }
}
