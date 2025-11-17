import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { OrdersService } from '../orders/orders.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { OrderDetailRepository } from './infrastructure/persistence/order-detail.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderDetail } from './domain/order-detail';
import { Order } from '../orders/domain/order';

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly productService: ProductsService,

    private readonly orderService: OrdersService,

    // Dependencies here
    private readonly orderDetailRepository: OrderDetailRepository,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    // Do not remove comment below.
    // <creating-property />

    let product: Product | null | undefined = undefined;

    if (createOrderDetailDto.product) {
      const productObject = await this.productService.findById(
        createOrderDetailDto.product.id,
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
    } else if (createOrderDetailDto.product === null) {
      product = null;
    }

    let order: Order | null | undefined = undefined;

    if (createOrderDetailDto.order) {
      const orderObject = await this.orderService.findById(
        createOrderDetailDto.order.id,
      );
      if (!orderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            order: 'notExists',
          },
        });
      }
      order = orderObject;
    } else if (createOrderDetailDto.order === null) {
      order = null;
    }

    return this.orderDetailRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      taxRate: createOrderDetailDto.taxRate,

      amount: createOrderDetailDto.amount,

      unitPrice: createOrderDetailDto.unitPrice,

      quantity: createOrderDetailDto.quantity,

      unit: createOrderDetailDto.unit,

      product,

      order,
    });
  }

  findAllWithPagination({
    paginationOptions,
    filters,
  }: {
    paginationOptions: IPaginationOptions;
    filters?: { orderId?: string };
  }) {
    return this.orderDetailRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      filters,
    });
  }

  findById(id: OrderDetail['id']) {
    return this.orderDetailRepository.findById(id);
  }

  findByIds(ids: OrderDetail['id'][]) {
    return this.orderDetailRepository.findByIds(ids);
  }

  async update(
    id: OrderDetail['id'],

    updateOrderDetailDto: UpdateOrderDetailDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let product: Product | null | undefined = undefined;

    if (updateOrderDetailDto.product) {
      const productObject = await this.productService.findById(
        updateOrderDetailDto.product.id,
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
    } else if (updateOrderDetailDto.product === null) {
      product = null;
    }

    let order: Order | null | undefined = undefined;

    if (updateOrderDetailDto.order) {
      const orderObject = await this.orderService.findById(
        updateOrderDetailDto.order.id,
      );
      if (!orderObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            order: 'notExists',
          },
        });
      }
      order = orderObject;
    } else if (updateOrderDetailDto.order === null) {
      order = null;
    }

    return this.orderDetailRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      taxRate: updateOrderDetailDto.taxRate,

      amount: updateOrderDetailDto.amount,

      unitPrice: updateOrderDetailDto.unitPrice,

      quantity: updateOrderDetailDto.quantity,

      unit: updateOrderDetailDto.unit,

      product,

      order,
    });
  }

  remove(id: OrderDetail['id']) {
    return this.orderDetailRepository.remove(id);
  }
}
