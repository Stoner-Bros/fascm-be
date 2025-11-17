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

@Injectable()
export class PaymentsService {
  constructor(
    // Dependencies here
    private readonly paymentRepository: PaymentRepository,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    // Do not remove comment below.
    // <creating-property />

    if (createPaymentDto.paymentMethod === 'transfer') {
      try {
        const paymentLinkRes = await payOS.paymentRequests.create({
          orderCode: Number(createPaymentDto.paymentCode),
          amount: createPaymentDto.amount ?? 0,
          description: createPaymentDto.paymentCode ?? '',
          cancelUrl: process.env.PAYOS_CANCEL_URL ?? '',
          returnUrl: process.env.PAYOS_RETURN_URL ?? '',
        });

        return this.paymentRepository.create({
          paymentCode: createPaymentDto.paymentCode,

          status: paymentLinkRes.status,

          amount: paymentLinkRes.amount,

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
      paymentCode: createPaymentDto.paymentCode,

      status: createPaymentDto.status,

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
      paymentCode: updatePaymentDto.paymentCode,

      status: updatePaymentDto.status,

      amount: updatePaymentDto.amount,

      paymentMethod: updatePaymentDto.paymentMethod,
    });
  }

  remove(id: Payment['id']) {
    return this.paymentRepository.remove(id);
  }

  async getPaymentInfo(orderCode: number) {
    try {
      const paymentInfo = await payOS.paymentRequests.get(orderCode);
      return paymentInfo;
    } catch (error) {
      throw new NotFoundException(
        `Payment with order code ${orderCode} not found: ${error.message}`,
      );
    }
  }

  async cancelPayment(orderCode: number, cancellationReason?: string) {
    try {
      const cancelResult = await payOS.paymentRequests.cancel(
        orderCode,
        cancellationReason,
      );

      // Update payment status in database
      const payment = await this.paymentRepository.findByPaymentCode(
        orderCode.toString(),
      );

      if (payment) {
        await this.paymentRepository.update(payment.id, {
          status: 'CANCELLED',
        });
      }

      return cancelResult;
    } catch (error) {
      throw new BadRequestException(
        `Failed to cancel payment: ${error.message}`,
      );
    }
  }

  async confirmWebhook(webhookData: any) {
    try {
      const verifiedData = await payOS.webhooks.verify(webhookData);

      // Update payment status in database
      const payment = await this.paymentRepository.findByPaymentCode(
        verifiedData.orderCode.toString(),
      );

      if (payment) {
        await this.paymentRepository.update(payment.id, {
          status: verifiedData.code === '00' ? 'PAID' : 'CANCELLED',
        });
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
}
