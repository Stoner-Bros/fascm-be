import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { HarvestTicketEntity } from '../entities/harvest-ticket.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { HarvestTicket } from '../../../../domain/harvest-ticket';
import { HarvestTicketRepository } from '../../harvest-ticket.repository';
import { HarvestTicketMapper } from '../mappers/harvest-ticket.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { HarvestTicketResponse } from '../../../../dto/harvest-ticket-response.dto';

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
  }): Promise<HarvestTicketResponse[]> {
    const entities = await this.harvestTicketRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['harvestScheduleId'],
    });

    return entities.map((entity) => HarvestTicketMapper.toResponse(entity));
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
      relations: ['harvestScheduleId'],
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    // Directly update the fields from payload
    if (payload.quantity !== undefined) entity.quantity = payload.quantity;
    if (payload.unit !== undefined) entity.unit = payload.unit;
    if (payload.totalPayment !== undefined)
      entity.totalPayment = payload.totalPayment;
    if (payload.vatAmount !== undefined) entity.vatAmount = payload.vatAmount;
    if (payload.totalAmount !== undefined)
      entity.totalAmount = payload.totalAmount;
    if (payload.taxRate !== undefined) entity.taxRate = payload.taxRate;
    if (payload.date !== undefined) entity.date = payload.date;
    if (payload.accountNumber !== undefined)
      entity.accountNumber = payload.accountNumber;
    if (payload.paymentMethod !== undefined)
      entity.paymentMethod = payload.paymentMethod;
    if (payload.ticketNumber !== undefined)
      entity.ticketNumber = payload.ticketNumber;
    if (payload.ticketUrl !== undefined) entity.ticketUrl = payload.ticketUrl;

    const updatedEntity = await this.harvestTicketRepository.save(entity);

    return HarvestTicketMapper.toDomain(updatedEntity);
  }

  async remove(id: HarvestTicket['id']): Promise<void> {
    await this.harvestTicketRepository.delete(id);
  }

  async findByHarvestScheduleId(
    harvestScheduleId: string,
  ): Promise<HarvestTicketResponse> {
    const entities = await this.harvestTicketRepository.find({
      where: { harvestScheduleId: { id: harvestScheduleId } },
      relations: ['harvestScheduleId'],
    });

    return HarvestTicketMapper.toResponse(entities[0]);
  }
}
