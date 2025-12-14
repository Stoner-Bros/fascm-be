import { ConsigneesService } from '../consignees/consignees.service';
import { Consignee } from '../consignees/domain/consignee';
import { NotificationsService } from '../notifications/notifications.service';
import { ProductsService } from '../products/products.service';
import { OrderDetailSelectionsService } from './../order-detail-selections/order-detail-selections.service';

import {
  BadRequestException,
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { BatchesService } from 'src/batches/batches.service';
import { OrderDetailRepository } from 'src/order-details/infrastructure/persistence/order-detail.repository';
import { OrderRepository } from 'src/orders/infrastructure/persistence/order.repository';
import { Product } from 'src/products/domain/product';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderSchedule } from './domain/order-schedule';
import { CreateOrderScheduleDto } from './dto/create-order-schedule.dto';
import { UpdateOrderScheduleDto } from './dto/update-order-schedule.dto';
import { OrderScheduleStatusEnum } from './enum/order-schedule-status.enum';
import { OrderScheduleRepository } from './infrastructure/persistence/order-schedule.repository';

@Injectable()
export class OrderSchedulesService {
  constructor(
    // Dependencies here
    private readonly orderScheduleRepository: OrderScheduleRepository,
    private readonly consigneeService: ConsigneesService,
    private readonly productsService: ProductsService,
    private readonly notificationsService: NotificationsService,
    private readonly orderRepository: OrderRepository,
    private readonly orderDetailSelectionsService: OrderDetailSelectionsService,
    private readonly batchesService: BatchesService,
    private readonly orderDetailRepository: OrderDetailRepository,
  ) {}

