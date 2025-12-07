import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestInvoice } from '../../domain/harvest-invoice';

export abstract class HarvestInvoiceRepository {
  abstract create(
    data: Omit<HarvestInvoice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestInvoice>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestInvoice[]>;

  abstract findById(
    id: HarvestInvoice['id'],
  ): Promise<NullableType<HarvestInvoice>>;

  abstract findByIds(ids: HarvestInvoice['id'][]): Promise<HarvestInvoice[]>;

  abstract update(
    id: HarvestInvoice['id'],
    payload: DeepPartial<HarvestInvoice>,
  ): Promise<HarvestInvoice | null>;

  abstract remove(id: HarvestInvoice['id']): Promise<void>;

  abstract findByHarvestPhaseId(
    harvestPhaseId: HarvestInvoice['id'],
  ): Promise<NullableType<HarvestInvoice>>;
}
