import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HarvestTicketEntity } from '../entities/harvest-ticket.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HarvestTicket } from '../../../../domain/harvest-ticket';
import { HarvestTicketRepository } from '../../harvest-ticket.repository';
import { HarvestTicketMapper } from '../mappers/harvest-ticket.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class HarvestTicketRelationalRepository
  implements HarvestTicketRepository
{
  constructor(
    @InjectRepository(HarvestTicketEntity)
    private readonly harvestTicketRepository: Repository<HarvestTicketEntity>,
  ) {}

  async create(data: HarvestTicket): Promise<HarvestTicket> {
    const persistenceModel = HarvestTicketMapper.toPersistence(data);
    const newEntity = await this.harvestTicketRepository.save(
      this.harvestTicketRepository.create(persistenceModel),
    );
    return HarvestTicketMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<HarvestTicket[]> {
    const entities = await this.harvestTicketRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => HarvestTicketMapper.toDomain(entity));
  }

  async findById(
    id: HarvestTicket['id'],
  ): Promise<NullableType<HarvestTicket>> {
    const entity = await this.harvestTicketRepository.findOne({
      where: { id },
    });

    return entity ? HarvestTicketMapper.toDomain(entity) : null;
  }

  async findByIds(ids: HarvestTicket['id'][]): Promise<HarvestTicket[]> {
    const entities = await this.harvestTicketRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => HarvestTicketMapper.toDomain(entity));
  }

  async update(
    id: HarvestTicket['id'],
    payload: Partial<HarvestTicket>,
  ): Promise<HarvestTicket> {
    const entity = await this.harvestTicketRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.harvestTicketRepository.save(
      this.harvestTicketRepository.create(
        HarvestTicketMapper.toPersistence({
          ...HarvestTicketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return HarvestTicketMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestTicket['id']): Promise<void> {
    await this.harvestTicketRepository.delete(id);
  }
}
