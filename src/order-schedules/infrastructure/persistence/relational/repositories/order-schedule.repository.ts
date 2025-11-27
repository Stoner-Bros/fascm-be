import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrderScheduleEntity } from '../entities/order-schedule.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrderSchedule } from '../../../../domain/order-schedule';
import { OrderScheduleRepository } from '../../order-schedule.repository';
import { OrderScheduleMapper } from '../mappers/order-schedule.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrderScheduleRelationalRepository
  implements OrderScheduleRepository
{
  constructor(
    @InjectRepository(OrderScheduleEntity)
    private readonly orderScheduleRepository: Repository<OrderScheduleEntity>,
  ) {}

  async create(data: OrderSchedule): Promise<OrderSchedule> {
    const persistenceModel = OrderScheduleMapper.toPersistence(data);
    const newEntity = await this.orderScheduleRepository.save(
      this.orderScheduleRepository.create(persistenceModel),
    );
    return OrderScheduleMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderSchedule[]> {
    const entities = await this.orderScheduleRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      order: {
        id: 'ASC',
      },
    });

    return entities.map((entity) => OrderScheduleMapper.toDomain(entity));
  }

  async findById(
    id: OrderSchedule['id'],
  ): Promise<NullableType<OrderSchedule>> {
    const entity = await this.orderScheduleRepository.findOne({
      where: { id },
    });

    return entity ? OrderScheduleMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrderSchedule['id'][]): Promise<OrderSchedule[]> {
    const entities = await this.orderScheduleRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderScheduleMapper.toDomain(entity));
  }

  async update(
    id: OrderSchedule['id'],
    payload: Partial<OrderSchedule>,
  ): Promise<OrderSchedule> {
    const entity = await this.orderScheduleRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderScheduleRepository.save(
      this.orderScheduleRepository.create(
        OrderScheduleMapper.toPersistence({
          ...OrderScheduleMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderScheduleMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderSchedule['id']): Promise<void> {
    await this.orderScheduleRepository.delete(id);
  }
}
