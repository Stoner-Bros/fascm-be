import { Supplier } from '../suppliers/domain/supplier';
import { SuppliersService } from '../suppliers/suppliers.service';
import { NotificationsService } from './../notifications/notifications.service';
import { ProductsService } from './../products/products.service';

import {
  BadRequestException,
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { HarvestDetailRepository } from 'src/harvest-details/infrastructure/persistence/harvest-detail.repository';
import { HarvestTicketRepository } from 'src/harvest-tickets/infrastructure/persistence/harvest-ticket.repository';
import { Product } from 'src/products/domain/product';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestSchedule } from './domain/harvest-schedule';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { HarvestScheduleStatusEnum } from './enum/harvest-schedule-status.enum';
import { HarvestScheduleRepository } from './infrastructure/persistence/harvest-schedule.repository';
import { DebtsService } from 'src/debts/debts.service';
import { PartnerTypeEnum } from 'src/debts/enum/debt.enum';

@Injectable()
export class HarvestSchedulesService {
  constructor(
    // Dependencies here
    private readonly harvestScheduleRepository: HarvestScheduleRepository,
    private readonly supplierService: SuppliersService,
    private readonly productsService: ProductsService,
    private readonly notificationsService: NotificationsService,
    private readonly debtsService: DebtsService,
    private readonly harvestTicketsRepository: HarvestTicketRepository,
    private readonly harvestDetailsRepository: HarvestDetailRepository,
  ) {}

