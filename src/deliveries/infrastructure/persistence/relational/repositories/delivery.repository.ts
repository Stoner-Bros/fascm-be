import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DeliveryEntity } from '../entities/delivery.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Delivery } from '../../../../domain/delivery';
import { DeliveryRepository } from '../../delivery.repository';
import { DeliveryMapper } from '../mappers/delivery.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DeliveryRelationalRepository implements DeliveryRepository {
  constructor(
    @InjectRepository(DeliveryEntity)
    private readonly deliveryRepository: Repository<DeliveryEntity>,
  ) {}

  async create(data: Delivery): Promise<Delivery> {
    const persistenceModel = DeliveryMapper.toPersistence(data);
    const newEntity = await this.deliveryRepository.save(
      this.deliveryRepository.create(persistenceModel),
    );
    return DeliveryMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { orderScheduleId?: string };
  }): Promise<Delivery[]> {
    const qb = this.deliveryRepository.createQueryBuilder('delivery');
    qb.leftJoinAndSelect('delivery.orderSchedule', 'orderSchedule');
    qb.leftJoinAndSelect('delivery.truck', 'truck');
    qb.leftJoinAndSelect('delivery.harvestSchedule', 'harvestSchedule');

    if (filters?.orderScheduleId) {
      qb.andWhere('orderSchedule.id = :orderScheduleId', {
        orderScheduleId: filters.orderScheduleId,
      });
    }

    qb.orderBy('delivery.id', 'ASC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => DeliveryMapper.toDomain(entity));
  }

  async findById(id: Delivery['id']): Promise<NullableType<Delivery>> {
    const entity = await this.deliveryRepository.findOne({
      where: { id },
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Delivery['id'][]): Promise<Delivery[]> {
    const entities = await this.deliveryRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DeliveryMapper.toDomain(entity));
  }

  async findByOrderScheduleId(
    orderScheduleId: string,
  ): Promise<NullableType<Delivery>> {
    const entity = await this.deliveryRepository.findOne({
      where: { orderSchedule: { id: orderScheduleId } },
      relations: ['orderSchedule', 'harvestSchedule', 'truck'],
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async findByHarvestScheduleId(
    harvestScheduleId: string,
  ): Promise<NullableType<Delivery>> {
    const entity = await this.deliveryRepository.findOne({
      where: { harvestSchedule: { id: harvestScheduleId } },
      relations: ['orderSchedule', 'harvestSchedule', 'truck'],
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async update(
    id: Delivery['id'],
    payload: Partial<Delivery>,
  ): Promise<Delivery> {
    const entity = await this.deliveryRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.deliveryRepository.save(
      this.deliveryRepository.create(
        DeliveryMapper.toPersistence({
          ...DeliveryMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DeliveryMapper.toDomain(updatedEntity);
  }

  async remove(id: Delivery['id']): Promise<void> {
    await this.deliveryRepository.delete(id);
  }
}
