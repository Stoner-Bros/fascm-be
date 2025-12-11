import { BatchesService } from '../batches/batches.service';
import { Batch } from '../batches/domain/batch';

import {
  HttpStatus,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { OrderDetail } from 'src/order-details/domain/order-detail';
import { OrderDetailsService } from '../order-details/order-details.service';
import { OrderDetailSelection } from './domain/order-detail-selection';
import { CreateOrderDetailSelectionDto } from './dto/create-order-detail-selection.dto';
import { OrderDetailSelectionRepository } from './infrastructure/persistence/order-detail-selection.repository';

@Injectable()
export class OrderDetailSelectionsService {
  constructor(
    private readonly batchService: BatchesService,

    private readonly orderDetailService: OrderDetailsService,

    // Dependencies here
    private readonly orderDetailSelectionRepository: OrderDetailSelectionRepository,
  ) {}

  async create(createOrderDetailSelectionDto: CreateOrderDetailSelectionDto) {
    // Do not remove comment below.
    // <creating-property />
    let batch: Batch | null | undefined = undefined;

    if (createOrderDetailSelectionDto.batch) {
      const batchObject = await this.batchService.findById(
        createOrderDetailSelectionDto.batch.id,
      );
      if (!batchObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            batch: 'notExists',
          },
        });
      }
      batch = batchObject;
    } else if (createOrderDetailSelectionDto.batch === null) {
      batch = null;
    }

    let orderDetail: OrderDetail | null | undefined = undefined;

    if (createOrderDetailSelectionDto.orderDetail) {
      const orderDetailObject = await this.orderDetailService.findById(
        createOrderDetailSelectionDto.orderDetail.id,
      );
      if (!orderDetailObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            orderDetail: 'notExists',
          },
        });
      }
      orderDetail = orderDetailObject;
    } else if (createOrderDetailSelectionDto.orderDetail === null) {
      orderDetail = null;
    }

    return this.orderDetailSelectionRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      batch,

      orderDetail,
    });
  }

  findById(id: OrderDetailSelection['id']) {
    return this.orderDetailSelectionRepository.findById(id);
  }

  findByIds(ids: OrderDetailSelection['id'][]) {
    return this.orderDetailSelectionRepository.findByIds(ids);
  }

  async removeAllByOrderDetailId(orderDetailId: OrderDetail['id']) {
    return this.orderDetailSelectionRepository.removeAllByOrderDetailId(
      orderDetailId,
    );
  }
}
