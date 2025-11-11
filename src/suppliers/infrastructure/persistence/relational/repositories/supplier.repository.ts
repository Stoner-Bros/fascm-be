import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SupplierEntity } from '../entities/supplier.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Supplier } from '../../../../domain/supplier';
import { SupplierRepository } from '../../supplier.repository';
import { SupplierMapper } from '../mappers/supplier.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SupplierRelationalRepository implements SupplierRepository {
  constructor(
    @InjectRepository(SupplierEntity)
    private readonly supplierRepository: Repository<SupplierEntity>,
  ) {}

  async create(data: Supplier): Promise<Supplier> {
    const persistenceModel = SupplierMapper.toPersistence(data);
    const newEntity = await this.supplierRepository.save(
      this.supplierRepository.create(persistenceModel),
    );
    return SupplierMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Supplier[]> {
    const entities = await this.supplierRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SupplierMapper.toDomain(entity));
  }

  async findById(id: Supplier['id']): Promise<NullableType<Supplier>> {
    const entity = await this.supplierRepository.findOne({
      where: { id },
    });

    return entity ? SupplierMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Supplier['id'][]): Promise<Supplier[]> {
    const entities = await this.supplierRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SupplierMapper.toDomain(entity));
  }

  async update(
    id: Supplier['id'],
    payload: Partial<Supplier>,
  ): Promise<Supplier> {
    const entity = await this.supplierRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.supplierRepository.save(
      this.supplierRepository.create(
        SupplierMapper.toPersistence({
          ...SupplierMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SupplierMapper.toDomain(updatedEntity);
  }

  async remove(id: Supplier['id']): Promise<void> {
    await this.supplierRepository.delete(id);
  }
}
