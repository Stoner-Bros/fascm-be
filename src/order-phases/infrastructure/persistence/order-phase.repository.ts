import { OrderPhaseResponse } from 'src/order-phases/dto/order-phase-response.dto';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { OrderPhase } from '../../domain/order-phase';

export abstract class OrderPhaseRepository {
  abstract create(
    data: Omit<OrderPhase, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<OrderPhase>;

  abstract findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: {
      deliveryStaffId?: string;
    };
  }): Promise<OrderPhaseResponse[]>;

  abstract findAllByScheduleWithPagination({
    scheduleId,
    paginationOptions,
  }: {
    scheduleId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<OrderPhaseResponse[]>;

  abstract findFullById(
    id: OrderPhase['id'],
  ): Promise<NullableType<OrderPhaseResponse>>;

  abstract findById(id: OrderPhase['id']): Promise<NullableType<OrderPhase>>;

  abstract findByIds(ids: OrderPhase['id'][]): Promise<OrderPhase[]>;

  abstract update(
    id: OrderPhase['id'],
    payload: DeepPartial<OrderPhase>,
  ): Promise<OrderPhase | null>;

  abstract remove(id: OrderPhase['id']): Promise<void>;
}
