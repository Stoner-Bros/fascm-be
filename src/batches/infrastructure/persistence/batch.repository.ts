import { BatchResponse } from 'src/batches/dto/batch-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Batch } from '../../domain/batch';

export abstract class BatchRepository {
  abstract create(
    data: Omit<Batch, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Batch>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Batch[]>;

  abstract findById(id: Batch['id']): Promise<NullableType<Batch>>;

  abstract findByIds(ids: Batch['id'][]): Promise<Batch[]>;

  abstract update(
    id: Batch['id'],
    payload: DeepPartial<Batch>,
  ): Promise<Batch | null>;

  abstract remove(id: Batch['id']): Promise<void>;

  abstract findByFiltersWithPagination({
    areaId,
    productId,
    paginationOptions,
  }: {
    areaId?: string;
    productId?: string;
    paginationOptions: IPaginationOptions;
  }): Promise<BatchResponse[]>;
}
