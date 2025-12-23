import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderPhaseResponse } from 'src/order-phases/dto/order-phase-response.dto';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { OrderPhase } from '../../../../domain/order-phase';
import { OrderPhaseRepository } from '../../order-phase.repository';
import { OrderPhaseEntity } from '../entities/order-phase.entity';
import { OrderPhaseMapper } from '../mappers/order-phase.mapper';
import { DeliveryEntity } from 'src/deliveries/infrastructure/persistence/relational/entities/delivery.entity';

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
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: {
      deliveryStaffId?: string;
    };
  }): Promise<OrderPhaseResponse[]> {
    const qb = this.orderPhaseRepository.createQueryBuilder('op');
    qb.leftJoinAndSelect('op.orderInvoice', 'orderInvoice');
    qb.leftJoinAndSelect('orderInvoice.payment', 'payment');
    qb.leftJoinAndSelect(
      'orderInvoice.orderInvoiceDetails',
      'orderInvoiceDetails',
    );
    qb.leftJoinAndSelect('orderInvoiceDetails.product', 'product');
    qb.leftJoinAndSelect('orderInvoiceDetails.exportTicket', 'exportTicket');
    qb.leftJoinAndSelect(
      'exportTicket.orderDetailSelections',
      'orderDetailSelections',
    );
    qb.leftJoinAndSelect('orderDetailSelections.batch', 'batch');
    qb.leftJoinAndSelect('op.imageProof', 'imageProof');
    qb.leftJoinAndSelect('imageProof.photo', 'photo');
    qb.leftJoin(DeliveryEntity, 'delivery', 'delivery.orderPhaseId = op.id');

    if (filters?.deliveryStaffId) {
      qb.andWhere('delivery.deliveryStaffId = :deliveryStaffId', {
        deliveryStaffId: filters.deliveryStaffId,
      });
    }

    qb.orderBy('DESC');
    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => OrderPhaseMapper.toResponse(entity));
  }

  async findAllByScheduleWithPagination({
    scheduleId,
    paginationOptions,
  }: {
    scheduleId: string;
    paginationOptions: IPaginationOptions;
  }): Promise<OrderPhaseResponse[]> {
    const qb = this.orderPhaseRepository.createQueryBuilder('op');
    qb.leftJoinAndSelect('op.orderInvoice', 'orderInvoice');
    qb.leftJoinAndSelect('orderInvoice.payment', 'payment');
    qb.leftJoinAndSelect(
      'orderInvoice.orderInvoiceDetails',
      'orderInvoiceDetails',
    );
    qb.leftJoinAndSelect('orderInvoiceDetails.product', 'product');
    qb.leftJoinAndSelect('orderInvoiceDetails.exportTicket', 'exportTicket');
    qb.leftJoinAndSelect(
      'exportTicket.orderDetailSelections',
      'orderDetailSelections',
    );
    qb.leftJoinAndSelect('orderDetailSelections.batch', 'batch');
    qb.leftJoinAndSelect('op.imageProof', 'imageProof');
    qb.leftJoinAndSelect('imageProof.photo', 'photo');

    qb.where('op.orderScheduleId = :scheduleId', { scheduleId });

    qb.skip((paginationOptions.page - 1) * paginationOptions.limit);
    qb.take(paginationOptions.limit);

    const entities = await qb.getMany();
    return entities.map((entity) => OrderPhaseMapper.toResponse(entity));
  }

  async findFullById(
    id: OrderPhase['id'],
  ): Promise<NullableType<OrderPhaseResponse>> {
    const qb = this.orderPhaseRepository.createQueryBuilder('op');
    qb.leftJoinAndSelect('op.orderInvoice', 'orderInvoice');
    qb.leftJoinAndSelect('orderInvoice.payment', 'payment');
    qb.leftJoinAndSelect(
      'orderInvoice.orderInvoiceDetails',
      'orderInvoiceDetails',
    );
    qb.leftJoinAndSelect('orderInvoiceDetails.product', 'product');
    qb.leftJoinAndSelect('orderInvoiceDetails.exportTicket', 'exportTicket');
    qb.leftJoinAndSelect(
      'exportTicket.orderDetailSelections',
      'orderDetailSelections',
    );
    qb.leftJoinAndSelect('orderDetailSelections.batch', 'batch');
    qb.leftJoinAndSelect('op.imageProof', 'imageProof');
    qb.leftJoinAndSelect('imageProof.photo', 'photo');

    qb.where('op.id = :id', { id });

    const entities = await qb.getOne();
    return entities ? OrderPhaseMapper.toResponse(entities) : null;
  }

  async findByIds(ids: OrderPhase['id'][]): Promise<OrderPhase[]> {
    const entities = await this.orderPhaseRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => OrderPhaseMapper.toDomain(entity));
  }

  async findById(id: OrderPhase['id']): Promise<NullableType<OrderPhase>> {
    const entity = await this.orderPhaseRepository.findOne({
      where: { id },
    });
    if (!entity) {
      return null;
    }
    return OrderPhaseMapper.toDomain(entity);
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
