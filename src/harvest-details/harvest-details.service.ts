import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { HarvestTicketsService } from '../harvest-tickets/harvest-tickets.service';
import { HarvestTicket } from '../harvest-tickets/domain/harvest-ticket';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateHarvestDetailDto } from './dto/create-harvest-detail.dto';
import { UpdateHarvestDetailDto } from './dto/update-harvest-detail.dto';
import { HarvestDetailRepository } from './infrastructure/persistence/harvest-detail.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestDetail } from './domain/harvest-detail';

@Injectable()
export class HarvestDetailsService {
  constructor(
    private readonly productService: ProductsService,

    private readonly harvestTicketService: HarvestTicketsService,

    // Dependencies here
    private readonly harvestDetailRepository: HarvestDetailRepository,
  ) {}

  async create(createHarvestDetailDto: CreateHarvestDetailDto) {
    // Do not remove comment below.
    // <creating-property />

    let product: Product | null | undefined = undefined;

    if (createHarvestDetailDto.product) {
      const productObject = await this.productService.findById(
        createHarvestDetailDto.product.id,
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
    } else if (createHarvestDetailDto.product === null) {
      product = null;
    }

    let harvestTicket: HarvestTicket | null | undefined = undefined;

    if (createHarvestDetailDto.harvestTicket) {
      const harvestTicketObject = await this.harvestTicketService.findById(
        createHarvestDetailDto.harvestTicket.id,
      );
      if (!harvestTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestTicket: 'notExists',
          },
        });
      }
      harvestTicket = harvestTicketObject;
    } else if (createHarvestDetailDto.harvestTicket === null) {
      harvestTicket = null;
    }

    return this.harvestDetailRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      taxRate: createHarvestDetailDto.taxRate,

      amount: createHarvestDetailDto.amount,

      unitPrice: createHarvestDetailDto.unitPrice,

      quantity: createHarvestDetailDto.quantity,

      unit: createHarvestDetailDto.unit,

      product,

      harvestTicket,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestDetailRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestDetail['id']) {
    return this.harvestDetailRepository.findById(id);
  }

  findByIds(ids: HarvestDetail['id'][]) {
    return this.harvestDetailRepository.findByIds(ids);
  }

  async update(
    id: HarvestDetail['id'],

    updateHarvestDetailDto: UpdateHarvestDetailDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let product: Product | null | undefined = undefined;

    if (updateHarvestDetailDto.product) {
      const productObject = await this.productService.findById(
        updateHarvestDetailDto.product.id,
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
    } else if (updateHarvestDetailDto.product === null) {
      product = null;
    }

    let harvestTicket: HarvestTicket | null | undefined = undefined;

    if (updateHarvestDetailDto.harvestTicket) {
      const harvestTicketObject = await this.harvestTicketService.findById(
        updateHarvestDetailDto.harvestTicket.id,
      );
      if (!harvestTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestTicket: 'notExists',
          },
        });
      }
      harvestTicket = harvestTicketObject;
    } else if (updateHarvestDetailDto.harvestTicket === null) {
      harvestTicket = null;
    }

    return this.harvestDetailRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      taxRate: updateHarvestDetailDto.taxRate,

      amount: updateHarvestDetailDto.amount,

      unitPrice: updateHarvestDetailDto.unitPrice,

      quantity: updateHarvestDetailDto.quantity,

      unit: updateHarvestDetailDto.unit,

      product,

      harvestTicket,
    });
  }

  remove(id: HarvestDetail['id']) {
    return this.harvestDetailRepository.remove(id);
  }
}
