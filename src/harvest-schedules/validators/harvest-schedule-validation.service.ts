import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HarvestDetailEntity } from 'src/harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';
import { HarvestInvoiceDetailEntity } from 'src/harvest-invoice-details/infrastructure/persistence/relational/entities/harvest-invoice-detail.entity';
import { HarvestPhaseEntity } from 'src/harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';

@Injectable()
export class HarvestScheduleValidationService {
  constructor(
    @InjectRepository(HarvestDetailEntity)
    private readonly harvestDetailRepository: Repository<HarvestDetailEntity>,
    @InjectRepository(HarvestInvoiceDetailEntity)
    private readonly harvestInvoiceDetailRepository: Repository<HarvestInvoiceDetailEntity>,
    @InjectRepository(HarvestPhaseEntity)
    private readonly harvestPhaseRepository: Repository<HarvestPhaseEntity>,
  ) {}

  /**
   * Validate that total goods from all phases equal total goods from schedule
   * @param harvestScheduleId - ID of the harvest schedule
   * @throws BadRequestException if validation fails
   */
  async validateTotalGoods(harvestScheduleId: string): Promise<void> {
    // Get all harvest details for this schedule
    const harvestDetails = await this.harvestDetailRepository
      .createQueryBuilder('hd')
      .leftJoin('hd.harvestTicket', 'ht')
      .leftJoin('ht.harvestSchedule', 'hs')
      .where('hs.id = :harvestScheduleId', { harvestScheduleId })
      .getMany();

    if (!harvestDetails || harvestDetails.length === 0) {
      throw new BadRequestException(
        'No harvest details found for this schedule',
      );
    }

    // Calculate total from harvest details (grouped by product)
    const scheduleProductTotals = new Map<string, number>();
    for (const detail of harvestDetails) {
      const productId = detail.product?.id;
      if (!productId) continue;

      const currentTotal = scheduleProductTotals.get(productId) || 0;
      scheduleProductTotals.set(
        productId,
        currentTotal + (detail.quantity || 0),
      );
    }

    // Get all phases for this schedule
    const phases = await this.harvestPhaseRepository.find({
      where: { harvestSchedule: { id: harvestScheduleId } },
      relations: ['harvestInvoice', 'harvestInvoice.harvestInvoiceDetails'],
    });

    if (!phases || phases.length === 0) {
      throw new BadRequestException('No phases found for this schedule');
    }

    // Calculate total from harvest invoice details (grouped by product)
    const phaseProductTotals = new Map<string, number>();
    for (const phase of phases) {
      if (!phase.harvestInvoice?.harvestInvoiceDetails) continue;

      for (const invoiceDetail of phase.harvestInvoice.harvestInvoiceDetails) {
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
        message: 'Harvest schedule validation failed',
        errors,
      });
    }
  }

  /**
   * Check if adding/updating a phase would exceed schedule totals
   * @param harvestScheduleId - ID of the harvest schedule
   * @param newInvoiceDetails - New invoice details to be added
   * @param excludePhaseId - Phase ID to exclude from calculation (for updates)
   */
  async validatePhaseAddition(
    harvestScheduleId: string,
    newInvoiceDetails: Array<{ productId: string; quantity: number }>,
    excludePhaseId?: string,
  ): Promise<void> {
    // Get schedule totals
    const harvestDetails = await this.harvestDetailRepository
      .createQueryBuilder('hd')
      .leftJoin('hd.harvestTicket', 'ht')
      .leftJoin('ht.harvestSchedule', 'hs')
      .leftJoinAndSelect('hd.product', 'p')
      .where('hs.id = :harvestScheduleId', { harvestScheduleId })
      .getMany();

    const scheduleProductTotals = new Map<string, number>();
    for (const detail of harvestDetails) {
      const productId = detail.product?.id;
      if (!productId) continue;

      const currentTotal = scheduleProductTotals.get(productId) || 0;
      scheduleProductTotals.set(
        productId,
        currentTotal + (detail.quantity || 0),
      );
    }

    // Get existing phase totals (excluding the one being updated)
    let phasesQuery = this.harvestPhaseRepository
      .createQueryBuilder('hp')
      .leftJoinAndSelect('hp.harvestInvoice', 'hi')
      .leftJoinAndSelect('hi.harvestInvoiceDetails', 'hid')
      .leftJoinAndSelect('hid.product', 'p')
      .where('hp.harvestSchedule.id = :harvestScheduleId', {
        harvestScheduleId,
      });

    if (excludePhaseId) {
      phasesQuery = phasesQuery.andWhere('hp.id != :excludePhaseId', {
        excludePhaseId,
      });
    }

    const phases = await phasesQuery.getMany();

    const existingPhaseTotals = new Map<string, number>();
    for (const phase of phases) {
      if (!phase.harvestInvoice?.harvestInvoiceDetails) continue;

      for (const invoiceDetail of phase.harvestInvoice.harvestInvoiceDetails) {
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
