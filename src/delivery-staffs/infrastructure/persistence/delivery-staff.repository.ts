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
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { warehouseId?: string };
  }): Promise<DeliveryStaff[]>;

  abstract findById(
    id: DeliveryStaff['id'],
  ): Promise<NullableType<DeliveryStaff>>;

  abstract findByUserId(userId: number): Promise<NullableType<DeliveryStaff>>;

  abstract findByIds(ids: DeliveryStaff['id'][]): Promise<DeliveryStaff[]>;
  abstract findByWarehouseId(warehouseId: string): Promise<DeliveryStaff[]>;

  abstract update(
    id: DeliveryStaff['id'],
    payload: DeepPartial<DeliveryStaff>,
  ): Promise<DeliveryStaff | null>;

  abstract remove(id: DeliveryStaff['id']): Promise<void>;
}
