import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeliveryResponse } from 'src/deliveries/dto/delivery-response.dto';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Delivery } from '../../../../domain/delivery';
import { DeliveryRepository } from '../../delivery.repository';
import { DeliveryEntity } from '../entities/delivery.entity';
import { DeliveryMapper } from '../mappers/delivery.mapper';

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
    filters?: { orderPhaseId?: string; harvestPhaseId?: string };
  }): Promise<DeliveryResponse[]> {
    const qb = this.deliveryRepository.createQueryBuilder('delivery');
    qb.leftJoinAndSelect('delivery.orderPhase', 'orderPhase');
    qb.leftJoinAndSelect('delivery.truck', 'truck');
    qb.leftJoinAndSelect('delivery.deliveryStaff', 'deliveryStaff');
    qb.leftJoinAndSelect('delivery.harvestPhase', 'harvestPhase');
    qb.leftJoinAndSelect('orderPhase.orderSchedule', 'orderSchedule');
    qb.leftJoinAndSelect('harvestPhase.harvestSchedule', 'harvestSchedule');

    if (filters?.orderPhaseId) {
      qb.andWhere('orderPhase.id = :orderPhaseId', {
        orderPhaseId: filters.orderPhaseId,
      });
    }
    if (filters?.harvestPhaseId) {
      qb.andWhere('harvestPhase.id = :harvestPhaseId', {
        harvestPhaseId: filters.harvestPhaseId,
      });
    }

    qb.orderBy('delivery.id', 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => ({
      ...DeliveryMapper.toResponse(entity),
      orderPhase: entity.orderPhase || null,
      harvestPhase: entity.harvestPhase || null,
    }));
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

  async findByOrderPhaseId(
    orderPhaseId: string,
  ): Promise<NullableType<Delivery>> {
    const entity = await this.deliveryRepository.findOne({
      where: { orderPhase: { id: orderPhaseId } },
      relations: ['orderPhase', 'truck', 'deliveryStaff'],
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async findByHarvestPhaseId(
    harvestPhaseId: string,
  ): Promise<NullableType<Delivery>> {
    const entity = await this.deliveryRepository.findOne({
      where: { harvestPhase: { id: harvestPhaseId } },
      relations: ['harvestPhase', 'truck', 'deliveryStaff'],
    });

    return entity ? DeliveryMapper.toDomain(entity) : null;
  }

  async findAllWithHarvestPhase({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DeliveryResponse[]> {
    const qb = this.deliveryRepository.createQueryBuilder('delivery');
    qb.leftJoinAndSelect('delivery.orderPhase', 'orderPhase');
    qb.leftJoinAndSelect('delivery.truck', 'truck');
    qb.leftJoinAndSelect('delivery.deliveryStaff', 'deliveryStaff');
    qb.leftJoinAndSelect('delivery.harvestPhase', 'harvestPhase');
    qb.leftJoinAndSelect('orderPhase.orderSchedule', 'orderSchedule');
    qb.leftJoinAndSelect('harvestPhase.harvestSchedule', 'harvestSchedule');

    qb.andWhere('harvestPhase.id IS NOT NULL');

    qb.orderBy('delivery.id', 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => ({
      ...DeliveryMapper.toResponse(entity),
      orderPhase: entity.orderPhase || null,
      harvestPhase: entity.harvestPhase || null,
    }));
  }

  async findAllWithOrderPhase({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DeliveryResponse[]> {
    const qb = this.deliveryRepository.createQueryBuilder('delivery');
    qb.leftJoinAndSelect('delivery.orderPhase', 'orderPhase');
    qb.leftJoinAndSelect('delivery.truck', 'truck');
    qb.leftJoinAndSelect('delivery.deliveryStaff', 'deliveryStaff');
    qb.leftJoinAndSelect('delivery.harvestPhase', 'harvestPhase');
    qb.leftJoinAndSelect('orderPhase.orderSchedule', 'orderSchedule');
    qb.leftJoinAndSelect('harvestPhase.harvestSchedule', 'harvestSchedule');

    qb.andWhere('orderPhase.id IS NOT NULL');

    qb.orderBy('delivery.id', 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => ({
      ...DeliveryMapper.toResponse(entity),
      orderPhase: entity.orderPhase || null,
      harvestPhase: entity.harvestPhase || null,
    }));
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
