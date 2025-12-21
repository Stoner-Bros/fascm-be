import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerTypeEnum } from 'src/debts/enum/debt.enum';
import { In, Repository } from 'typeorm';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { Debt } from '../../../../domain/debt';
import { DebtRepository } from '../../debt.repository';
import { DebtEntity } from '../entities/debt.entity';
import { DebtMapper } from '../mappers/debt.mapper';

@Injectable()
export class DebtRelationalRepository implements DebtRepository {
  constructor(
    @InjectRepository(DebtEntity)
    private readonly debtRepository: Repository<DebtEntity>,
  ) {}

  async create(data: Debt): Promise<Debt> {
    const persistenceModel = DebtMapper.toPersistence(data);
    const newEntity = await this.debtRepository.save(
      this.debtRepository.create(persistenceModel),
    );
    return DebtMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
    partnerType,
    consigneeId,
    supplierId,
  }: {
    paginationOptions: IPaginationOptions;
    partnerType?: PartnerTypeEnum;
    consigneeId?: string;
    supplierId?: string;
  }): Promise<Debt[]> {
    const where: any = {};
    if (partnerType) where.partnerType = partnerType;
    if (consigneeId) where.consignee = { id: consigneeId };
    if (supplierId) where.supplier = { id: supplierId };

    const entities = await this.debtRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
    });

    return entities.map((entity) => DebtMapper.toDomain(entity));
  }

  async findById(id: Debt['id']): Promise<NullableType<Debt>> {
    const entity = await this.debtRepository.findOne({
      where: { id },
    });

    return entity ? DebtMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Debt['id'][]): Promise<Debt[]> {
    const entities = await this.debtRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => DebtMapper.toDomain(entity));
  }

  async update(id: Debt['id'], payload: Partial<Debt>): Promise<Debt> {
    const entity = await this.debtRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.debtRepository.save(
      this.debtRepository.create(
        DebtMapper.toPersistence({
          ...DebtMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return DebtMapper.toDomain(updatedEntity);
  }

  async remove(id: Debt['id']): Promise<void> {
    await this.debtRepository.delete(id);
  }

  async getDebtByPartnerId(
    partnerId: string,
    partnerType: string,
  ): Promise<NullableType<Debt>> {
    const entity = await this.debtRepository.findOne({
      where: {
        partnerType: partnerType as any,
        ...(partnerType === PartnerTypeEnum.SUPPLIER
          ? { supplier: { id: partnerId } }
          : { consignee: { id: partnerId } }),
      },
    });

    return entity ? DebtMapper.toDomain(entity) : null;
  }
}
