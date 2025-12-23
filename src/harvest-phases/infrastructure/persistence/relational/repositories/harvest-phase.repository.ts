import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestPhaseResponse } from 'src/harvest-phases/dto/harvest-phase-response.dto';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { HarvestPhase } from '../../../../domain/harvest-phase';
import { HarvestPhaseRepository } from '../../harvest-phase.repository';
import { HarvestPhaseEntity } from '../entities/harvest-phase.entity';
import { HarvestPhaseMapper } from '../mappers/harvest-phase.mapper';
import { DeliveryEntity } from 'src/deliveries/infrastructure/persistence/relational/entities/delivery.entity';

@Injectable()
export class HarvestPhaseRelationalRepository
  implements HarvestPhaseRepository
{
  constructor(
    @InjectRepository(HarvestPhaseEntity)
    private readonly harvestPhaseRepository: Repository<HarvestPhaseEntity>,
  ) {}

  async create(data: HarvestPhase): Promise<HarvestPhase> {
    const persistenceModel = HarvestPhaseMapper.toPersistence(data);
    const newEntity = await this.harvestPhaseRepository.save(
      this.harvestPhaseRepository.create(persistenceModel),
    );
    return HarvestPhaseMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: {
      deliveryStaffId?: string;
    };
  }): Promise<HarvestPhaseResponse[]> {
    const qb = this.harvestPhaseRepository.createQueryBuilder('hp');
    qb.leftJoinAndSelect('hp.harvestInvoice', 'harvestInvoice');
    qb.leftJoinAndSelect(
      'harvestInvoice.harvestInvoiceDetails',
      'harvestInvoiceDetails',
    );
    qb.leftJoinAndSelect('harvestInvoiceDetails.product', 'product');
    qb.leftJoinAndSelect('hp.imageProof', 'imageProof');
    qb.leftJoinAndSelect('imageProof.photo', 'photo');
    qb.leftJoin(DeliveryEntity, 'delivery', 'delivery.harvestPhaseId = hp.id');

    if (filters?.deliveryStaffId) {
      qb.andWhere('delivery.deliveryStaffId = :deliveryStaffId', {
        deliveryStaffId: filters.deliveryStaffId,
      });
    }

    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => HarvestPhaseMapper.toResponse(entity));
  }

  async findAllByScheduleWithPagination({
    scheduleId,
    paginationOptions,
    filters,
  }: {
    scheduleId: string;
    paginationOptions: IPaginationOptions;
    filters?: {
      deliveryStaffId?: string;
    };
  }): Promise<HarvestPhaseResponse[]> {
    const qb = this.harvestPhaseRepository.createQueryBuilder('hp');
    qb.leftJoinAndSelect('hp.harvestInvoice', 'harvestInvoice');
    qb.leftJoinAndSelect(
      'harvestInvoice.harvestInvoiceDetails',
      'harvestInvoiceDetails',
    );
    qb.leftJoinAndSelect('harvestInvoiceDetails.product', 'product');
    qb.leftJoinAndSelect('hp.imageProof', 'imageProof');
    qb.leftJoinAndSelect('imageProof.photo', 'photo');
    qb.leftJoin(DeliveryEntity, 'delivery', 'delivery.harvestPhaseId = hp.id');

    qb.where('hp.harvestScheduleId = :scheduleId', { scheduleId });

    if (filters?.deliveryStaffId) {
      qb.andWhere('delivery.deliveryStaffId = :deliveryStaffId', {
        deliveryStaffId: filters.deliveryStaffId,
      });
    }

    // order by phase number ascending
    qb.orderBy('hp.phaseNumber', 'ASC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => HarvestPhaseMapper.toResponse(entity));
  }

  async findFullById(
    id: HarvestPhase['id'],
  ): Promise<NullableType<HarvestPhaseResponse>> {
    const qb = this.harvestPhaseRepository.createQueryBuilder('hp');
    qb.leftJoinAndSelect('hp.harvestInvoice', 'harvestInvoice');
    qb.leftJoinAndSelect(
      'harvestInvoice.harvestInvoiceDetails',
      'harvestInvoiceDetails',
    );
    qb.leftJoinAndSelect('harvestInvoiceDetails.product', 'product');
    qb.leftJoinAndSelect('hp.imageProof', 'imageProof');
    qb.leftJoinAndSelect('imageProof.photo', 'photo');

    qb.where('hp.id = :id', { id });

    const entities = await qb.getOne();
    return entities ? HarvestPhaseMapper.toResponse(entities) : null;
  }

  async findByIds(ids: HarvestPhase['id'][]): Promise<HarvestPhase[]> {
    const entities = await this.harvestPhaseRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestPhaseMapper.toDomain(entity));
  }

  async findById(id: HarvestPhase['id']): Promise<NullableType<HarvestPhase>> {
    const entity = await this.harvestPhaseRepository.findOne({
      where: { id },
    });
    if (!entity) {
      return null;
    }
    return HarvestPhaseMapper.toDomain(entity);
  }

  async update(
    id: HarvestPhase['id'],
    payload: Partial<HarvestPhase>,
  ): Promise<HarvestPhase> {
    const entity = await this.harvestPhaseRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestPhaseRepository.save(
      this.harvestPhaseRepository.create(
        HarvestPhaseMapper.toPersistence({
          ...HarvestPhaseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestPhaseMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestPhase['id']): Promise<void> {
    await this.harvestPhaseRepository.delete(id);
  }
}
