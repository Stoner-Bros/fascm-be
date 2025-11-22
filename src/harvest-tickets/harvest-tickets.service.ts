import { HarvestSchedulesService } from '../harvest-schedules/harvest-schedules.service';
import { HarvestSchedule } from '../harvest-schedules/domain/harvest-schedule';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { CreateHarvestTicketDto } from './dto/create-harvest-ticket.dto';
import { UpdateHarvestTicketDto } from './dto/update-harvest-ticket.dto';
import { HarvestTicketRepository } from './infrastructure/persistence/harvest-ticket.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { HarvestTicket } from './domain/harvest-ticket';
import { HarvestDetailRepository } from '../harvest-details/infrastructure/persistence/harvest-detail.repository';
import { PdfGeneratorService } from '../utils/pdf-generator.service';

@Injectable()
export class HarvestTicketsService {
  constructor(
    private readonly harvestScheduleService: HarvestSchedulesService,

    // Dependencies here
    private readonly harvestTicketRepository: HarvestTicketRepository,
    @Inject(forwardRef(() => HarvestDetailRepository))
    private readonly harvestDetailRepository: HarvestDetailRepository,
    private readonly pdfGeneratorService: PdfGeneratorService,
  ) {}

  async create(createHarvestTicketDto: CreateHarvestTicketDto) {
    // Do not remove comment below.
    // <creating-property />

    let harvestScheduleId: HarvestSchedule | null | undefined = undefined;

    if (createHarvestTicketDto.harvestScheduleId) {
      const harvestScheduleIdObject =
        await this.harvestScheduleService.findById(
          createHarvestTicketDto.harvestScheduleId.id,
        );
      if (!harvestScheduleIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestScheduleId: 'notExists',
          },
        });
      }
      harvestScheduleId = harvestScheduleIdObject;
    } else if (createHarvestTicketDto.harvestScheduleId === null) {
      harvestScheduleId = null;
    }

    return this.harvestTicketRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      date: createHarvestTicketDto.date,

      quantity: 0,

      unit: null,

      totalPayment: 0,

      vatAmount: 0,

      totalAmount: 0,

      taxRate: 0,

      accountNumber: createHarvestTicketDto.accountNumber,

      paymentMethod: createHarvestTicketDto.paymentMethod,

      ticketNumber: createHarvestTicketDto.ticketNumber,

      ticketUrl: createHarvestTicketDto.ticketUrl,

      harvestScheduleId,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.harvestTicketRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: HarvestTicket['id']) {
    return this.harvestTicketRepository.findById(id);
  }

  findByIds(ids: HarvestTicket['id'][]) {
    return this.harvestTicketRepository.findByIds(ids);
  }

  async update(
    id: HarvestTicket['id'],

    updateHarvestTicketDto: UpdateHarvestTicketDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let harvestScheduleId: HarvestSchedule | null | undefined = undefined;

    if (updateHarvestTicketDto.harvestScheduleId) {
      const harvestScheduleIdObject =
        await this.harvestScheduleService.findById(
          updateHarvestTicketDto.harvestScheduleId.id,
        );
      if (!harvestScheduleIdObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            harvestScheduleId: 'notExists',
          },
        });
      }
      harvestScheduleId = harvestScheduleIdObject;
    } else if (updateHarvestTicketDto.harvestScheduleId === null) {
      harvestScheduleId = null;
    }

    return this.harvestTicketRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      date: updateHarvestTicketDto.date,

      // quantity: updateHarvestTicketDto.quantity,

      // unit: updateHarvestTicketDto.unit,

      // totalPayment: updateHarvestTicketDto.totalPayment,

      // vatAmount: updateHarvestTicketDto.vatAmount,

      // totalAmount: updateHarvestTicketDto.totalAmount,

      // taxRate: updateHarvestTicketDto.taxRate,

      accountNumber: updateHarvestTicketDto.accountNumber,

      paymentMethod: updateHarvestTicketDto.paymentMethod,

      ticketNumber: updateHarvestTicketDto.ticketNumber,

      ticketUrl: updateHarvestTicketDto.ticketUrl,

      harvestScheduleId,
    });
  }

  async recalculateTicketTotals(harvestTicketId: string) {
    // Get all harvest details for this ticket
    const details =
      await this.harvestDetailRepository.findByHarvestTicketId(harvestTicketId);

    if (!details || details.length === 0) {
      // If no details, set everything to 0
      return this.harvestTicketRepository.update(harvestTicketId, {
        quantity: 0,
        totalAmount: 0,
        totalPayment: 0,
        vatAmount: 0,
        taxRate: 0,
        unit: null,
      });
    }

    // Calculate totals from details
    const totalQuantity = details.reduce(
      (sum, detail) => sum + (detail.quantity || 0),
      0,
    );
    const totalAmount = details.reduce(
      (sum, detail) => sum + (detail.amount || 0),
      0,
    );

    // Get unit from first detail (assuming all details have same unit)
    const unit = details[0]?.unit || null;

    // Update harvest ticket with calculated values
    return this.harvestTicketRepository.update(harvestTicketId, {
      quantity: totalQuantity,
      totalAmount: totalAmount,
      totalPayment: totalAmount, // totalPayment = totalAmount
      vatAmount: 0, // Default to 0
      taxRate: 0, // Default to 0
      unit: unit,
    });
  }

  async generateInvoicePdf(id: HarvestTicket['id']): Promise<Buffer> {
    // Get harvest ticket with full data
    const ticket = await this.harvestTicketRepository.findById(id);

    if (!ticket) {
      throw new NotFoundException('Harvest ticket not found');
    }

    // Get all harvest details
    const details =
      await this.harvestDetailRepository.findByHarvestTicketId(id);

    // Format date
    const formattedDate = ticket.date
      ? new Date(ticket.date).toLocaleDateString('vi-VN')
      : '';

    // Prepare data for template
    const templateData = {
      ticketNumber: ticket.ticketNumber || 'N/A',
      date: formattedDate,
      paymentMethod: ticket.paymentMethod || 'N/A',
      accountNumber: ticket.accountNumber,
      harvestScheduleId: ticket.harvestScheduleId,
      details: details,
      quantity: ticket.quantity || 0,
      unit: ticket.unit || '',
      totalAmount: ticket.totalAmount || 0,
      vatAmount: ticket.vatAmount || 0,
      totalPayment: ticket.totalPayment || 0,
    };

    // Generate PDF
    return this.pdfGeneratorService.generatePdfFromTemplate(
      'harvest-invoice',
      templateData,
    );
  }

  remove(id: HarvestTicket['id']) {
    return this.harvestTicketRepository.remove(id);
  }
}
