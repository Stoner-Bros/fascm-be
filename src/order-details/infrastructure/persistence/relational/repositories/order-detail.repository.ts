import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrderDetailEntity } from '../entities/order-detail.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrderDetail } from '../../../../domain/order-detail';
import { OrderDetailRepository } from '../../order-detail.repository';
import { OrderDetailMapper } from '../mappers/order-detail.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrderDetailRelationalRepository implements OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly orderDetailRepository: Repository<OrderDetailEntity>,
  ) {}

  async create(data: OrderDetail): Promise<OrderDetail> {
    const persistenceModel = OrderDetailMapper.toPersistence(data);
    const newEntity = await this.orderDetailRepository.save(
      this.orderDetailRepository.create(persistenceModel),
    );
    return OrderDetailMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderDetail[]> {
    const entities = await this.orderDetailRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrderDetailMapper.toDomain(entity));
  }

  async findById(id: OrderDetail['id']): Promise<NullableType<OrderDetail>> {
    const entity = await this.orderDetailRepository.findOne({
      where: { id },
    });

    return entity ? OrderDetailMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrderDetail['id'][]): Promise<OrderDetail[]> {
    const entities = await this.orderDetailRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderDetailMapper.toDomain(entity));
  }

  async update(
    id: OrderDetail['id'],
    payload: Partial<OrderDetail>,
  ): Promise<OrderDetail> {
    const entity = await this.orderDetailRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderDetailRepository.save(
      this.orderDetailRepository.create(
        OrderDetailMapper.toPersistence({
          ...OrderDetailMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderDetailMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderDetail['id']): Promise<void> {
    await this.orderDetailRepository.delete(id);
  }
}
