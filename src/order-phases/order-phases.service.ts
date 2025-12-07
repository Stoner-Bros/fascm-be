import { OrderSchedule } from '../order-schedules/domain/order-schedule';
import { OrderSchedulesService } from '../order-schedules/order-schedules.service';

import {
  BadRequestException,
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FilesCloudinaryService } from 'src/files/infrastructure/uploader/cloudinary/files.service';
import { ImageProofsService } from 'src/image-proofs/image-proofs.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderPhase } from './domain/order-phase';
import { CreateOrderPhaseDto } from './dto/create-order-phase.dto';
import { UpdateOrderPhaseDto } from './dto/update-order-phase.dto';
import { OrderPhaseStatusEnum } from './enum/order-phase-status.enum';
import { OrderPhaseRepository } from './infrastructure/persistence/order-phase.repository';

@Injectable()
export class OrderPhasesService {
  constructor(
    @Inject(forwardRef(() => ImageProofsService))
    private readonly imageProofService: ImageProofsService,

    private readonly filesCloudinaryService: FilesCloudinaryService,

    @Inject(forwardRef(() => OrderSchedulesService))
    private readonly orderScheduleService: OrderSchedulesService,

    // Dependencies here
    private readonly orderPhaseRepository: OrderPhaseRepository,
  ) {}

  async create(createOrderPhaseDto: CreateOrderPhaseDto) {
    // Do not remove comment below.
    // <creating-property />

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (createOrderPhaseDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        createOrderPhaseDto.orderSchedule.id,
      );
      if (!orderScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderSchedule: 'notExists',
          },
        });
      }
      orderSchedule = orderScheduleObject;
    } else if (createOrderPhaseDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.orderPhaseRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      description: createOrderPhaseDto.description,

      // status: createOrderPhaseDto.status,

      phaseNumber: createOrderPhaseDto.phaseNumber,

      orderSchedule,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderPhaseRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderPhase['id']) {
    return this.orderPhaseRepository.findById(id);
  }

  findByIds(ids: OrderPhase['id'][]) {
    return this.orderPhaseRepository.findByIds(ids);
  }

  async update(
    id: OrderPhase['id'],

    updateOrderPhaseDto: UpdateOrderPhaseDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let orderSchedule: OrderSchedule | null | undefined = undefined;

    if (updateOrderPhaseDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        updateOrderPhaseDto.orderSchedule.id,
      );
      if (!orderScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderSchedule: 'notExists',
          },
        });
      }
      orderSchedule = orderScheduleObject;
    } else if (updateOrderPhaseDto.orderSchedule === null) {
      orderSchedule = null;
    }

    return this.orderPhaseRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      description: updateOrderPhaseDto.description,

      // status: updateOrderPhaseDto.status,

      phaseNumber: updateOrderPhaseDto.phaseNumber,

      orderSchedule,
    });
  }

  remove(id: OrderPhase['id']) {
    return this.orderPhaseRepository.remove(id);
  }

  //upload img proof for harvest schedule
  async uploadImgProof(
    id: OrderPhase['id'],
    file: Express.Multer.File,
  ): Promise<{ path: string }> {
    const orderPhase = await this.orderPhaseRepository.findById(id);
    if (!orderPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { id: 'notExists' },
      });
    }
    const uploadedFile = await this.filesCloudinaryService.uploadFile(file);
    await this.imageProofService.create({
      orderPhase: orderPhase,
      photo: uploadedFile,
    });
    return { path: uploadedFile.path };
  }

  async updateStatus(id: OrderPhase['id'], status: OrderPhase['status']) {
    const orderPhase = await this.orderPhaseRepository.findById(id);
    if (!orderPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          id: 'notExists',
        },
      });
    }

    const currentStatus = orderPhase.status;
    // Define allowed status transitions
    const allowedTransitions: Record<string, OrderPhaseStatusEnum[]> = {
      preparing: [
        OrderPhaseStatusEnum.DELIVERING,
        OrderPhaseStatusEnum.CANCELED,
      ],
      delivering: [
        OrderPhaseStatusEnum.DELIVERED,
        OrderPhaseStatusEnum.CANCELED,
      ],
      delivered: [
        OrderPhaseStatusEnum.COMPLETED,
        OrderPhaseStatusEnum.CANCELED,
      ],
      completed: [],
    };

    // Validate status transition
    if (
      allowedTransitions[currentStatus ?? ''] &&
      !allowedTransitions[currentStatus ?? ''].includes(
        status as OrderPhaseStatusEnum,
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
    // if (status === OrderScheduleStatusEnum.REJECTED && !reason) {
    //   throw new BadRequestException({
    //     status: HttpStatus.BAD_REQUEST,
    //     errors: {
    //       reason: 'reasonRequiredForRejection',
    //     },
    //   });
    // }

    // if (status === OrderScheduleStatusEnum.APPROVED) {
    //   await this.approveNotification(id);
    // }

    // Send notification for rejection
    // if (status === OrderScheduleStatusEnum.REJECTED) {
    //   const consigneeId = orderSchedule?.consignee?.id;
    //   if (consigneeId) {
    //     this.notificationsGateway.notifyConsignee(consigneeId, {
    //       type: 'order-rejected',
    //       title: 'Đơn hàng đã bị từ chối',
    //       message: `Đơn hàng ${orderSchedule.id} đã bị từ chối. Lý do: ${reason}`,
    //       data: { orderScheduleId: orderSchedule.id, reason },
    //       timestamp: new Date().toISOString(),
    //     });
    //   }
    // }

    return this.orderPhaseRepository.update(id, {
      status,
      updatedAt: new Date(),
    });
  }
}
