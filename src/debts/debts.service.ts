import { ConsigneesService } from '../consignees/consignees.service';
import { Consignee } from '../consignees/domain/consignee';

import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Supplier } from 'src/suppliers/domain/supplier';
import { SuppliersService } from 'src/suppliers/suppliers.service';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Debt } from './domain/debt';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import {
  DebtStatusEnum,
  DebtTypeEnum,
  PartnerTypeEnum,
} from './enum/debt.enum';
import { DebtRepository } from './infrastructure/persistence/debt.repository';
import { JwtPayloadType } from 'src/auth/strategies/types/jwt-payload.type';

@Injectable()
export class DebtsService {
  constructor(
    @Inject(forwardRef(() => ConsigneesService))
    private readonly consigneeService: ConsigneesService,

    @Inject(forwardRef(() => SuppliersService))
    private readonly supplierService: SuppliersService,

    // Dependencies here
    private readonly debtRepository: DebtRepository,
  ) {}

  async create(createDebtDto: CreateDebtDto) {
    // Do not remove comment below.
    // <creating-property />
    let consignee: Consignee | null | undefined = undefined;

    if (createDebtDto.consignee) {
      const consigneeObject = await this.consigneeService.findById(
        createDebtDto.consignee.id,
      );
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    } else if (createDebtDto.consignee === null) {
      consignee = null;
    }

    let supplier: Supplier | null | undefined = undefined;

    if (createDebtDto.supplier) {
      const supplierObject = await this.supplierService.findById(
        createDebtDto.supplier.id,
      );
      if (!supplierObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplier: 'notExists',
          },
        });
      }
      supplier = supplierObject;
    } else if (createDebtDto.supplier === null) {
      supplier = null;
    }

    return this.debtRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      consignee,
      supplier,

      partnerType: createDebtDto.partnerType,

      status: createDebtDto.status,

      dueDate: createDebtDto.dueDate,

      creditLimit: createDebtDto.creditLimit,

      remainingAmount: createDebtDto.remainingAmount,

      paidAmount: createDebtDto.paidAmount,

      originalAmount: createDebtDto.originalAmount,

      debtType: createDebtDto.debtType,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.debtRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Debt['id']) {
    return this.debtRepository.findById(id);
  }

  findByIds(ids: Debt['id'][]) {
    return this.debtRepository.findByIds(ids);
  }

  async update(
    id: Debt['id'],

    updateDebtDto: UpdateDebtDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let consignee: Consignee | null | undefined = undefined;

    if (updateDebtDto.consignee) {
      const consigneeObject = await this.consigneeService.findById(
        updateDebtDto.consignee.id,
      );
      if (!consigneeObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            consignee: 'notExists',
          },
        });
      }
      consignee = consigneeObject;
    } else if (updateDebtDto.consignee === null) {
      consignee = null;
    }

    let supplier: Supplier | null | undefined = undefined;

    if (updateDebtDto.supplier) {
      const supplierObject = await this.supplierService.findById(
        updateDebtDto.supplier.id,
      );
      if (!supplierObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            supplier: 'notExists',
          },
        });
      }
      supplier = supplierObject;
    } else if (updateDebtDto.supplier === null) {
      supplier = null;
    }

    return this.debtRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      supplier,
      consignee,

      partnerType: updateDebtDto.partnerType,

      status: updateDebtDto.status,

      dueDate: updateDebtDto.dueDate,

      creditLimit: updateDebtDto.creditLimit,

      remainingAmount: updateDebtDto.remainingAmount,

      paidAmount: updateDebtDto.paidAmount,

      originalAmount: updateDebtDto.originalAmount,

      debtType: updateDebtDto.debtType,
    });
  }

  remove(id: Debt['id']) {
    return this.debtRepository.remove(id);
  }

  getDebtByPartnerId(partnerId: string, partnerType: string) {
    return this.debtRepository.getDebtByPartnerId(partnerId, partnerType);
  }

  async initializeConsigneeDebt(consignee: Consignee) {
    const existingDebt = await this.debtRepository.getDebtByPartnerId(
      consignee.id,
      PartnerTypeEnum.CONSIGNEE,
    );

    if (!existingDebt) {
      await this.debtRepository.create({
        consignee: consignee,
        partnerType: PartnerTypeEnum.CONSIGNEE,
        status: DebtStatusEnum.UNPAID,
        dueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 365 days from now
        creditLimit: 50 * 1000 * 1000, // 50 million
        remainingAmount: 0,
        paidAmount: 0,
        originalAmount: 0,
        debtType: DebtTypeEnum.RECEIVABLE,
      });
    }
  }

  async initializeSupplierDebt(supplier: Supplier) {
    const existingDebt = await this.debtRepository.getDebtByPartnerId(
      supplier.id,
      PartnerTypeEnum.SUPPLIER,
    );

    if (!existingDebt) {
      await this.debtRepository.create({
        supplier: supplier,
        partnerType: PartnerTypeEnum.SUPPLIER,
        status: DebtStatusEnum.UNPAID,
        dueDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 365 days from now
        creditLimit: 50 * 1000 * 1000, // 50 million
        remainingAmount: 0,
        paidAmount: 0,
        originalAmount: 0,
        debtType: DebtTypeEnum.PAYABLE,
      });
    }
  }

  async getMyDebts(userJwtPayload: JwtPayloadType) {
    const consignee = await this.consigneeService.findByUserId(
      Number(userJwtPayload.id),
    );
    if (!consignee) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: { consignee: 'notExists' },
      });
    }

    return this.debtRepository.getDebtByPartnerId(
      consignee.id,
      PartnerTypeEnum.CONSIGNEE,
    );
  }
}
