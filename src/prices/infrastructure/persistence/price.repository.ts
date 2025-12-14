import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Price } from '../../domain/price';

export abstract class PriceRepository {
  abstract create(
    data: Omit<Price, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Price>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Price[]>;

  abstract findById(id: Price['id']): Promise<NullableType<Price>>;

  abstract findByIds(ids: Price['id'][]): Promise<Price[]>;

  abstract update(
    id: Price['id'],
    payload: DeepPartial<Price>,
  ): Promise<Price | null>;

  abstract remove(id: Price['id']): Promise<void>;

  abstract findByBatchId(batchId: string): Promise<Price[]>;
}
