import { ExportTicketsService } from '../export-tickets/export-tickets.service';
import { ExportTicket } from '../export-tickets/domain/export-ticket';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { OrderInvoicesService } from '../order-invoices/order-invoices.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderInvoiceDetailDto } from './dto/create-order-invoice-detail.dto';
import { UpdateOrderInvoiceDetailDto } from './dto/update-order-invoice-detail.dto';
import { OrderInvoiceDetailRepository } from './infrastructure/persistence/order-invoice-detail.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderInvoiceDetail } from './domain/order-invoice-detail';
import { OrderInvoice } from 'src/order-invoices/domain/order-invoice';

@Injectable()
export class OrderInvoiceDetailsService {
  constructor(
    private readonly exportTicketService: ExportTicketsService,

    private readonly productService: ProductsService,

    private readonly orderInvoiceService: OrderInvoicesService,

    // Dependencies here
    private readonly orderInvoiceDetailRepository: OrderInvoiceDetailRepository,
  ) {}

  async create(createOrderInvoiceDetailDto: CreateOrderInvoiceDetailDto) {
    // Do not remove comment below.
    // <creating-property />
    let exportTicket: ExportTicket | null | undefined = undefined;

    if (createOrderInvoiceDetailDto.exportTicket) {
      const exportTicketObject = await this.exportTicketService.findById(
        createOrderInvoiceDetailDto.exportTicket.id,
      );
      if (!exportTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            exportTicket: 'notExists',
          },
        });
      }
      exportTicket = exportTicketObject;
    } else if (createOrderInvoiceDetailDto.exportTicket === null) {
      exportTicket = null;
    }

    let product: Product | null | undefined = undefined;

    if (createOrderInvoiceDetailDto.product) {
      const productObject = await this.productService.findById(
        createOrderInvoiceDetailDto.product.id,
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
    } else if (createOrderInvoiceDetailDto.product === null) {
      product = null;
    }

    let orderInvoice: OrderInvoice | null | undefined = undefined;

    if (createOrderInvoiceDetailDto.orderInvoice) {
      const orderInvoiceObject = await this.orderInvoiceService.findById(
        createOrderInvoiceDetailDto.orderInvoice.id,
      );
      if (!orderInvoiceObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderInvoice: 'notExists',
          },
        });
      }
      orderInvoice = orderInvoiceObject;
    } else if (createOrderInvoiceDetailDto.orderInvoice === null) {
      orderInvoice = null;
    }

    return this.orderInvoiceDetailRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      exportTicket,

      amount: createOrderInvoiceDetailDto.amount,

      taxRate: createOrderInvoiceDetailDto.taxRate,

      unitPrice: createOrderInvoiceDetailDto.unitPrice,

      quantity: createOrderInvoiceDetailDto.quantity,

      unit: createOrderInvoiceDetailDto.unit,

      product,

      orderInvoice,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderInvoiceDetailRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: OrderInvoiceDetail['id']) {
    return this.orderInvoiceDetailRepository.findById(id);
  }

  findByIds(ids: OrderInvoiceDetail['id'][]) {
    return this.orderInvoiceDetailRepository.findByIds(ids);
  }

  async update(
    id: OrderInvoiceDetail['id'],

    updateOrderInvoiceDetailDto: UpdateOrderInvoiceDetailDto,
  ) {
    // Do not remove comment below.
    // <updating-property />
    let exportTicket: ExportTicket | null | undefined = undefined;

    if (updateOrderInvoiceDetailDto.exportTicket) {
      const exportTicketObject = await this.exportTicketService.findById(
        updateOrderInvoiceDetailDto.exportTicket.id,
      );
      if (!exportTicketObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            exportTicket: 'notExists',
          },
        });
      }
      exportTicket = exportTicketObject;
    } else if (updateOrderInvoiceDetailDto.exportTicket === null) {
      exportTicket = null;
    }

    let product: Product | null | undefined = undefined;

    if (updateOrderInvoiceDetailDto.product) {
      const productObject = await this.productService.findById(
        updateOrderInvoiceDetailDto.product.id,
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
    } else if (updateOrderInvoiceDetailDto.product === null) {
      product = null;
    }

    let orderInvoice: OrderInvoice | null | undefined = undefined;

    if (updateOrderInvoiceDetailDto.orderInvoice) {
      const orderInvoiceObject = await this.orderInvoiceService.findById(
        updateOrderInvoiceDetailDto.orderInvoice.id,
      );
      if (!orderInvoiceObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderInvoice: 'notExists',
          },
        });
      }
      orderInvoice = orderInvoiceObject;
    } else if (updateOrderInvoiceDetailDto.orderInvoice === null) {
      orderInvoice = null;
    }

    return this.orderInvoiceDetailRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      exportTicket,

      amount: updateOrderInvoiceDetailDto.amount,

      taxRate: updateOrderInvoiceDetailDto.taxRate,

      unitPrice: updateOrderInvoiceDetailDto.unitPrice,

      quantity: updateOrderInvoiceDetailDto.quantity,

      unit: updateOrderInvoiceDetailDto.unit,

      product,

      orderInvoice,
    });
  }

  remove(id: OrderInvoiceDetail['id']) {
    return this.orderInvoiceDetailRepository.remove(id);
  }
}
