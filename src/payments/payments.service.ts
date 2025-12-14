import {
  BadRequestException,
  // common
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DebtsService } from 'src/debts/debts.service';
import { DebtStatusEnum, PartnerTypeEnum } from 'src/debts/enum/debt.enum';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { payOS } from './config/payOS';
import { Payment } from './domain/payment';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  PaymentMethod,
  PaymentStatus,
  PaymentType,
} from './enums/payment-status.enum';
import { PaymentRepository } from './infrastructure/persistence/payment.repository';
import { PaymentsGateway } from './payments.gateway';
import { DebtRepository } from 'src/debts/infrastructure/persistence/debt.repository';

@Injectable()
export class PaymentsService {
  constructor(
    // Dependencies here
    private readonly paymentRepository: PaymentRepository,
    private readonly debtService: DebtsService,
    private readonly debtRepo: DebtRepository,
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
    // Generate unique payment code
    const paymentCode = this.generatePaymentCode();

    let payment: Payment;

    const partnerType = createPaymentDto?.consigneeId
      ? PartnerTypeEnum.CONSIGNEE
      : PartnerTypeEnum.SUPPLIER;
    const partnerId = createPaymentDto.consigneeId
      ? createPaymentDto.consigneeId
      : createPaymentDto.supplierId;

    const partnerDebt = await this.debtService.getDebtByPartnerId(
      partnerId as string,
      partnerType,
    );

    if (createPaymentDto.paymentMethod === PaymentMethod.BANK_TRANSFER) {
      try {
        const paymentLinkRes = await payOS.paymentRequests.create({
          orderCode: Number(paymentCode),
          amount: createPaymentDto.amount,
          description: `FASCMPAY-${paymentCode}`,
          cancelUrl: process.env.PAYOS_CANCEL_URL ?? '',
          returnUrl: process.env.PAYOS_RETURN_URL ?? '',
        });

        payment = await this.paymentRepository.create({
          paymentCode: paymentCode,
          paymentType:
            partnerType === PartnerTypeEnum.CONSIGNEE
              ? PaymentType.IN
              : PaymentType.OUT,

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
    } else {
      payment = await this.paymentRepository.create({
        // Do not remove comment below.
        // <creating-property-payload />
        paymentCode: paymentCode,

        paymentType:
          partnerType === PartnerTypeEnum.CONSIGNEE
            ? PaymentType.IN
            : PaymentType.OUT,

        status: PaymentStatus.PENDING,

        amount: createPaymentDto.amount,

        paymentMethod: createPaymentDto.paymentMethod,
      });
    }

    if (partnerDebt) {
      partnerDebt.paidAmount =
        (partnerDebt.paidAmount ?? 0) + createPaymentDto.amount;
      partnerDebt.remainingAmount =
        (partnerDebt.remainingAmount ?? 0) - createPaymentDto.amount;

      if (partnerDebt.status === DebtStatusEnum.UNPAID) {
        partnerDebt.status = DebtStatusEnum.PARTIALLY_PAID;
      }

      await this.debtRepo.update(partnerDebt.id, {
        paidAmount: partnerDebt.paidAmount,
        remainingAmount: partnerDebt.remainingAmount,
        status: partnerDebt.status,
      });
    }

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

    if (payment.paymentMethod === PaymentMethod.BANK_TRANSFER) {
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
