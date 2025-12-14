import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Debt } from '../../domain/debt';

export abstract class DebtRepository {
  abstract create(
    data: Omit<Debt, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Debt>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Debt[]>;

  abstract findById(id: Debt['id']): Promise<NullableType<Debt>>;

  abstract findByIds(ids: Debt['id'][]): Promise<Debt[]>;

  abstract update(
    id: Debt['id'],
    payload: DeepPartial<Debt>,
  ): Promise<Debt | null>;

  abstract remove(id: Debt['id']): Promise<void>;

  abstract getDebtByPartnerId(
    partnerId: string,
    partnerType: string,
  ): Promise<Debt>;
}
