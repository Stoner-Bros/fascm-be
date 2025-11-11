import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ExportTicket } from '../../domain/export-ticket';

export abstract class ExportTicketRepository {
  abstract create(
    data: Omit<ExportTicket, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ExportTicket>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExportTicket[]>;

  abstract findById(
    id: ExportTicket['id'],
  ): Promise<NullableType<ExportTicket>>;

  abstract findByIds(ids: ExportTicket['id'][]): Promise<ExportTicket[]>;

  abstract update(
    id: ExportTicket['id'],
    payload: DeepPartial<ExportTicket>,
  ): Promise<ExportTicket | null>;

  abstract remove(id: ExportTicket['id']): Promise<void>;
}
