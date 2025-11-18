import {
  // common
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepository } from './infrastructure/persistence/payment.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Payment } from './domain/payment';
import { payOS } from './config/payOS';
import { PaymentStatus } from './enums/payment-status.enum';
import { Subject } from 'rxjs';

export interface PaymentUpdateEvent {
  paymentCode: number;
  status: PaymentStatus;
  amount: number;
  paymentMethod: string;
  timestamp: Date;
}

@Injectable()
export class PaymentsService {
  // Map to store individual payment streams: paymentCode -> Subject
  private paymentStreams = new Map<number, Subject<PaymentUpdateEvent>>();

  constructor(
    // Dependencies here
    private readonly paymentRepository: PaymentRepository,
  ) {}

  private generatePaymentCode(): number {
    // Generate unique payment code using timestamp + random number
    // Format: timestamp (13 digits) + random 2 digits = max 15 digits
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 100);
    return Number(`${timestamp}${random}`);
  }

  async create(createPaymentDto: CreatePaymentDto) {
    // Do not remove comment below.
    // <creating-property />

    // Generate unique payment code
    const paymentCode = this.generatePaymentCode();

    if (createPaymentDto.paymentMethod === 'transfer') {
      try {
        const paymentLinkRes = await payOS.paymentRequests.create({
          orderCode: paymentCode,
          amount: createPaymentDto.amount,
          description: `FASCMPAY-${paymentCode}`,
          cancelUrl: process.env.PAYOS_CANCEL_URL ?? '',
          returnUrl: process.env.PAYOS_RETURN_URL ?? '',
        });

        return this.paymentRepository.create({
          paymentCode: paymentCode,

          status: PaymentStatus.PENDING,

          amount: createPaymentDto.amount,

          checkoutUrl: paymentLinkRes.checkoutUrl,

          qrCode: paymentLinkRes.qrCode,

          paymentMethod: createPaymentDto.paymentMethod,
        });
      } catch (error) {
        throw new BadRequestException(
          `Failed to create PayOS payment: ${error.message}`,
        );
      }
    }

    return this.paymentRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      paymentCode: paymentCode,

      status: PaymentStatus.PENDING,

      amount: createPaymentDto.amount,

      paymentMethod: createPaymentDto.paymentMethod,
    });
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

  async update(
    id: Payment['id'],

    updatePaymentDto: UpdatePaymentDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.paymentRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      amount: updatePaymentDto.amount,

      paymentMethod: updatePaymentDto.paymentMethod,
    });
  }

  remove(id: Payment['id']) {
    return this.paymentRepository.remove(id);
  }

  async getPayOSPaymentInfo(paymentCode: number) {
    try {
      const paymentInfo = await payOS.paymentRequests.get(paymentCode);
      return paymentInfo;
    } catch (error) {
      throw new NotFoundException(
        `Payment with order code ${paymentCode} not found: ${error.message}`,
      );
    }
  }

  async cancelPayment(paymentCode: number, cancellationReason?: string) {
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
          paymentCode,
          cancellationReason,
        );

        // Update payment status in database
        await this.paymentRepository.update(payment.id, {
          status: PaymentStatus.CANCELED,
        });

        return cancelResult;
      } catch (error) {
        throw new BadRequestException(
          `Failed to cancel payment: ${error.message}`,
        );
      }
    } else {
      await this.paymentRepository.update(payment.id, {
        status: PaymentStatus.CANCELED,
      });

      return payment;
    }
  }

  getPaymentUpdatesStream(paymentCode: number) {
    // Get or create a Subject for this specific payment
    if (!this.paymentStreams.has(paymentCode)) {
      this.paymentStreams.set(paymentCode, new Subject<PaymentUpdateEvent>());
    }
    return this.paymentStreams.get(paymentCode)!.asObservable();
  }

  private cleanupPaymentStream(paymentCode: number) {
    // Clean up the stream after payment is complete to prevent memory leaks
    const stream = this.paymentStreams.get(paymentCode);
    if (stream) {
      stream.complete();
      this.paymentStreams.delete(paymentCode);
    }
  }

  async confirmWebhook(webhookData: any) {
    console.log('webhookData', webhookData);

    try {
      const verifiedData = await payOS.webhooks.verify(webhookData);

      // Update payment status in database
      const payment = await this.paymentRepository.findByPaymentCode(
        Number(verifiedData.orderCode),
      );

      if (payment) {
        const newStatus =
          verifiedData.code === '00'
            ? PaymentStatus.PAID
            : PaymentStatus.CANCELED;

        await this.paymentRepository.update(payment.id, {
          status: newStatus,
        });

        const paymentCode = Number(verifiedData.orderCode);

        // Emit SSE event to specific payment stream only
        const stream = this.paymentStreams.get(paymentCode);
        if (stream) {
          const updateEvent: PaymentUpdateEvent = {
            paymentCode,
            status: newStatus,
            amount: payment.amount ?? 0,
            paymentMethod: payment.paymentMethod ?? 'unknown',
            timestamp: new Date(),
          };

          stream.next(updateEvent);

          // Clean up stream after sending final status
          // Using setTimeout to ensure event is delivered before cleanup
          setTimeout(() => this.cleanupPaymentStream(paymentCode), 1000);
        }
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

  async confirmPaymentPaidByCash(paymentCode: number) {
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

      return payment;
    } catch (error) {
      throw new BadRequestException(
        `Failed to confirm payment paid by cash: ${error.message}`,
      );
    }
  }
}
