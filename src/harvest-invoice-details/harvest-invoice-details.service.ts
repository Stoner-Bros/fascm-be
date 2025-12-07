import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { HarvestInvoicesService } from '../harvest-invoices/harvest-invoices.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHarvestInvoiceDetailDto } from './dto/create-harvest-invoice-detail.dto';
import { UpdateHarvestInvoiceDetailDto } from './dto/update-harvest-invoice-detail.dto';
import { HarvestInvoiceDetailRepository } from './infrastructure/persistence/harvest-invoice-detail.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestInvoiceDetail } from './domain/harvest-invoice-detail';
import { HarvestInvoice } from 'src/harvest-invoices/domain/harvest-invoice';

@Injectable()
export class HarvestInvoiceDetailsService {
  constructor(
    private readonly productService: ProductsService,

    private readonly harvestInvoiceService: HarvestInvoicesService,

    // Dependencies here
    private readonly harvestInvoiceDetailRepository: HarvestInvoiceDetailRepository,
  ) {}

  async create(createHarvestInvoiceDetailDto: CreateHarvestInvoiceDetailDto) {
    // Do not remove comment below.
    // <creating-property />

    let product: Product | null | undefined = undefined;

    if (createHarvestInvoiceDetailDto.product) {
      const productObject = await this.productService.findById(
        createHarvestInvoiceDetailDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    } else if (createHarvestInvoiceDetailDto.product === null) {
      product = null;
    }

    let harvestInvoice: HarvestInvoice | null | undefined = undefined;

    if (createHarvestInvoiceDetailDto.harvestInvoice) {
      const harvestInvoiceObject = await this.harvestInvoiceService.findById(
        createHarvestInvoiceDetailDto.harvestInvoice.id,
      );
      if (!harvestInvoiceObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestInvoice: 'notExists',
          },
        });
      }
      harvestInvoice = harvestInvoiceObject;
    } else if (createHarvestInvoiceDetailDto.harvestInvoice === null) {
      harvestInvoice = null;
    }

    return this.harvestInvoiceDetailRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      amount: createHarvestInvoiceDetailDto.amount,

      taxRate: createHarvestInvoiceDetailDto.taxRate,

      unitPrice: createHarvestInvoiceDetailDto.unitPrice,

      quantity: createHarvestInvoiceDetailDto.quantity,

      unit: createHarvestInvoiceDetailDto.unit,

      product,

      harvestInvoice,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestInvoiceDetailRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestInvoiceDetail['id']) {
    return this.harvestInvoiceDetailRepository.findById(id);
  }

  findByIds(ids: HarvestInvoiceDetail['id'][]) {
    return this.harvestInvoiceDetailRepository.findByIds(ids);
  }

  async update(
    id: HarvestInvoiceDetail['id'],

    updateHarvestInvoiceDetailDto: UpdateHarvestInvoiceDetailDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let product: Product | null | undefined = undefined;

    if (updateHarvestInvoiceDetailDto.product) {
      const productObject = await this.productService.findById(
        updateHarvestInvoiceDetailDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    } else if (updateHarvestInvoiceDetailDto.product === null) {
      product = null;
    }

    let harvestInvoice: HarvestInvoice | null | undefined = undefined;

    if (updateHarvestInvoiceDetailDto.harvestInvoice) {
      const harvestInvoiceObject = await this.harvestInvoiceService.findById(
        updateHarvestInvoiceDetailDto.harvestInvoice.id,
      );
      if (!harvestInvoiceObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestInvoice: 'notExists',
          },
        });
      }
      harvestInvoice = harvestInvoiceObject;
    } else if (updateHarvestInvoiceDetailDto.harvestInvoice === null) {
      harvestInvoice = null;
    }

    return this.harvestInvoiceDetailRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      amount: updateHarvestInvoiceDetailDto.amount,

      taxRate: updateHarvestInvoiceDetailDto.taxRate,

      unitPrice: updateHarvestInvoiceDetailDto.unitPrice,

      quantity: updateHarvestInvoiceDetailDto.quantity,

      unit: updateHarvestInvoiceDetailDto.unit,

      product,

      harvestInvoice,
    });
  }

  remove(id: HarvestInvoiceDetail['id']) {
    return this.harvestInvoiceDetailRepository.remove(id);
  }
}
