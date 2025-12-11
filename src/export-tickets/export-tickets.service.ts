import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { BatchesService } from 'src/batches/batches.service';
import { OrderInvoiceDetailRepository } from 'src/order-invoice-details/infrastructure/persistence/order-invoice-detail.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { OrderInvoiceDetailsService } from './../order-invoice-details/order-invoice-details.service';
import { ExportTicket } from './domain/export-ticket';
import { CreateExportTicketDto } from './dto/create-export-ticket.dto';
import { ExportTicketRepository } from './infrastructure/persistence/export-ticket.repository';

@Injectable()
export class ExportTicketsService {
  constructor(
    private readonly orderInvoiceDetailsService: OrderInvoiceDetailsService,
    private readonly orderInvoiceDetailsRepository: OrderInvoiceDetailRepository,

    @Inject(forwardRef(() => BatchesService))
    private readonly batchesService: BatchesService,
    private readonly areasService: AreasService,
    // Dependencies here
    private readonly exportTicketRepository: ExportTicketRepository,
  ) {}

  async create(createExportTicketDto: CreateExportTicketDto) {
    // Do not remove comment below.
    // <creating-property />
    const ets: ExportTicket[] = [];
    if (createExportTicketDto.invoiceDetails) {
      for (const detail of createExportTicketDto.invoiceDetails) {
        const orderInvoiceDetail =
          await this.orderInvoiceDetailsService.findById(
            detail.orderInvoiceDetailId,
          );
        if (!orderInvoiceDetail) {
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              orderInvoiceDetail: 'notExists',
            },
          });
        }

        const batchs = await this.batchesService.findByIds(detail.batchIds);
        if (batchs.length !== detail.batchIds.length) {
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              batchs: 'someBatchNotExists',
            },
          });
        }
        // compare product in batch and orderInvoiceDetail
        for (const batch of batchs) {
          if (batch?.product?.id !== orderInvoiceDetail?.product?.id) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                batch: `Batch with id ${batch.id} has different product than OrderInvoiceDetail with id ${orderInvoiceDetail.id}`,
              },
            });
          }
        }
        const areaId = batchs[0].area?.id;
        const area = await this.areasService.findById(areaId as string);
        if (!area) {
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              area: `Area with id ${areaId} not found`,
            },
          });
        }

        const exportTicket = await this.exportTicketRepository.create({
          // Do not remove comment below.
          // <creating-property-payload />
          exportDate: new Date(),
          unit: orderInvoiceDetail.unit,
          quantity: orderInvoiceDetail.quantity,
        });

        orderInvoiceDetail.exportTicket = exportTicket;
        await this.orderInvoiceDetailsRepository.update(
          orderInvoiceDetail.id,
          orderInvoiceDetail,
        );

        for (const batch of batchs) {
          batch.exportTicket = exportTicket;
          await this.batchesService.update(batch.id, batch);
        }

        if (area) {
          area.quantity =
            (area.quantity || 0) - (orderInvoiceDetail.quantity || 0);
          await this.areasService.update(area.id, area);
        }

        ets.push(exportTicket);
      }
    }

    return ets;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.exportTicketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: ExportTicket['id']) {
    return this.exportTicketRepository.findById(id);
  }

  findByIds(ids: ExportTicket['id'][]) {
    return this.exportTicketRepository.findByIds(ids);
  }

  // async update(
  //   id: ExportTicket['id'],

  //   updateExportTicketDto: UpdateExportTicketDto,
  // ) {
  //   // Do not remove comment below.
  //   // <updating-property />

  //   let orderDetail: OrderDetail | null | undefined = undefined;

  //   if (updateExportTicketDto.orderDetail) {
  //     const orderDetailObject = await this.orderDetailService.findById(
  //       updateExportTicketDto.orderDetail.id,
  //     );
  //     if (!orderDetailObject) {
  //       throw new UnprocessableEntityException({
  //         status: HttpStatus.UNPROCESSABLE_ENTITY,
  //         errors: {
  //           orderDetail: 'notExists',
  //         },
  //       });
  //     }
  //     orderDetail = orderDetailObject;
  //   } else if (updateExportTicketDto.orderDetail === null) {
  //     orderDetail = null;
  //   }

  //   return this.exportTicketRepository.update(id, {
  //     // Do not remove comment below.
  //     // <updating-property-payload />
  //     numberOfBatch: updateExportTicketDto.numberOfBatch,

  //     ExportDate: updateExportTicketDto.ExportDate,

  //     orderDetail,
  //   });
  // }

  remove(id: ExportTicket['id']) {
    return this.exportTicketRepository.remove(id);
  }

  findByAreaWithPagination({
    areaId,
    paginationOptions,
  }: {
    areaId: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.exportTicketRepository.findByAreaWithPagination({
      areaId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }
}
