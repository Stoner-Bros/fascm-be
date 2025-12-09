import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ImportTicketEntity } from '../entities/import-ticket.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ImportTicket } from '../../../../domain/import-ticket';
import { ImportTicketRepository } from '../../import-ticket.repository';
import { ImportTicketMapper } from '../mappers/import-ticket.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ImportTicketRelationalRepository
  implements ImportTicketRepository
{
  constructor(
    @InjectRepository(ImportTicketEntity)
    private readonly importTicketRepository: Repository<ImportTicketEntity>,
  ) {}

  async create(data: ImportTicket): Promise<ImportTicket> {
    const persistenceModel = ImportTicketMapper.toPersistence(data);
    const newEntity = await this.importTicketRepository.save(
      this.importTicketRepository.create(persistenceModel),
    );
    return ImportTicketMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImportTicket[]> {
    const entities = await this.importTicketRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ImportTicketMapper.toDomain(entity));
  }

  async findById(id: ImportTicket['id']): Promise<NullableType<ImportTicket>> {
    const entity = await this.importTicketRepository.findOne({
      where: { id },
    });

    return entity ? ImportTicketMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ImportTicket['id'][]): Promise<ImportTicket[]> {
    const entities = await this.importTicketRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ImportTicketMapper.toDomain(entity));
  }

  async update(
    id: ImportTicket['id'],
    payload: Partial<ImportTicket>,
  ): Promise<ImportTicket> {
    const entity = await this.importTicketRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.importTicketRepository.save(
      this.importTicketRepository.create(
        ImportTicketMapper.toPersistence({
          ...ImportTicketMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ImportTicketMapper.toDomain(updatedEntity);
  }

  async remove(id: ImportTicket['id']): Promise<void> {
    await this.importTicketRepository.delete(id);
  }

  async findByAreaWithPagination({
    areaId,
    paginationOptions,
  }: {
    areaId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<ImportTicket[]> {
    const queryBuilder = this.importTicketRepository
      .createQueryBuilder('importTicket')
      .where(
        'importTicket.id IN (SELECT DISTINCT "batch"."importTicketId" FROM "batch" WHERE "batch"."areaId" = :areaId)',
        { areaId },
      )
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .take(paginationOptions.limit);

    const entities = await queryBuilder.getMany();
    return entities.map((entity) => ImportTicketMapper.toDomain(entity));
  }
}
