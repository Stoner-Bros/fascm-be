import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HarvestScheduleResponse } from 'src/harvest-schedules/dto/harvest-schedule-response';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { HarvestSchedule } from '../../../../domain/harvest-schedule';
import { HarvestScheduleStatusEnum } from '../../../../enum/harvest-schedule-status.enum';
import { HarvestScheduleRepository } from '../../harvest-schedule.repository';
import { HarvestScheduleEntity } from '../entities/harvest-schedule.entity';
import { HarvestScheduleMapper } from '../mappers/harvest-schedule.mapper';

@Injectable()
export class HarvestScheduleRelationalRepository
  implements HarvestScheduleRepository
{
  constructor(
    @InjectRepository(HarvestScheduleEntity)
    private readonly harvestScheduleRepository: Repository<HarvestScheduleEntity>,
  ) {}

  async create(data: HarvestSchedule): Promise<HarvestSchedule> {
    const persistenceModel = HarvestScheduleMapper.toPersistence(data);
    const newEntity = await this.harvestScheduleRepository.save(
      this.harvestScheduleRepository.create(persistenceModel),
    );
    return HarvestScheduleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { status?: HarvestScheduleStatusEnum; warehouseId?: string };
    sort?: 'ASC' | 'DESC';
  }): Promise<HarvestScheduleResponse[]> {
    const qb = this.harvestScheduleRepository.createQueryBuilder('hs');
    qb.leftJoinAndSelect('hs.supplier', 'supplier');
    qb.leftJoinAndSelect('hs.harvestTicket', 'harvestTicket');
    qb.leftJoinAndSelect('harvestTicket.harvestDetails', 'harvestDetails');
    qb.leftJoinAndSelect('harvestDetails.product', 'product');

    if (filters?.status) {
      qb.andWhere('hs.status = :status', { status: filters.status });
    }

    if (filters?.warehouseId) {
      qb.andWhere('supplier.warehouseId = :warehouseId', {
        warehouseId: filters.warehouseId,
      });
    }

    qb.orderBy('hs.id', sort ?? 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => HarvestScheduleMapper.toResponse(entity));
  }

  async findAllBySupplierWithPagination({
    supplierId,
    paginationOptions,
    filters,
    sort,
  }: {
    supplierId: string;
    paginationOptions: IPaginationOptions;
    filters?: { status?: HarvestScheduleStatusEnum };
    sort?: 'ASC' | 'DESC';
  }): Promise<HarvestScheduleResponse[]> {
    const qb = this.harvestScheduleRepository.createQueryBuilder('hs');
    qb.leftJoinAndSelect('hs.supplier', 'supplier');
    qb.leftJoinAndSelect('hs.harvestTicket', 'harvestTicket');
    qb.leftJoinAndSelect('harvestTicket.harvestDetails', 'harvestDetails');
    qb.leftJoinAndSelect('harvestDetails.product', 'product');

    qb.andWhere('supplier.id = :supplierId', { supplierId });
    if (filters?.status) {
      qb.andWhere('hs.status = :status', { status: filters.status });
    }

    qb.orderBy('hs.id', sort ?? 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => HarvestScheduleMapper.toResponse(entity));
  }

  async findById(
    id: HarvestSchedule['id'],
  ): Promise<NullableType<HarvestScheduleResponse>> {
    const qb = this.harvestScheduleRepository.createQueryBuilder('hs');
    qb.leftJoinAndSelect('hs.supplier', 'supplier');
    qb.leftJoinAndSelect('hs.harvestTicket', 'harvestTicket');
    qb.leftJoinAndSelect('harvestTicket.harvestDetails', 'harvestDetails');
    qb.leftJoinAndSelect('harvestDetails.product', 'product');
    qb.leftJoinAndSelect('supplier.user', 'user');
    qb.leftJoinAndSelect('supplier.warehouse', 'warehouse');
    qb.where('hs.id = :id', { id });

    const entity = await qb.getOne();

    return entity ? HarvestScheduleMapper.toResponse(entity) : null;
  }

  async findByIds(ids: HarvestSchedule['id'][]): Promise<HarvestSchedule[]> {
    const entities = await this.harvestScheduleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestScheduleMapper.toDomain(entity));
  }

  async update(
    id: HarvestSchedule['id'],
    payload: Partial<HarvestSchedule>,
  ): Promise<HarvestSchedule> {
    const entity = await this.harvestScheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestScheduleRepository.save(
      this.harvestScheduleRepository.create(
        HarvestScheduleMapper.toPersistence({
          ...HarvestScheduleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestScheduleMapper.toDomain(updatedEntity);
  }

  async cancel(id: HarvestSchedule['id']): Promise<HarvestSchedule> {
    return this.update(id, { status: HarvestScheduleStatusEnum.CANCELED });
  }

  async complete(id: HarvestSchedule['id']): Promise<HarvestSchedule> {
    return this.update(id, { status: HarvestScheduleStatusEnum.COMPLETED });
  }

  async remove(id: HarvestSchedule['id']): Promise<void> {
    await this.harvestScheduleRepository.delete(id);
  }
  async confirm(
    id: HarvestSchedule['id'],
    status: HarvestScheduleStatusEnum,
    reason?: string,
  ): Promise<HarvestSchedule | null> {
    const entity = await this.harvestScheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      return null;
    }

    entity.status = status;
    entity.reason = reason ?? null;
    const updatedEntity = await this.harvestScheduleRepository.save(entity);
    return HarvestScheduleMapper.toDomain(updatedEntity);
  }
}
