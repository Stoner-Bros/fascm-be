import { DeliveryResponse } from 'src/deliveries/dto/delivery-response.dto';
import { HarvestPhase } from 'src/harvest-phases/domain/harvest-phase';
import { OrderPhase } from 'src/order-phases/domain/order-phase';
import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Delivery } from '../../domain/delivery';

export abstract class DeliveryRepository {
  abstract create(
    data: Omit<Delivery, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Delivery>;

  abstract findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { orderPhaseId?: string; harvestPhaseId?: string };
  }): Promise<DeliveryResponse[]>;

  abstract findById(id: Delivery['id']): Promise<NullableType<Delivery>>;

  abstract findByIds(ids: Delivery['id'][]): Promise<Delivery[]>;

  abstract findByOrderPhaseId(
    orderPhaseId: OrderPhase['id'],
  ): Promise<NullableType<Delivery>>;

  abstract findByHarvestPhaseId(
    harvestPhaseId: HarvestPhase['id'],
  ): Promise<NullableType<Delivery>>;

  abstract update(
    id: Delivery['id'],
    payload: DeepPartial<Delivery>,
  ): Promise<Delivery | null>;

  abstract remove(id: Delivery['id']): Promise<void>;
}
