import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { TruckSetting } from '../../domain/truck-setting';

export abstract class TruckSettingRepository {
  abstract create(
    data: Omit<TruckSetting, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<TruckSetting>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<TruckSetting[]>;

  abstract findById(
    id: TruckSetting['id'],
  ): Promise<NullableType<TruckSetting>>;

  abstract findByIds(ids: TruckSetting['id'][]): Promise<TruckSetting[]>;

  abstract update(
    id: TruckSetting['id'],
    payload: DeepPartial<TruckSetting>,
  ): Promise<TruckSetting | null>;

  abstract remove(id: TruckSetting['id']): Promise<void>;

  abstract findByTruckId(truckId: string): Promise<NullableType<TruckSetting>>;
}