  async create(
    createHarvestScheduleDto: CreateHarvestScheduleDto,
    userId: number,
  ) {
    // Do not remove comment below.
    // <creating-property />

    let supplier: Supplier;

    if (userId) {
      const supplierObject = await this.supplierService.findByUserId(userId);
      if (!supplierObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplier: 'notExists',
          },
        });
      }
      supplier = supplierObject;
    }

    const hs = await this.harvestScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      address: createHarvestScheduleDto?.address ?? '',

      description: createHarvestScheduleDto?.description ?? '',

      status: HarvestScheduleStatusEnum.PENDING,

      harvestDate: createHarvestScheduleDto?.harvestDate ?? null,

      supplier: supplier!,
    });

    const ht = await this.harvestTicketsRepository.create({
      harvestSchedule: hs,
      ticketNumber: createHarvestScheduleDto?.harvestTicket?.ticketNumber ?? '',
      ticketUrl: createHarvestScheduleDto?.harvestTicket?.ticketUrl ?? '',
      unit: 'kg',
      quantity: 0,
    });

    let totalQuantity = 0;
    for (const detailDto of createHarvestScheduleDto.harvestDetails) {
      let product: Product | null = null;
      if (detailDto.product) {
        product = await this.productsService.findById(detailDto.product.id);
      }
      await this.harvestDetailsRepository.create({
        harvestTicket: ht,
        product: product ?? undefined,
        expectedUnitPrice: detailDto.expectedUnitPrice ?? undefined,
        quantity: detailDto.quantity ?? undefined,
        unit: detailDto.unit ?? undefined,
        // amount = expectedUnitPrice * quantity
        amount: (detailDto.expectedUnitPrice ?? 0) * (detailDto.quantity ?? 0),
      });
      totalQuantity += detailDto.quantity ?? 0;
    }
    ht.quantity = totalQuantity;
    await this.harvestTicketsRepository.update(ht.id, {
      quantity: ht.quantity,
    });

    return hs;
  }

  findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { status?: HarvestScheduleStatusEnum; warehouseId?: string };
    sort?: 'ASC' | 'DESC';
  }) {
    return this.harvestScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
      sort,
    });
  }

  findAllBySupplierWithPagination({
    supplierId,
    paginationOptions,
    filters,
    sort,
  }: {
    supplierId: string;
    paginationOptions: IPaginationOptions;
    filters?: { status?: HarvestScheduleStatusEnum };
    sort?: 'ASC' | 'DESC';
  }) {
    return this.harvestScheduleRepository.findAllBySupplierWithPagination({
      supplierId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
      sort,
    });
  }

  findById(id: HarvestSchedule['id']) {
    return this.harvestScheduleRepository.findById(id);
  }

  findByIds(ids: HarvestSchedule['id'][]) {
    return this.harvestScheduleRepository.findByIds(ids);
  }

  async update(
    id: HarvestSchedule['id'],
    updateHarvestScheduleDto: UpdateHarvestScheduleDto,
    userId: number,
  ) {
    // Check if harvest schedule exists
    const existingHarvestSchedule =
      await this.harvestScheduleRepository.findById(id);
    if (!existingHarvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    // Verify user owns this harvest schedule
    let supplier: Supplier | null = null;
    if (userId) {
      supplier = await this.supplierService.findByUserId(userId);
      if (!supplier) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplier: 'notExists',
          },
        });
      }

      if (existingHarvestSchedule.supplier?.id !== supplier.id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notAuthorized',
          },
        });
      }
    }

    // Update harvest schedule basic info
    const updateData: Partial<HarvestSchedule> = {};
    if (updateHarvestScheduleDto.address !== undefined) {
      updateData.address = updateHarvestScheduleDto.address || '';
    }
    if (updateHarvestScheduleDto.description !== undefined) {
      updateData.description = updateHarvestScheduleDto.description || '';
    }
    if (updateHarvestScheduleDto.harvestDate !== undefined) {
      updateData.harvestDate = updateHarvestScheduleDto.harvestDate || null;
    }

    if (Object.keys(updateData).length > 0) {
      await this.harvestScheduleRepository.update(id, updateData);
    }

    // Update harvest ticket if provided
    if (updateHarvestScheduleDto.harvestTicket) {
      const existingTicket =
        await this.harvestTicketsRepository.findByHarvestScheduleId(id);
      if (existingTicket) {
        await this.harvestTicketsRepository.update(existingTicket.id, {
          ticketNumber:
            updateHarvestScheduleDto?.harvestTicket?.ticketNumber ?? '',
          ticketUrl: updateHarvestScheduleDto?.harvestTicket?.ticketUrl ?? '',
        });

        // Update harvest details if provided
        if (updateHarvestScheduleDto.harvestDetails) {
          // Delete old details
          const oldDetails =
            await this.harvestDetailsRepository.findByHarvestTicketId(
              existingTicket.id,
            );
          for (const detail of oldDetails) {
            await this.harvestDetailsRepository.remove(detail.id);
          }

          // Create new details
          let totalQuantity = 0;
          for (const detailDto of updateHarvestScheduleDto.harvestDetails) {
            let product: Product | null = null;
            if (detailDto.product) {
              product = await this.productsService.findById(
                detailDto.product.id,
              );
              if (!product) {
                throw new UnprocessableEntityException({
                  status: HttpStatus.UNPROCESSABLE_ENTITY,
                  errors: {
                    product: 'notExists',
                  },
                });
              }
            }

            await this.harvestDetailsRepository.create({
              harvestTicket: existingTicket,
              product: product ?? undefined,
              expectedUnitPrice: detailDto.expectedUnitPrice ?? undefined,
              quantity: detailDto.quantity ?? undefined,
              unit: detailDto.unit ?? undefined,
              amount:
                (detailDto.expectedUnitPrice ?? 0) * (detailDto.quantity ?? 0),
            });
            totalQuantity += detailDto.quantity ?? 0;
          }

          // Update ticket quantity
          await this.harvestTicketsRepository.update(existingTicket.id, {
            quantity: totalQuantity,
          });
        }
      }
    }

    return this.harvestScheduleRepository.findById(id);
  }

  // remove(id: HarvestSchedule['id']) {
  //   return this.harvestScheduleRepository.remove(id);
  // }

  async updateStatus(
    id: HarvestSchedule['id'],
    status: HarvestSchedule['status'],
    reason?: string,
  ) {
    const harvestSchedule = await this.harvestScheduleRepository.findById(id);

    if (!harvestSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = harvestSchedule.status;

    // Define allowed status transitions
    const allowedTransitions: Record<string, HarvestScheduleStatusEnum[]> = {
      pending: [
        HarvestScheduleStatusEnum.APPROVED,
        HarvestScheduleStatusEnum.REJECTED,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      rejected: [],
      canceled: [],
      approved: [
        HarvestScheduleStatusEnum.PROCESSING,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      processing: [
        HarvestScheduleStatusEnum.COMPLETED,
        HarvestScheduleStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as HarvestScheduleStatusEnum,
      )
    ) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          status: `invalidTransitionFrom${currentStatus}To${status}`,
        },
      });
    }

    // Validate that reason is provided when rejecting
    if (status === HarvestScheduleStatusEnum.REJECTED && !reason) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          reason: 'reasonRequiredForRejection',
        },
      });
    }

    if (status === HarvestScheduleStatusEnum.APPROVED) {
      await this.approveNotification(harvestSchedule);

      // Fill finalUnitPrice with expectedUnitPrice if not set
      const harvestTicket =
        await this.harvestTicketsRepository.findByHarvestScheduleId(id);
      if (harvestTicket) {
        const harvestDetails =
          await this.harvestDetailsRepository.findByHarvestTicketId(
            harvestTicket.id,
          );
        for (const detail of harvestDetails) {
          if (
            !detail?.finalUnitPriceAccepted &&
            detail?.expectedUnitPrice != null
          ) {
            await this.harvestDetailsRepository.update(detail.id, {
              finalUnitPrice: detail.expectedUnitPrice,
              finalUnitPriceAccepted: true,
            });
          }
        }
      }

      const supplier = harvestSchedule?.supplier;
      if (supplier) {
        const debt = await this.debtsService.getDebtByPartnerId(
          supplier.id,
          PartnerTypeEnum.SUPPLIER,
        );

        const totalPayment =
          await this.harvestScheduleRepository.getTotalPaymentByScheduleId(
            harvestSchedule.id,
          );
        if (debt) {
          debt.originalAmount = (debt.originalAmount ?? 0) + totalPayment;
          debt.remainingAmount = (debt.remainingAmount ?? 0) + totalPayment;
          await this.debtsService.update(debt.id, debt as any);
        }
      }
    }

    // Send notification for rejection
    if (status === HarvestScheduleStatusEnum.REJECTED) {
      await this.rejectNotification(harvestSchedule, reason ?? '');
    }

    // Send notification for rejection
    if (status === HarvestScheduleStatusEnum.COMPLETED) {
      await this.completeNotification(harvestSchedule);
    }

    // Send notification for rejection
    if (status === HarvestScheduleStatusEnum.CANCELED) {
      await this.cancelNotification(harvestSchedule, reason ?? '');
    }

    return this.harvestScheduleRepository.update(id, {
      status,
      reason:
        status === HarvestScheduleStatusEnum.REJECTED ||
        status === HarvestScheduleStatusEnum.CANCELED
          ? reason
          : null,
      updatedAt: new Date(),
    });
  }

  async approveNotification(hs: HarvestSchedule) {
    const supplier = hs?.supplier;
    if (supplier?.id) {
      await this.notificationsService.create({
        user: { id: Number(supplier.user?.id ?? 0) },
        isRead: false,
        type: 'harvest-approved',
        title: 'harvestScheduleApproved',
        message: `harvestScheduleHasBeenApproved`,
        data: JSON.stringify({ harvestScheduleId: hs.id }),
      });
    }
  }

  async rejectNotification(hs: HarvestSchedule, reason: string) {
    const supplier = hs?.supplier;
    if (supplier?.id) {
      await this.notificationsService.create({
        user: { id: Number(supplier.user?.id ?? 0) },
        isRead: false,
        type: 'harvest-rejected',
        title: 'harvestScheduleRejected',
        message: `harvestScheduleHasBeenRejected`,
        data: JSON.stringify({ harvestScheduleId: hs.id, reason }),
      });
    }
  }

  async completeNotification(hs: HarvestSchedule) {
    const supplier = hs?.supplier;
    if (supplier?.id) {
      await this.notificationsService.create({
        user: { id: Number(supplier.user?.id ?? 0) },
        isRead: false,
        type: 'harvest-completed',
        title: 'harvestScheduleCompleted',
        message: `harvestScheduleHasBeenCompleted`,
        data: JSON.stringify({ harvestScheduleId: hs.id }),
      });
    }
  }

  async cancelNotification(hs: HarvestSchedule, reason: string) {
    const supplier = hs?.supplier;
    if (supplier?.id) {
      await this.notificationsService.create({
        user: { id: Number(supplier.user?.id ?? 0) },
        isRead: false,
        type: 'harvest-canceled',
        title: 'harvestScheduleCanceled',
        message: `harvestScheduleHasBeenCanceled`,
        data: JSON.stringify({ harvestScheduleId: hs.id, reason }),
      });
    }
  }
}
