import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ImportTicket } from '../../domain/import-ticket';

export abstract class ImportTicketRepository {
  abstract create(
    data: Omit<ImportTicket, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ImportTicket>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImportTicket[]>;

  abstract findById(
    id: ImportTicket['id'],
  ): Promise<NullableType<ImportTicket>>;

  abstract findByIds(ids: ImportTicket['id'][]): Promise<ImportTicket[]>;

  abstract update(
    id: ImportTicket['id'],
    payload: DeepPartial<ImportTicket>,
  ): Promise<ImportTicket | null>;

  abstract remove(id: ImportTicket['id']): Promise<void>;

  abstract findByAreaWithPagination({
    areaId,
    paginationOptions,
  }: {
    areaId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<ImportTicket[]>;
}
