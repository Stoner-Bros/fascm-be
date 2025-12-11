import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/order-details/domain/order-detail';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrderDetailSelection } from '../../../../domain/order-detail-selection';
import { OrderDetailSelectionRepository } from '../../order-detail-selection.repository';
import { OrderDetailSelectionEntity } from '../entities/order-detail-selection.entity';
import { OrderDetailSelectionMapper } from '../mappers/order-detail-selection.mapper';

@Injectable()
export class OrderDetailSelectionRelationalRepository
  implements OrderDetailSelectionRepository
{
  constructor(
    @InjectRepository(OrderDetailSelectionEntity)
    private readonly orderDetailSelectionRepository: Repository<OrderDetailSelectionEntity>,
  ) {}

  async create(data: OrderDetailSelection): Promise<OrderDetailSelection> {
    const persistenceModel = OrderDetailSelectionMapper.toPersistence(data);
    const newEntity = await this.orderDetailSelectionRepository.save(
      this.orderDetailSelectionRepository.create(persistenceModel),
    );
    return OrderDetailSelectionMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderDetailSelection[]> {
    const entities = await this.orderDetailSelectionRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) =>
      OrderDetailSelectionMapper.toDomain(entity),
    );
  }

  async findById(
    id: OrderDetailSelection['id'],
  ): Promise<NullableType<OrderDetailSelection>> {
    const entity = await this.orderDetailSelectionRepository.findOne({
      where: { id },
    });

    return entity ? OrderDetailSelectionMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: OrderDetailSelection['id'][],
  ): Promise<OrderDetailSelection[]> {
    const entities = await this.orderDetailSelectionRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) =>
      OrderDetailSelectionMapper.toDomain(entity),
    );
  }

  async update(
    id: OrderDetailSelection['id'],
    payload: Partial<OrderDetailSelection>,
  ): Promise<OrderDetailSelection> {
    const entity = await this.orderDetailSelectionRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderDetailSelectionRepository.save(
      this.orderDetailSelectionRepository.create(
        OrderDetailSelectionMapper.toPersistence({
          ...OrderDetailSelectionMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderDetailSelectionMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderDetailSelection['id']): Promise<void> {
    await this.orderDetailSelectionRepository.delete(id);
  }

  async removeAllByOrderDetailId(
    orderDetailId: OrderDetail['id'],
  ): Promise<void> {
    await this.orderDetailSelectionRepository.delete({
      orderDetail: { id: orderDetailId },
    });
  }
}
