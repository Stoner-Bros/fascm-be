import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { AreaSetting } from '../../domain/area-setting';

export abstract class AreaSettingRepository {
  abstract create(
    data: Omit<AreaSetting, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<AreaSetting>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<AreaSetting[]>;

  abstract findById(id: AreaSetting['id']): Promise<NullableType<AreaSetting>>;

  abstract findByIds(ids: AreaSetting['id'][]): Promise<AreaSetting[]>;

  abstract update(
    id: AreaSetting['id'],
    payload: DeepPartial<AreaSetting>,
  ): Promise<AreaSetting | null>;

  abstract remove(id: AreaSetting['id']): Promise<void>;

  abstract findByAreaId(areaId: string): Promise<NullableType<AreaSetting>>;
}
