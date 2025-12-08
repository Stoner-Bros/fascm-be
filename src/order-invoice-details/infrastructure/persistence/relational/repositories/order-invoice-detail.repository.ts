import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderInvoice } from 'src/order-invoices/domain/order-invoice';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrderInvoiceDetail } from '../../../../domain/order-invoice-detail';
import { OrderInvoiceDetailRepository } from '../../order-invoice-detail.repository';
import { OrderInvoiceDetailEntity } from '../entities/order-invoice-detail.entity';
import { OrderInvoiceDetailMapper } from '../mappers/order-invoice-detail.mapper';

@Injectable()
export class OrderInvoiceDetailRelationalRepository
  implements OrderInvoiceDetailRepository
{
  constructor(
    @InjectRepository(OrderInvoiceDetailEntity)
    private readonly orderInvoiceDetailRepository: Repository<OrderInvoiceDetailEntity>,
  ) {}

  async create(data: OrderInvoiceDetail): Promise<OrderInvoiceDetail> {
    const persistenceModel = OrderInvoiceDetailMapper.toPersistence(data);
    const newEntity = await this.orderInvoiceDetailRepository.save(
      this.orderInvoiceDetailRepository.create(persistenceModel),
    );
    return OrderInvoiceDetailMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderInvoiceDetail[]> {
    const entities = await this.orderInvoiceDetailRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrderInvoiceDetailMapper.toDomain(entity));
  }

  async findById(
    id: OrderInvoiceDetail['id'],
  ): Promise<NullableType<OrderInvoiceDetail>> {
    const entity = await this.orderInvoiceDetailRepository.findOne({
      where: { id },
    });

    return entity ? OrderInvoiceDetailMapper.toDomain(entity) : null;
  }

  async findByInvoiceId(
    id: OrderInvoice['id'],
  ): Promise<NullableType<OrderInvoiceDetail[]>> {
    const entities = await this.orderInvoiceDetailRepository.find({
      where: { orderInvoice: { id } },
    });

    return entities
      ? entities.map((entity) => OrderInvoiceDetailMapper.toDomain(entity))
      : null;
  }

  async findByIds(
    ids: OrderInvoiceDetail['id'][],
  ): Promise<OrderInvoiceDetail[]> {
    const entities = await this.orderInvoiceDetailRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderInvoiceDetailMapper.toDomain(entity));
  }

  async update(
    id: OrderInvoiceDetail['id'],
    payload: Partial<OrderInvoiceDetail>,
  ): Promise<OrderInvoiceDetail> {
    const entity = await this.orderInvoiceDetailRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderInvoiceDetailRepository.save(
      this.orderInvoiceDetailRepository.create(
        OrderInvoiceDetailMapper.toPersistence({
          ...OrderInvoiceDetailMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderInvoiceDetailMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderInvoiceDetail['id']): Promise<void> {
    await this.orderInvoiceDetailRepository.delete(id);
  }
}
