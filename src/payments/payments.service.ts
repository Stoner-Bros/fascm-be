import {
  // common
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentRepository } from './infrastructure/persistence/payment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Payment } from './domain/payment';
import { payOS } from './config/payOS';
import { PaymentStatus } from './enums/payment-status.enum';
import { OrderInvoicesService } from '../order-invoices/order-invoices.service';
import { PaymentsGateway } from './payments.gateway';

@Injectable()
export class PaymentsService {
  constructor(
    // Dependencies here
    private readonly paymentRepository: PaymentRepository,
    private readonly orderInvoicesService: OrderInvoicesService,
    private readonly paymentsGateway: PaymentsGateway,
  ) {}

  private generatePaymentCode(): string {
    // Generate unique payment code using timestamp + random number
    // Format: timestamp (13 digits) + random 2 digits = max 15 digits
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    return `${timestamp}${random}`;
  }

  async create(createPaymentDto: CreatePaymentDto) {
    // Do not remove comment below.
    // <creating-property />

    // Validate that the order invoice exists
    const orderInvoice = await this.orderInvoicesService.findById(
      createPaymentDto.orderInvoiceId,
    );

    if (!orderInvoice) {
      throw new NotFoundException(
        `Order invoice with id ${createPaymentDto.orderInvoiceId} not found`,
      );
    }

    // Generate unique payment code
    const paymentCode = this.generatePaymentCode();

    let payment: Payment;

    if (createPaymentDto.paymentMethod === 'transfer') {
      try {
        const paymentLinkRes = await payOS.paymentRequests.create({
          orderCode: Number(paymentCode),
          amount: orderInvoice.totalPayment ?? 0,
          description: `FASCMPAY-${paymentCode}`,
          cancelUrl: process.env.PAYOS_CANCEL_URL ?? '',
          returnUrl: process.env.PAYOS_RETURN_URL ?? '',
        });

        payment = await this.paymentRepository.create({
          paymentCode: paymentCode,

          status: PaymentStatus.PENDING,

          amount: orderInvoice.totalPayment ?? 0,

          checkoutUrl: paymentLinkRes.checkoutUrl,

          qrCode: paymentLinkRes.qrCode,

          paymentMethod: createPaymentDto.paymentMethod,
        });
      } catch (error) {
        throw new BadRequestException(
          `Failed to create PayOS payment: ${error.message}`,
        );
      }
    } else {
      payment = await this.paymentRepository.create({
        // Do not remove comment below.
        // <creating-property-payload />
        paymentCode: paymentCode,

        status: PaymentStatus.PENDING,

        amount: orderInvoice.totalPayment ?? 0,

        paymentMethod: createPaymentDto.paymentMethod,
      });
    }

    // Link the payment to the order invoice
    await this.orderInvoicesService.update(createPaymentDto.orderInvoiceId, {
      payment: payment,
    });

    return payment;
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.paymentRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Payment['id']) {
    return this.paymentRepository.findById(id);
  }

  findByIds(ids: Payment['id'][]) {
    return this.paymentRepository.findByIds(ids);
  }

  remove(id: Payment['id']) {
    return this.paymentRepository.remove(id);
  }

  async getPayOSPaymentInfo(paymentCode: string) {
    try {
      const paymentInfo = await payOS.paymentRequests.get(Number(paymentCode));
      return paymentInfo;
    } catch (error) {
      throw new NotFoundException(
        `Payment with order code ${paymentCode} not found: ${error.message}`,
      );
    }
  }

