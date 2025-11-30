import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Consignee } from '../../domain/consignee';

export abstract class ConsigneeRepository {
  abstract create(
    data: Omit<Consignee, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Consignee>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Consignee[]>;

  abstract findById(id: Consignee['id']): Promise<NullableType<Consignee>>;

  abstract findByUserId(userId: number): Promise<NullableType<Consignee>>;

  abstract findByIds(ids: Consignee['id'][]): Promise<Consignee[]>;

  abstract update(
    id: Consignee['id'],
    payload: DeepPartial<Consignee>,
  ): Promise<Consignee | null>;

  abstract remove(id: Consignee['id']): Promise<void>;
}
