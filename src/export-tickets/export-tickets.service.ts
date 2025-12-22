import {
  forwardRef,
  HttpStatus,
  Inject,
  // common
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { AreasService } from 'src/areas/areas.service';
import { OrderDetailSelectionRepository } from 'src/order-detail-selections/infrastructure/persistence/order-detail-selection.repository';
import { OrderDetailSelectionsService } from 'src/order-detail-selections/order-detail-selections.service';
import { OrderInvoiceDetailRepository } from 'src/order-invoice-details/infrastructure/persistence/order-invoice-detail.repository';
import { OrderInvoicesService } from 'src/order-invoices/order-invoices.service';
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
    private readonly orderInvoicesService: OrderInvoicesService,

    @Inject(forwardRef(() => OrderDetailSelectionsService))
    private readonly orderDetailSelectionsService: OrderDetailSelectionsService,

    @Inject(forwardRef(() => OrderDetailSelectionRepository))
    private readonly orderDetailSelectionsRepository: OrderDetailSelectionRepository,

    @Inject(forwardRef(() => AreasService))
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

        const selectionBatches =
          await this.orderDetailSelectionsService.findByIds(detail.selectionId);
        if (selectionBatches.length !== detail.selectionId.length) {
          throw new UnprocessableEntityException({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: {
              selectionBatches: 'someSelectionNotExists',
            },
          });
        }
        // compare product in batch and orderInvoiceDetail
        for (const selectionBatch of selectionBatches) {
          if (
            selectionBatch.batch?.product?.id !==
            orderInvoiceDetail?.product?.id
          ) {
            throw new UnprocessableEntityException({
              status: HttpStatus.UNPROCESSABLE_ENTITY,
              errors: {
                batch: `Batch with id ${selectionBatch.batch?.id} has different product than OrderInvoiceDetail with id ${orderInvoiceDetail.id}`,
              },
            });
          }
        }
        const areaId = selectionBatches[0].batch?.area?.id;
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

        let amountSelected = 0;
        let amountMoney = 0;
        for (const selectionBatch of selectionBatches) {
          selectionBatch.exportTicket = exportTicket;
          await this.orderDetailSelectionsRepository.update(
            selectionBatch.id,
            selectionBatch,
          );
          amountSelected += selectionBatch.quantity || 0;
          amountMoney +=
            (selectionBatch.quantity || 0) * (selectionBatch.unitPrice || 0);
        }
        orderInvoiceDetail.exportTicket = exportTicket;
        orderInvoiceDetail.amount = amountMoney;
        orderInvoiceDetail.quantity = amountSelected;
        await this.orderInvoiceDetailsRepository.update(
          orderInvoiceDetail.id,
          orderInvoiceDetail,
        );

        const invoice = await this.orderInvoicesService.findById(
          orderInvoiceDetail.orderInvoice?.id as string,
        );
        if (invoice) {
          invoice.totalAmount =
            orderInvoiceDetail.amount! + (invoice.totalAmount || 0);
          await this.orderInvoicesService.update(invoice.id, invoice);
          await this.orderInvoicesService.recalculateAmount(invoice.id);
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
    warehouseId,
  }: {
    paginationOptions: IPaginationOptions;
    warehouseId?: string;
  }) {
    return this.exportTicketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
      warehouseId,
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

  findByWarehouseWithPagination({
    warehouseId,
    paginationOptions,
  }: {
    warehouseId: string;
    paginationOptions: IPaginationOptions;
  }) {
    return this.exportTicketRepository.findByWarehouseWithPagination({
      warehouseId,
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }
}
