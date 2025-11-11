import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Staff } from '../../../../domain/staff';
import { StaffRepository } from '../../staff.repository';
import { StaffMapper } from '../mappers/staff.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class StaffRelationalRepository implements StaffRepository {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async create(data: Staff): Promise<Staff> {
    const persistenceModel = StaffMapper.toPersistence(data);
    const newEntity = await this.staffRepository.save(
      this.staffRepository.create(persistenceModel),
    );
    return StaffMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Staff[]> {
    const entities = await this.staffRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => StaffMapper.toDomain(entity));
  }

  async findById(id: Staff['id']): Promise<NullableType<Staff>> {
    const entity = await this.staffRepository.findOne({
      where: { id },
    });

    return entity ? StaffMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Staff['id'][]): Promise<Staff[]> {
    const entities = await this.staffRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => StaffMapper.toDomain(entity));
  }

  async update(id: Staff['id'], payload: Partial<Staff>): Promise<Staff> {
    const entity = await this.staffRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.staffRepository.save(
      this.staffRepository.create(
        StaffMapper.toPersistence({
          ...StaffMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return StaffMapper.toDomain(updatedEntity);
  }

  async remove(id: Staff['id']): Promise<void> {
    await this.staffRepository.delete(id);
  }
}
