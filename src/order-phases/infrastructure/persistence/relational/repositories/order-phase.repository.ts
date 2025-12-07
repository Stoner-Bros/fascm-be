import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { OrderPhaseEntity } from '../entities/order-phase.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { OrderPhase } from '../../../../domain/order-phase';
import { OrderPhaseRepository } from '../../order-phase.repository';
import { OrderPhaseMapper } from '../mappers/order-phase.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class OrderPhaseRelationalRepository implements OrderPhaseRepository {
  constructor(
    @InjectRepository(OrderPhaseEntity)
    private readonly orderPhaseRepository: Repository<OrderPhaseEntity>,
  ) {}

  async create(data: OrderPhase): Promise<OrderPhase> {
    const persistenceModel = OrderPhaseMapper.toPersistence(data);
    const newEntity = await this.orderPhaseRepository.save(
      this.orderPhaseRepository.create(persistenceModel),
    );
    return OrderPhaseMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<OrderPhase[]> {
    const entities = await this.orderPhaseRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => OrderPhaseMapper.toDomain(entity));
  }

  async findById(id: OrderPhase['id']): Promise<NullableType<OrderPhase>> {
    const entity = await this.orderPhaseRepository.findOne({
      where: { id },
    });

    return entity ? OrderPhaseMapper.toDomain(entity) : null;
  }

  async findByIds(ids: OrderPhase['id'][]): Promise<OrderPhase[]> {
    const entities = await this.orderPhaseRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderPhaseMapper.toDomain(entity));
  }

  async update(
    id: OrderPhase['id'],
    payload: Partial<OrderPhase>,
  ): Promise<OrderPhase> {
    const entity = await this.orderPhaseRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.orderPhaseRepository.save(
      this.orderPhaseRepository.create(
        OrderPhaseMapper.toPersistence({
          ...OrderPhaseMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return OrderPhaseMapper.toDomain(updatedEntity);
  }

  async remove(id: OrderPhase['id']): Promise<void> {
    await this.orderPhaseRepository.delete(id);
  }
}
