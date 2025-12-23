import { OrderScheduleResponse } from 'src/order-schedules/dto/order-schedule-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderSchedule } from '../../domain/order-schedule';

export abstract class OrderScheduleRepository {
  abstract create(
    data: Omit<OrderSchedule, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderSchedule>;

  abstract findAllWithPagination({
    warehouseId,
    paginationOptions,
    filters,
    sort,
  }: {
    warehouseId?: string;
    paginationOptions: IPaginationOptions;
    filters?: {
      status?: OrderSchedule['status'];
      deliveryStaffId?: string;
    };
    sort?: 'ASC' | 'DESC';
  }): Promise<OrderScheduleResponse[]>;

  abstract findAllByConsigneeWithPagination({
    warehouseId,
    consigneeId,
    paginationOptions,
    filters,
    sort,
  }: {
    warehouseId?: string;
    consigneeId: string;
    paginationOptions: IPaginationOptions;
    filters?: {
      status?: OrderSchedule['status'];
    };
    sort?: 'ASC' | 'DESC';
  }): Promise<OrderScheduleResponse[]>;

  abstract findById(
    id: OrderSchedule['id'],
  ): Promise<NullableType<OrderScheduleResponse>>;

  abstract findByIds(ids: OrderSchedule['id'][]): Promise<OrderSchedule[]>;

  abstract update(
    id: OrderSchedule['id'],
    payload: DeepPartial<OrderSchedule>,
  ): Promise<OrderSchedule | null>;

  abstract remove(id: OrderSchedule['id']): Promise<void>;

  abstract getTotalPaymentByScheduleId(
    orderScheduleId: OrderSchedule['id'],
  ): Promise<number>;
}
