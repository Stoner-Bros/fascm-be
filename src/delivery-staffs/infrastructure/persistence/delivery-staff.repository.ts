import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { DeliveryStaff } from '../../domain/delivery-staff';

export abstract class DeliveryStaffRepository {
  abstract create(
    data: Omit<DeliveryStaff, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<DeliveryStaff>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DeliveryStaff[]>;

  abstract findById(
    id: DeliveryStaff['id'],
  ): Promise<NullableType<DeliveryStaff>>;

  abstract findByUserId(userId: string): Promise<NullableType<DeliveryStaff>>;

  abstract findByIds(ids: DeliveryStaff['id'][]): Promise<DeliveryStaff[]>;

  abstract update(
    id: DeliveryStaff['id'],
    payload: DeepPartial<DeliveryStaff>,
  ): Promise<DeliveryStaff | null>;

  abstract remove(id: DeliveryStaff['id']): Promise<void>;
}
