import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ConsigneeEntity } from '../entities/consignee.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Consignee } from '../../../../domain/consignee';
import { ConsigneeRepository } from '../../consignee.repository';
import { ConsigneeMapper } from '../mappers/consignee.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ConsigneeRelationalRepository implements ConsigneeRepository {
  constructor(
    @InjectRepository(ConsigneeEntity)
    private readonly consigneeRepository: Repository<ConsigneeEntity>,
  ) {}

  async create(data: Consignee): Promise<Consignee> {
    const persistenceModel = ConsigneeMapper.toPersistence(data);
    const newEntity = await this.consigneeRepository.save(
      this.consigneeRepository.create(persistenceModel),
    );
    return ConsigneeMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Consignee[]> {
    const entities = await this.consigneeRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ConsigneeMapper.toDomain(entity));
  }

  async findById(id: Consignee['id']): Promise<NullableType<Consignee>> {
    const entity = await this.consigneeRepository.findOne({
      where: { id },
    });

    return entity ? ConsigneeMapper.toDomain(entity) : null;
  }

  async findByUserId(userId: number): Promise<NullableType<Consignee>> {
    const entity = await this.consigneeRepository.findOne({
      where: { user: { id: userId } },
    });
    return entity ? ConsigneeMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Consignee['id'][]): Promise<Consignee[]> {
    const entities = await this.consigneeRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ConsigneeMapper.toDomain(entity));
  }

  async update(
    id: Consignee['id'],
    payload: Partial<Consignee>,
  ): Promise<Consignee> {
    const entity = await this.consigneeRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.consigneeRepository.save(
      this.consigneeRepository.create(
        ConsigneeMapper.toPersistence({
          ...ConsigneeMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ConsigneeMapper.toDomain(updatedEntity);
  }

  async remove(id: Consignee['id']): Promise<void> {
    await this.consigneeRepository.delete(id);
  }
}
