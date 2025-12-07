import { FileType } from '../files/domain/file';
import { FilesService } from '../files/files.service';

import {
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { HarvestPhase } from 'src/harvest-phases/domain/harvest-phase';
import { HarvestPhasesService } from 'src/harvest-phases/harvest-phases.service';
import { OrderPhase } from 'src/order-phases/domain/order-phase';
import { OrderPhasesService } from 'src/order-phases/order-phases.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ImageProof } from './domain/image-proof';
import { CreateImageProofDto } from './dto/create-image-proof.dto';
import { UpdateImageProofDto } from './dto/update-image-proof.dto';
import { ImageProofRepository } from './infrastructure/persistence/image-proof.repository';

@Injectable()
export class ImageProofsService {
  constructor(
    @Inject(forwardRef(() => OrderPhasesService))
    private readonly orderPhaseService: OrderPhasesService,

    @Inject(forwardRef(() => HarvestPhasesService))
    private readonly harvestPhaseService: HarvestPhasesService,

    private readonly fileService: FilesService,

    // Dependencies here
    private readonly imageProofRepository: ImageProofRepository,
  ) {}

  async create(createImageProofDto: CreateImageProofDto) {
    // check if orderSchedule or harvestSchedule exists
    if (!createImageProofDto.orderPhase && !createImageProofDto.harvestPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          orderPhase: 'orderPhaseOrHarvestPhaseRequired',
          harvestPhase: 'orderPhaseOrHarvestPhaseRequired',
        },
      });
    }
    // check if both orderSchedule and harvestSchedule exist
    if (createImageProofDto.orderPhase && createImageProofDto.harvestPhase) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          orderPhase: 'orderPhaseAndHarvestPhaseCannotExistTogether',
          harvestPhase: 'orderPhaseAndHarvestPhaseCannotExistTogether',
        },
      });
    }
    // Do not remove comment below.
    // <creating-property />
    const orderPhaseObject = await this.orderPhaseService.findById(
      createImageProofDto?.orderPhase?.id ?? '',
    );
    const orderPhase = orderPhaseObject;

    const harvestPhaseObject = await this.harvestPhaseService.findById(
      createImageProofDto?.harvestPhase?.id ?? '',
    );
    const harvestPhase = harvestPhaseObject;

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
      orderPhase,

      harvestPhase,

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
    let orderPhase: OrderPhase | undefined = undefined;

    if (updateImageProofDto.orderPhase) {
      const orderPhaseObject = await this.orderPhaseService.findById(
        updateImageProofDto.orderPhase.id,
      );
      if (!orderPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderSchedule: 'notExists',
          },
        });
      }
      orderPhase = orderPhaseObject;
    }

    let harvestPhase: HarvestPhase | undefined = undefined;

    if (updateImageProofDto.harvestPhase) {
      const harvestPhaseObject = await this.harvestPhaseService.findById(
        updateImageProofDto.harvestPhase.id,
      );
      if (!harvestPhaseObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestPhase: 'notExists',
          },
        });
      }
      harvestPhase = harvestPhaseObject;
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
      orderPhase,

      harvestPhase,

      photo,
    });
  }

  remove(id: ImageProof['id']) {
    return this.imageProofRepository.remove(id);
  }
}
