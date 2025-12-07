import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrderInvoiceEntity } from '../entities/order-invoice.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrderInvoice } from '../../../../domain/order-invoice';
import { OrderInvoiceRepository } from '../../order-invoice.repository';
import { OrderInvoiceMapper } from '../mappers/order-invoice.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrderInvoiceRelationalRepository
  implements OrderInvoiceRepository
{
  constructor(
    @InjectRepository(OrderInvoiceEntity)
    private readonly orderInvoiceRepository: Repository<OrderInvoiceEntity>,
  ) {}

  async create(data: OrderInvoice): Promise<OrderInvoice> {
    const persistenceModel = OrderInvoiceMapper.toPersistence(data);
    const newEntity = await this.orderInvoiceRepository.save(
      this.orderInvoiceRepository.create(persistenceModel),
    );
    return OrderInvoiceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderInvoice[]> {
    const entities = await this.orderInvoiceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrderInvoiceMapper.toDomain(entity));
  }

  async findById(id: OrderInvoice['id']): Promise<NullableType<OrderInvoice>> {
    const entity = await this.orderInvoiceRepository.findOne({
      where: { id },
    });

    return entity ? OrderInvoiceMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrderInvoice['id'][]): Promise<OrderInvoice[]> {
    const entities = await this.orderInvoiceRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderInvoiceMapper.toDomain(entity));
  }

  async update(
    id: OrderInvoice['id'],
    payload: Partial<OrderInvoice>,
  ): Promise<OrderInvoice> {
    const entity = await this.orderInvoiceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderInvoiceRepository.save(
      this.orderInvoiceRepository.create(
        OrderInvoiceMapper.toPersistence({
          ...OrderInvoiceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderInvoiceMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderInvoice['id']): Promise<void> {
    await this.orderInvoiceRepository.delete(id);
  }
}
