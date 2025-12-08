import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderScheduleResponse } from 'src/order-schedules/dto/order-schedule-response.dto';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrderSchedule } from '../../../../domain/order-schedule';
import { OrderScheduleRepository } from '../../order-schedule.repository';
import { OrderScheduleEntity } from '../entities/order-schedule.entity';
import { OrderScheduleMapper } from '../mappers/order-schedule.mapper';

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
    filters,
    sort,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: {
      status?: OrderSchedule['status'];
    };
    sort?: 'ASC' | 'DESC';
  }): Promise<OrderScheduleResponse[]> {
    const qb = this.orderScheduleRepository.createQueryBuilder('os');
    qb.leftJoinAndSelect('os.consignee', 'consignee');
    qb.leftJoinAndSelect('os.order', 'order');
    qb.leftJoinAndSelect('order.orderDetails', 'orderDetails');
    qb.leftJoinAndSelect('orderDetails.product', 'product');

    if (filters?.status) {
      qb.andWhere('os.status = :status', { status: filters.status });
    }

    qb.orderBy('os.id', sort ?? 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => OrderScheduleMapper.toResponse(entity));
  }

  async findAllByConsigneeWithPagination({
    consigneeId,
    paginationOptions,
    filters,
    sort,
  }: {
    consigneeId: string;
    paginationOptions: IPaginationOptions;
    filters?: {
      status?: OrderSchedule['status'];
    };
    sort?: 'ASC' | 'DESC';
  }): Promise<OrderScheduleResponse[]> {
    const qb = this.orderScheduleRepository.createQueryBuilder('os');
    qb.leftJoinAndSelect('os.consignee', 'consignee');
    qb.leftJoinAndSelect('os.order', 'order');
    qb.leftJoinAndSelect('order.orderDetails', 'orderDetails');
    qb.leftJoinAndSelect('orderDetails.product', 'product');

    qb.andWhere('consignee.id = :consigneeId', { consigneeId });

    if (filters?.status) {
      qb.andWhere('os.status = :status', { status: filters.status });
    }

    qb.orderBy('os.id', sort ?? 'DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => OrderScheduleMapper.toResponse(entity));
  }

  async findById(
    id: OrderSchedule['id'],
  ): Promise<NullableType<OrderScheduleResponse>> {
    const qb = this.orderScheduleRepository.createQueryBuilder('os');
    qb.leftJoinAndSelect('os.consignee', 'consignee');
    qb.leftJoinAndSelect('os.order', 'order');
    qb.leftJoinAndSelect('order.orderDetails', 'orderDetails');
    qb.leftJoinAndSelect('orderDetails.product', 'product');
    qb.leftJoinAndSelect('consignee.user', 'user');
    qb.where('os.id = :id', { id });

    const entity = await qb.getOne();

    return entity ? OrderScheduleMapper.toResponse(entity) : null;
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
