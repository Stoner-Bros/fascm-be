import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestInvoiceDetail } from '../../domain/harvest-invoice-detail';

export abstract class HarvestInvoiceDetailRepository {
  abstract create(
    data: Omit<HarvestInvoiceDetail, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestInvoiceDetail>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestInvoiceDetail[]>;

  abstract findById(
    id: HarvestInvoiceDetail['id'],
  ): Promise<NullableType<HarvestInvoiceDetail>>;

  abstract findByIds(
    ids: HarvestInvoiceDetail['id'][],
  ): Promise<HarvestInvoiceDetail[]>;

  abstract update(
    id: HarvestInvoiceDetail['id'],
    payload: DeepPartial<HarvestInvoiceDetail>,
  ): Promise<HarvestInvoiceDetail | null>;

  abstract remove(id: HarvestInvoiceDetail['id']): Promise<void>;

  abstract findByHarvestInvoiceId(
    harvestInvoiceId: HarvestInvoiceDetail['id'],
  ): Promise<HarvestInvoiceDetail[]>;
}
