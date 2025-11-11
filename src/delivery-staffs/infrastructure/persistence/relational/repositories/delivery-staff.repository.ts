import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { DeliveryStaffEntity } from '../entities/delivery-staff.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { DeliveryStaff } from '../../../../domain/delivery-staff';
import { DeliveryStaffRepository } from '../../delivery-staff.repository';
import { DeliveryStaffMapper } from '../mappers/delivery-staff.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class DeliveryStaffRelationalRepository
  implements DeliveryStaffRepository
{
  constructor(
    @InjectRepository(DeliveryStaffEntity)
    private readonly deliveryStaffRepository: Repository<DeliveryStaffEntity>,
  ) {}

  async create(data: DeliveryStaff): Promise<DeliveryStaff> {
    const persistenceModel = DeliveryStaffMapper.toPersistence(data);
    const newEntity = await this.deliveryStaffRepository.save(
      this.deliveryStaffRepository.create(persistenceModel),
    );
    return DeliveryStaffMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<DeliveryStaff[]> {
    const entities = await this.deliveryStaffRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => DeliveryStaffMapper.toDomain(entity));
  }

  async findById(
    id: DeliveryStaff['id'],
  ): Promise<NullableType<DeliveryStaff>> {
    const entity = await this.deliveryStaffRepository.findOne({
      where: { id },
    });

    return entity ? DeliveryStaffMapper.toDomain(entity) : null;
  }

  async findByIds(ids: DeliveryStaff['id'][]): Promise<DeliveryStaff[]> {
    const entities = await this.deliveryStaffRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DeliveryStaffMapper.toDomain(entity));
  }

  async update(
    id: DeliveryStaff['id'],
    payload: Partial<DeliveryStaff>,
  ): Promise<DeliveryStaff> {
    const entity = await this.deliveryStaffRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.deliveryStaffRepository.save(
      this.deliveryStaffRepository.create(
        DeliveryStaffMapper.toPersistence({
          ...DeliveryStaffMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DeliveryStaffMapper.toDomain(updatedEntity);
  }

  async remove(id: DeliveryStaff['id']): Promise<void> {
    await this.deliveryStaffRepository.delete(id);
  }
}
