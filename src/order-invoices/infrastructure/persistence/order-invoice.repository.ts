import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderInvoice } from '../../domain/order-invoice';

export abstract class OrderInvoiceRepository {
  abstract create(
    data: Omit<OrderInvoice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderInvoice>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderInvoice[]>;

  abstract findById(
    id: OrderInvoice['id'],
  ): Promise<NullableType<OrderInvoice>>;

  abstract findByIds(ids: OrderInvoice['id'][]): Promise<OrderInvoice[]>;

  abstract update(
    id: OrderInvoice['id'],
    payload: DeepPartial<OrderInvoice>,
  ): Promise<OrderInvoice | null>;

  abstract remove(id: OrderInvoice['id']): Promise<void>;
}
