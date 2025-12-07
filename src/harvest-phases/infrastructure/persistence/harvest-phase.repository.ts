import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestPhase } from '../../domain/harvest-phase';

export abstract class HarvestPhaseRepository {
  abstract create(
    data: Omit<HarvestPhase, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestPhase>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestPhase[]>;

  abstract findById(
    id: HarvestPhase['id'],
  ): Promise<NullableType<HarvestPhase>>;

  abstract findByIds(ids: HarvestPhase['id'][]): Promise<HarvestPhase[]>;

  abstract update(
    id: HarvestPhase['id'],
    payload: DeepPartial<HarvestPhase>,
  ): Promise<HarvestPhase | null>;

  abstract remove(id: HarvestPhase['id']): Promise<void>;
}