  async cancelPayment(paymentCode: string, cancellationReason?: string) {
    const payment = await this.paymentRepository.findByPaymentCode(paymentCode);

    if (!payment) {
      throw new NotFoundException(
        `Payment with order code ${paymentCode} not found`,
      );
    }

    if (payment.status !== PaymentStatus.PENDING) {
      throw new BadRequestException(
        `Payment with order code ${paymentCode} is not pending`,
      );
    }

    if (payment.paymentMethod === 'transfer') {
      try {
        const cancelResult = await payOS.paymentRequests.cancel(
          Number(paymentCode),
          cancellationReason,
        );

        // Update payment status in database
        await this.paymentRepository.update(payment.id, {
          status: PaymentStatus.PENDING,
        });

        // Emit Socket.IO event for real-time UI update
        this.paymentsGateway.emitPaymentStatusUpdate({
          paymentId: payment.id,
          paymentCode: payment.paymentCode ?? '',
          status: PaymentStatus.PENDING,
          amount: payment.amount ?? 0,
          paymentMethod: payment.paymentMethod ?? '',
          timestamp: new Date().toISOString(),
        });

        console.log(
          `[PaymentsService] Payment ${payment.paymentCode} canceled`,
        );

        return cancelResult;
      } catch (error) {
        throw new BadRequestException(
          `Failed to cancel payment: ${error.message}`,
        );
      }
    } else {
      await this.paymentRepository.update(payment.id, {
        status: PaymentStatus.PENDING,
      });

      // Emit Socket.IO event for real-time UI update
      this.paymentsGateway.emitPaymentStatusUpdate({
        paymentId: payment.id,
        paymentCode: payment.paymentCode ?? '',
        status: PaymentStatus.PENDING,
        amount: payment.amount ?? 0,
        paymentMethod: payment.paymentMethod ?? '',
        timestamp: new Date().toISOString(),
      });

      console.log(`[PaymentsService] Payment ${payment.paymentCode} canceled`);

      return payment;
    }
  }

  async confirmWebhook(webhookData: any) {
    console.log('webhookData', webhookData);

    try {
      const verifiedData = await payOS.webhooks.verify(webhookData);

      // Update payment status in database
      const payment = await this.paymentRepository.findByPaymentCode(
        verifiedData.orderCode.toString(),
      );

      if (payment) {
        const newStatus =
          verifiedData.code === '00'
            ? PaymentStatus.PAID
            : PaymentStatus.PENDING;

        await this.paymentRepository.update(payment.id, {
          status: newStatus,
        });

        // Emit Socket.IO event for real-time UI update
        this.paymentsGateway.emitPaymentStatusUpdate({
          paymentId: payment.id,
          paymentCode: payment.paymentCode ?? '',
          status: newStatus,
          amount: payment.amount ?? 0,
          paymentMethod: payment.paymentMethod ?? '',
          timestamp: new Date().toISOString(),
        });

        console.log(
          `[PaymentsService] Payment ${payment.paymentCode} status updated to ${newStatus}`,
        );
      }

      return {
        verified: true,
        data: verifiedData,
      };
    } catch (error) {
      throw new BadRequestException(
        `Webhook verification failed: ${error.message}`,
      );
    }
  }

  async confirmPaymentPaidByCash(paymentCode: string) {
    try {
      const payment =
        await this.paymentRepository.findByPaymentCode(paymentCode);

      if (!payment) {
        throw new NotFoundException(
          `Payment with order code ${paymentCode} not found`,
        );
      }

      if (payment.status !== PaymentStatus.PENDING) {
        throw new BadRequestException(
          `Payment with order code ${paymentCode} is not pending`,
        );
      }

      await this.paymentRepository.update(payment.id, {
        status: PaymentStatus.PAID,
      });

      // Emit Socket.IO event for real-time UI update
      this.paymentsGateway.emitPaymentStatusUpdate({
        paymentId: payment.id,
        paymentCode: payment.paymentCode ?? '',
        status: PaymentStatus.PAID,
        amount: payment.amount ?? 0,
        paymentMethod: payment.paymentMethod ?? '',
        timestamp: new Date().toISOString(),
      });

      console.log(
        `[PaymentsService] Cash payment ${payment.paymentCode} confirmed as PAID`,
      );

      return payment;
    } catch (error) {
      throw new BadRequestException(
        `Failed to confirm payment paid by cash: ${error.message}`,
      );
    }
  }
}