  async create(createOrderScheduleDto: CreateOrderScheduleDto, userId: number) {
    // Do not remove comment below.
    // <creating-property />

    let consignee: Consignee;

    if (userId) {
      const consigneeObject = await this.consigneeService.findByUserId(userId);
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    }

    const os = await this.orderScheduleRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />

      address: createOrderScheduleDto.address,

      description: createOrderScheduleDto.description,

      status: OrderScheduleStatusEnum.PENDING,

      deliveryDate: createOrderScheduleDto.deliveryDate,

      consignee: consignee!,
    });

    const order = await this.orderRepository.create({
      orderSchedule: os,
      orderNumber: createOrderScheduleDto.order.orderNumber,
      orderUrl: createOrderScheduleDto.order.orderUrl,
      unit: 'kg',
      quantity: 0,
    });

    let totalQuantity = 0;
    for (const detailDto of createOrderScheduleDto.orderDetails) {
      let product: Product | null = null;
      let amount = 0;
      if (detailDto.product) {
        product = await this.productsService.findById(detailDto.product.id);
      }
      const od = await this.orderDetailRepository.create({
        order: order,
        product: product ?? undefined,
        quantity: detailDto.quantity ?? undefined,
        unit: detailDto.unit ?? undefined,
        // amount = unitPrice * quantity
        // amount: (detailDto.unitPrice ?? 0) * (detailDto.quantity ?? 0),
      });

      // Create order detail selections if batchInfo are provided
      if (detailDto.batchInfo && detailDto.batchInfo.length > 0) {
        for (const batchInfo of detailDto.batchInfo) {
          const batch = await this.batchesService.findById(batchInfo.batchId);
          if (!batch) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                batch: 'notExists',
              },
            });
          }
          await this.orderDetailSelectionsService.create({
            orderDetail: od,
            batch: batch,
            unit: batchInfo.unit ?? undefined,
            quantity: batchInfo.quantity ?? undefined,
            unitPrice: batchInfo.unitPrice ?? undefined,
          });
          amount += (batchInfo.unitPrice ?? 0) * (batchInfo.quantity ?? 0);
          if (batch.currentQuantity) {
            batch.currentQuantity -= batchInfo.quantity ?? 0;
            await this.batchesService.update(batch.id, {
              currentQuantity: batch.currentQuantity,
            });
          }
        }
      }
      await this.orderDetailRepository.update(od.id, {
        amount: amount,
      });
      totalQuantity += detailDto.quantity ?? 0;
    }
    order.quantity = totalQuantity;
    await this.orderRepository.update(order.id, {
      quantity: order.quantity,
    });

    return os;
  }

  findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { status?: OrderScheduleStatusEnum };
    sort?: 'ASC' | 'DESC';
  }) {
    return this.orderScheduleRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
      sort,
    });
  }

  findAllByConsigneeWithPagination({
    consigneeId,
    paginationOptions,
    filters,
    sort,
  }: {
    consigneeId: string;
    paginationOptions: IPaginationOptions;
    filters?: { status?: OrderScheduleStatusEnum };
    sort?: 'ASC' | 'DESC';
  }) {
    return this.orderScheduleRepository.findAllByConsigneeWithPagination({
      consigneeId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
      sort,
    });
  }

  findById(id: OrderSchedule['id']) {
    return this.orderScheduleRepository.findById(id);
  }

  findByIds(ids: OrderSchedule['id'][]) {
    return this.orderScheduleRepository.findByIds(ids);
  }

  async update(
    id: OrderSchedule['id'],
    updateOrderScheduleDto: UpdateOrderScheduleDto,
    userId: number,
  ) {
    // Check if order schedule exists
    const existingOrderSchedule =
      await this.orderScheduleRepository.findById(id);
    if (!existingOrderSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    // Verify user owns this order schedule
    let consignee: Consignee | null = null;
    if (userId) {
      consignee = await this.consigneeService.findByUserId(userId);
      if (!consignee) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }

      if (existingOrderSchedule.consignee?.id !== consignee.id) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notAuthorized',
          },
        });
      }
    }

    // Update order schedule basic info
    const updateData: Partial<OrderSchedule> = {};
    if (updateOrderScheduleDto.address !== undefined) {
      updateData.address = updateOrderScheduleDto.address;
    }
    if (updateOrderScheduleDto.description !== undefined) {
      updateData.description = updateOrderScheduleDto.description;
    }
    if (updateOrderScheduleDto.deliveryDate !== undefined) {
      updateData.deliveryDate = updateOrderScheduleDto.deliveryDate;
    }

    if (Object.keys(updateData).length > 0) {
      await this.orderScheduleRepository.update(id, updateData);
    }

    // Update order if provided
    if (updateOrderScheduleDto.order) {
      const existingOrder = await this.orderRepository.findByOSId(id);
      if (existingOrder) {
        await this.orderRepository.update(existingOrder.id, {
          orderNumber: updateOrderScheduleDto.order.orderNumber,
          orderUrl: updateOrderScheduleDto.order.orderUrl,
        });

        // Update order details if provided
        if (updateOrderScheduleDto.orderDetails) {
          // Delete old details
          const oldDetails = await this.orderDetailRepository.findByOrderId(
            existingOrder.id,
          );
          if (oldDetails) {
            for (const detail of oldDetails) {
              const select =
                await this.orderDetailSelectionsService.findAllByOrderDetailId(
                  detail.id,
                );

              // Restore batch quantities
              if (select && select.length > 0) {
                for (const s of select) {
                  if (s.batch && s.quantity) {
                    const batch = await this.batchesService.findById(
                      s.batch.id,
                    );
                    if (batch && batch.currentQuantity) {
                      batch.currentQuantity += s.quantity;
                      await this.batchesService.update(batch.id, {
                        currentQuantity: batch.currentQuantity,
                      });
                    }
                  }
                }
              }

              await this.orderDetailSelectionsService.removeAllByOrderDetailId(
                detail.id,
              );
              // Remove order detail selections
              await this.orderDetailRepository.remove(detail.id);
            }
          }

          // Create new details
          let totalQuantity = 0;
          for (const detailDto of updateOrderScheduleDto.orderDetails) {
            let product: Product | null = null;
            let amount = 0;
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

            const od = await this.orderDetailRepository.create({
              order: existingOrder,
              product: product ?? undefined,
              // unitPrice: detailDto.unitPrice ?? undefined,
              quantity: detailDto.quantity ?? undefined,
              unit: detailDto.unit ?? undefined,
              // amount: (detailDto.unitPrice ?? 0) * (detailDto.quantity ?? 0),
            });

            // Create order detail selections if batchIds are provided
            if (detailDto.batchInfo && detailDto.batchInfo.length > 0) {
              for (const batchInfo of detailDto.batchInfo) {
                const batch = await this.batchesService.findById(
                  batchInfo.batchId,
                );
                if (!batch) {
                  throw new UnprocessableEntityException({
                    status: HttpStatus.UNPROCESSABLE_ENTITY,
                    errors: {
                      batch: 'notExists',
                    },
                  });
                }
                await this.orderDetailSelectionsService.create({
                  orderDetail: od,
                  batch: batch,
                  unit: batchInfo.unit ?? undefined,
                  quantity: batchInfo.quantity ?? undefined,
                  unitPrice: batchInfo.unitPrice ?? undefined,
                });
                amount +=
                  (batchInfo.unitPrice ?? 0) * (batchInfo.quantity ?? 0);
                if (batch.currentQuantity) {
                  batch.currentQuantity -= batchInfo.quantity ?? 0;
                  await this.batchesService.update(batch.id, {
                    currentQuantity: batch.currentQuantity,
                  });
                }
              }
            }
            await this.orderDetailRepository.update(od.id, {
              amount: amount,
            });
            totalQuantity += detailDto.quantity ?? 0;
          }

          // Update order quantity
          await this.orderRepository.update(existingOrder.id, {
            quantity: totalQuantity,
          });
        }
      }
    }

    return this.orderScheduleRepository.findById(id);
  }

  // remove(id: OrderSchedule['id']) {
  //   return this.orderScheduleRepository.remove(id);
  // }

  async updateStatus(
    id: OrderSchedule['id'],
    status: OrderSchedule['status'],
    reason?: string,
  ) {
    const orderSchedule = await this.orderScheduleRepository.findById(id);

    if (!orderSchedule) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = orderSchedule.status;

    // Define allowed status transitions
    const allowedTransitions: Record<string, OrderScheduleStatusEnum[]> = {
      pending: [
        OrderScheduleStatusEnum.APPROVED,
        OrderScheduleStatusEnum.REJECTED,
        OrderScheduleStatusEnum.CANCELED,
      ],
      rejected: [],
      canceled: [],
      approved: [
        OrderScheduleStatusEnum.PROCESSING,
        OrderScheduleStatusEnum.CANCELED,
      ],
      processing: [
        OrderScheduleStatusEnum.COMPLETED,
        OrderScheduleStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as OrderScheduleStatusEnum,
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
    if (status === OrderScheduleStatusEnum.REJECTED && !reason) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        errors: {
          reason: 'reasonRequiredForRejection',
        },
      });
    }

    if (status === OrderScheduleStatusEnum.APPROVED) {
      await this.approveNotification(orderSchedule);
    }

    // Send notification for rejection
    if (status === OrderScheduleStatusEnum.REJECTED) {
      await this.rejectNotification(orderSchedule, reason ?? '');
    }

    // Send notification for rejection
    if (status === OrderScheduleStatusEnum.COMPLETED) {
      await this.completeNotification(orderSchedule);
    }

    // Send notification for rejection
    if (status === OrderScheduleStatusEnum.CANCELED) {
      await this.cancelNotification(orderSchedule);
    }

    return this.orderScheduleRepository.update(id, {
      status,
      reason: status === OrderScheduleStatusEnum.REJECTED ? reason : null,
      updatedAt: new Date(),
    });
  }

  async approveNotification(os: OrderSchedule) {
    const consignee = os?.consignee;
    if (consignee?.id) {
      await this.notificationsService.create({
        user: { id: Number(consignee.user?.id ?? 0) },
        isRead: false,
        type: 'order-approved',
        title: 'orderScheduleApproved',
        message: `orderScheduleHasBeenApproved`,
        data: JSON.stringify({ orderScheduleId: os.id }),
      });
    }
  }

  async rejectNotification(os: OrderSchedule, reason: string) {
    const consignee = os?.consignee;
    if (consignee?.id) {
      await this.notificationsService.create({
        user: { id: Number(consignee.user?.id ?? 0) },
        isRead: false,
        type: 'order-rejected',
        title: 'orderScheduleRejected',
        message: `orderScheduleHasBeenRejected`,
        data: JSON.stringify({ orderScheduleId: os.id, reason }),
      });
    }
  }

  async completeNotification(os: OrderSchedule) {
    const consignee = os?.consignee;
    if (consignee?.id) {
      await this.notificationsService.create({
        user: { id: Number(consignee.user?.id ?? 0) },
        isRead: false,
        type: 'order-completed',
        title: 'orderScheduleCompleted',
        message: `orderScheduleHasBeenCompleted`,
        data: JSON.stringify({ orderScheduleId: os.id }),
      });
    }
  }

  async cancelNotification(os: OrderSchedule) {
    const consignee = os?.consignee;
    if (consignee?.id) {
      await this.notificationsService.create({
        user: { id: Number(consignee.user?.id ?? 0) },
        isRead: false,
        type: 'order-canceled',
        title: 'orderScheduleCanceled',
        message: `orderScheduleHasBeenCanceled`,
        data: JSON.stringify({ orderScheduleId: os.id }),
      });
    }
  }
}
