import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderInvoiceDetail } from '../../domain/order-invoice-detail';

export abstract class OrderInvoiceDetailRepository {
  abstract create(
    data: Omit<OrderInvoiceDetail, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderInvoiceDetail>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderInvoiceDetail[]>;

  abstract findById(
    id: OrderInvoiceDetail['id'],
  ): Promise<NullableType<OrderInvoiceDetail>>;

  abstract findByIds(
    ids: OrderInvoiceDetail['id'][],
  ): Promise<OrderInvoiceDetail[]>;

  abstract update(
    id: OrderInvoiceDetail['id'],
    payload: DeepPartial<OrderInvoiceDetail>,
  ): Promise<OrderInvoiceDetail | null>;

  abstract remove(id: OrderInvoiceDetail['id']): Promise<void>;
}
