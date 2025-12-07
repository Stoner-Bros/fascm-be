import { Product } from 'src/products/domain/product';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { InboundBatch } from '../../domain/inbound-batch';

export abstract class InboundBatchRepository {
  abstract create(
    data: Omit<InboundBatch, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<InboundBatch>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<InboundBatch[]>;

  abstract findById(
    id: InboundBatch['id'],
  ): Promise<NullableType<InboundBatch>>;

  abstract findByIds(ids: InboundBatch['id'][]): Promise<InboundBatch[]>;

  abstract update(
    id: InboundBatch['id'],
    payload: DeepPartial<InboundBatch>,
  ): Promise<InboundBatch | null>;

  abstract remove(id: InboundBatch['id']): Promise<void>;

  abstract getProductOfInboundBatch(
    inboundBatch: InboundBatch,
  ): Promise<Product | null>;
}
