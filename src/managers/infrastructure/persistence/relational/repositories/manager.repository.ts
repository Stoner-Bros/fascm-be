import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ManagerEntity } from '../entities/manager.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Manager } from '../../../../domain/manager';
import { ManagerRepository } from '../../manager.repository';
import { ManagerMapper } from '../mappers/manager.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ManagerRelationalRepository implements ManagerRepository {
  constructor(
    @InjectRepository(ManagerEntity)
    private readonly managerRepository: Repository<ManagerEntity>,
  ) {}

  async create(data: Manager): Promise<Manager> {
    const persistenceModel = ManagerMapper.toPersistence(data);
    const newEntity = await this.managerRepository.save(
      this.managerRepository.create(persistenceModel),
    );
    return ManagerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Manager[]> {
    const entities = await this.managerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ManagerMapper.toDomain(entity));
  }

  async findByUserId(userId: number): Promise<NullableType<Manager>> {
    const entity = await this.managerRepository.findOne({
      where: { user: { id: userId } },
    });
    return entity ? ManagerMapper.toDomain(entity) : null;
  }

  async findById(id: Manager['id']): Promise<NullableType<Manager>> {
    const entity = await this.managerRepository.findOne({
      where: { id },
    });

    return entity ? ManagerMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Manager['id'][]): Promise<Manager[]> {
    const entities = await this.managerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ManagerMapper.toDomain(entity));
  }

  async update(id: Manager['id'], payload: Partial<Manager>): Promise<Manager> {
    const entity = await this.managerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.managerRepository.save(
      this.managerRepository.create(
        ManagerMapper.toPersistence({
          ...ManagerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ManagerMapper.toDomain(updatedEntity);
  }

  async remove(id: Manager['id']): Promise<void> {
    await this.managerRepository.delete(id);
  }
}
