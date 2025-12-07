import {
  // common
  Injectable,
} from '@nestjs/common';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { ExportTicket } from './domain/export-ticket';
import { ExportTicketRepository } from './infrastructure/persistence/export-ticket.repository';

@Injectable()
export class ExportTicketsService {
  constructor(
    // private readonly orderDetailService: OrderDetailsService,

    // Dependencies here
    private readonly exportTicketRepository: ExportTicketRepository,
  ) {}

  // async create(createExportTicketDto: CreateExportTicketDto) {
  //   // Do not remove comment below.
  //   // <creating-property />
  //   return this.exportTicketRepository.create({
  //     // Do not remove comment below.
  //     // <creating-property-payload />
  //     unit: createExportTicketDto.unit,

  //     exportDate: createExportTicketDto.exportDate,
  //   });
  // }

  // async createBulk(createExportTicketDtos: CreateExportTicketDto[]) {
  //   const tasks = createExportTicketDtos.map((dto) => this.create(dto));
  //   return Promise.all(tasks);
  // }

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
}
