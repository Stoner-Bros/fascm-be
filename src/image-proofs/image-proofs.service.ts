import { OrderSchedulesService } from '../order-schedules/order-schedules.service';
import { OrderSchedule } from '../order-schedules/domain/order-schedule';

import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';
import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';

import { FilesService } from '../files/files.service';
import { FileType } from '../files/domain/file';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateImageProofDto } from './dto/create-image-proof.dto';
import { UpdateImageProofDto } from './dto/update-image-proof.dto';
import { ImageProofRepository } from './infrastructure/persistence/image-proof.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImageProof } from './domain/image-proof';

@Injectable()
export class ImageProofsService {
  constructor(
    @Inject(forwardRef(() => OrderSchedulesService))
    private readonly orderScheduleService: OrderSchedulesService,

    @Inject(forwardRef(() => HarvestSchedulesService))
    private readonly harvestScheduleService: HarvestSchedulesService,

    private readonly fileService: FilesService,

    // Dependencies here
    private readonly imageProofRepository: ImageProofRepository,
  ) {}

  async create(createImageProofDto: CreateImageProofDto) {
    // check if orderSchedule or harvestSchedule exists
    if (
      !createImageProofDto.orderSchedule &&
      !createImageProofDto.harvestSchedule
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          orderSchedule: 'orderScheduleOrHarvestScheduleRequired',
          harvestSchedule: 'orderScheduleOrHarvestScheduleRequired',
        },
      });
    }
    // check if both orderSchedule and harvestSchedule exist
    if (
      createImageProofDto.orderSchedule &&
      createImageProofDto.harvestSchedule
    ) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          orderSchedule: 'orderScheduleAndHarvestScheduleCannotExistTogether',
          harvestSchedule: 'orderScheduleAndHarvestScheduleCannotExistTogether',
        },
      });
    }
    // Do not remove comment below.
    // <creating-property />
    const orderScheduleObject = await this.orderScheduleService.findById(
      createImageProofDto?.orderSchedule?.id ?? '',
    );
    const orderSchedule = orderScheduleObject;

    const harvestScheduleObject = await this.harvestScheduleService.findById(
      createImageProofDto?.harvestSchedule?.id ?? '',
    );
    const harvestSchedule = harvestScheduleObject;

    let photo: FileType | null | undefined = undefined;

    if (createImageProofDto.photo) {
      const photoObject = await this.fileService.findById(
        createImageProofDto.photo.id,
      );
      if (!photoObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'notExists',
          },
        });
      }
      photo = photoObject;
    } else if (createImageProofDto.photo === null) {
      photo = null;
    }

    return this.imageProofRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      orderSchedule,

      harvestSchedule,

      photo,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.imageProofRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ImageProof['id']) {
    return this.imageProofRepository.findById(id);
  }

  findByIds(ids: ImageProof['id'][]) {
    return this.imageProofRepository.findByIds(ids);
  }

  async update(
    id: ImageProof['id'],

    updateImageProofDto: UpdateImageProofDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let orderSchedule: OrderSchedule | undefined = undefined;

    if (updateImageProofDto.orderSchedule) {
      const orderScheduleObject = await this.orderScheduleService.findById(
        updateImageProofDto.orderSchedule.id,
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
    }

    let harvestSchedule: HarvestSchedule | undefined = undefined;

    if (updateImageProofDto.harvestSchedule) {
      const harvestScheduleObject = await this.harvestScheduleService.findById(
        updateImageProofDto.harvestSchedule.id,
      );
      if (!harvestScheduleObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestSchedule: 'notExists',
          },
        });
      }
      harvestSchedule = harvestScheduleObject;
    }

    let photo: FileType | null | undefined = undefined;

    if (updateImageProofDto.photo) {
      const photoObject = await this.fileService.findById(
        updateImageProofDto.photo.id,
      );
      if (!photoObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            photo: 'notExists',
          },
        });
      }
      photo = photoObject;
    } else if (updateImageProofDto.photo === null) {
      photo = null;
    }

    return this.imageProofRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      orderSchedule,

      harvestSchedule,

      photo,
    });
  }

  remove(id: ImageProof['id']) {
    return this.imageProofRepository.remove(id);
  }
}
