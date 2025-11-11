import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ExportTicketEntity } from '../entities/export-ticket.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ExportTicket } from '../../../../domain/export-ticket';
import { ExportTicketRepository } from '../../export-ticket.repository';
import { ExportTicketMapper } from '../mappers/export-ticket.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ExportTicketRelationalRepository
  implements ExportTicketRepository
{
  constructor(
    @InjectRepository(ExportTicketEntity)
    private readonly exportTicketRepository: Repository<ExportTicketEntity>,
  ) {}

  async create(data: ExportTicket): Promise<ExportTicket> {
    const persistenceModel = ExportTicketMapper.toPersistence(data);
    const newEntity = await this.exportTicketRepository.save(
      this.exportTicketRepository.create(persistenceModel),
    );
    return ExportTicketMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ExportTicket[]> {
    const entities = await this.exportTicketRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ExportTicketMapper.toDomain(entity));
  }

  async findById(id: ExportTicket['id']): Promise<NullableType<ExportTicket>> {
    const entity = await this.exportTicketRepository.findOne({
      where: { id },
    });

    return entity ? ExportTicketMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ExportTicket['id'][]): Promise<ExportTicket[]> {
    const entities = await this.exportTicketRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ExportTicketMapper.toDomain(entity));
  }

  async update(
    id: ExportTicket['id'],
    payload: Partial<ExportTicket>,
  ): Promise<ExportTicket> {
    const entity = await this.exportTicketRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.exportTicketRepository.save(
      this.exportTicketRepository.create(
        ExportTicketMapper.toPersistence({
          ...ExportTicketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ExportTicketMapper.toDomain(updatedEntity);
  }

  async remove(id: ExportTicket['id']): Promise<void> {
    await this.exportTicketRepository.delete(id);
  }
}
