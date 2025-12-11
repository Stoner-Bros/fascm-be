import {
  // common
  Injectable,
} from '@nestjs/common';
import { HarvestTicket } from './domain/harvest-ticket';
import { HarvestTicketRepository } from './infrastructure/persistence/harvest-ticket.repository';

@Injectable()
export class HarvestTicketsService {
  constructor(
    // Dependencies here
    private readonly harvestTicketRepository: HarvestTicketRepository,
  ) {}
  findById(id: HarvestTicket['id']) {
    return this.harvestTicketRepository.findById(id);
  }

  findByIds(ids: HarvestTicket['id'][]) {
    return this.harvestTicketRepository.findByIds(ids);
  }

  // async recalculateTicketTotals(harvestTicketId: string) {
  //   // Get all harvest details for this ticket
  //   const details =
  //     await this.harvestDetailRepository.findByHarvestTicketId(harvestTicketId);

  //   if (!details || details.length === 0) {
  //     // If no details, set everything to 0
  //     return this.harvestTicketRepository.update(harvestTicketId, {
  //       quantity: 0,
  //       totalAmount: 0,
  //       totalPayment: 0,
  //       vatAmount: 0,
  //       taxRate: 0,
  //       unit: null,
  //     });
  //   }

  //   // Calculate totals from details
  //   const totalQuantity = details.reduce(
  //     (sum, detail) => sum + (detail.quantity || 0),
  //     0,
  //   );
  //   const totalAmount = details.reduce(
  //     (sum, detail) => sum + (detail.amount || 0),
  //     0,
  //   );

  //   // Get unit from first detail (assuming all details have same unit)
  //   const unit = details[0]?.unit || null;

  //   // Update harvest ticket with calculated values
  //   return this.harvestTicketRepository.update(harvestTicketId, {
  //     quantity: totalQuantity,
  //     totalAmount: totalAmount,
  //     totalPayment: totalAmount, // totalPayment = totalAmount
  //     vatAmount: 0, // Default to 0
  //     taxRate: 0, // Default to 0
  //     unit: unit,
  //   });
  // }

  // async generateInvoicePdf(id: HarvestTicket['id']): Promise<Buffer> {
  //   // Get harvest ticket with full data
  //   const ticket = await this.harvestTicketRepository.findById(id);

  //   if (!ticket) {
  //     throw new NotFoundException('Harvest ticket not found');
  //   }

  //   // Get all harvest details
  //   const details =
  //     await this.harvestDetailRepository.findByHarvestTicketId(id);

  //   // Format date
  //   const formattedDate = ticket.date
  //     ? new Date(ticket.date).toLocaleDateString('vi-VN')
  //     : '';

  //   // Prepare data for template
  //   const templateData = {
  //     ticketNumber: ticket.ticketNumber || 'N/A',
  //     date: formattedDate,
  //     paymentMethod: ticket.paymentMethod || 'N/A',
  //     accountNumber: ticket.accountNumber,
  //     harvestScheduleId: ticket.harvestScheduleId,
  //     details: details,
  //     quantity: ticket.quantity || 0,
  //     unit: ticket.unit || '',
  //     totalAmount: ticket.totalAmount || 0,
  //     vatAmount: ticket.vatAmount || 0,
  //     totalPayment: ticket.totalPayment || 0,
  //   };

  //   // Generate PDF
  //   return this.pdfGeneratorService.generatePdfFromTemplate(
  //     'harvest-invoice',
  //     templateData,
  //   );
  // }
}
