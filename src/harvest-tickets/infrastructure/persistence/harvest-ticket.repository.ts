import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { HarvestTicket } from '../../domain/harvest-ticket';
import { HarvestTicketResponse } from '../../dto/harvest-ticket-response.dto';

export abstract class HarvestTicketRepository {
  abstract create(
    data: Omit<HarvestTicket, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<HarvestTicket>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestTicketResponse[]>;

  abstract findById(
    id: HarvestTicket['id'],
  ): Promise<NullableType<HarvestTicket>>;

  abstract findByIds(ids: HarvestTicket['id'][]): Promise<HarvestTicket[]>;

  abstract update(
    id: HarvestTicket['id'],
    payload: DeepPartial<HarvestTicket>,
  ): Promise<HarvestTicket | null>;

  abstract remove(id: HarvestTicket['id']): Promise<void>;
}
