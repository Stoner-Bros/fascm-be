import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestDetail } from '../../domain/harvest-detail';

export abstract class HarvestDetailRepository {
  abstract create(
    data: Omit<HarvestDetail, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestDetail>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestDetail[]>;

  abstract findById(
    id: HarvestDetail['id'],
  ): Promise<NullableType<HarvestDetail>>;

  abstract findByIds(ids: HarvestDetail['id'][]): Promise<HarvestDetail[]>;

  abstract update(
    id: HarvestDetail['id'],
    payload: DeepPartial<HarvestDetail>,
  ): Promise<HarvestDetail | null>;

  abstract remove(id: HarvestDetail['id']): Promise<void>;
}
