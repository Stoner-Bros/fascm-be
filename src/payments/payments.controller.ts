import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Payment } from './domain/payment';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { FindAllPaymentsDto } from './dto/find-all-payments.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentsService } from './payments.service';

@ApiTags('Payments')
// @ApiBearerAuth()
// @UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'payments',
  version: '1',
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Payment,
  })
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Payment),
  })
  async findAll(
    @Query() query: FindAllPaymentsDto,
  ): Promise<InfinityPaginationResponseDto<Payment>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.paymentsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Payment,
  })
  findById(@Param('id') id: string) {
    return this.paymentsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Payment,
  })
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentsService.update(id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(id);
  }

  @Get('payos/:paymentCode')
  @ApiOperation({ summary: 'Get payment information from PayOS' })
  @ApiParam({
    name: 'paymentCode',
    type: Number,
    required: true,
    description: 'PayOS order code',
  })
  @ApiOkResponse({
    description: 'Payment information retrieved successfully',
  })
  getPayOSPaymentInfo(@Param('paymentCode') paymentCode: string) {
    return this.paymentsService.getPayOSPaymentInfo(Number(paymentCode));
  }

  @Post('payos/:paymentCode/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a payment in PayOS' })
  @ApiParam({
    name: 'paymentCode',
    type: Number,
    required: true,
    description: 'PayOS order code',
  })
  @ApiOkResponse({
    description: 'Payment cancelled successfully',
  })
  cancelPayment(@Param('paymentCode') paymentCode: string, @Body() body?: any) {
    return this.paymentsService.cancelPayment(
      Number(paymentCode),
      body?.cancellationReason,
    );
  }

  @Post('webhook/payos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle PayOS webhook for payment status updates' })
  @ApiOkResponse({
    description: 'Webhook processed successfully',
  })
  handlePayOSWebhook(@Body() webhookData: any) {
    console.log('webhookData from controller', webhookData);
    return this.paymentsService.confirmWebhook(webhookData);
  }

  @Patch('confirm-payment-paid-by-cash/:paymentCode')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Confirm payment paid by cash' })
  @ApiParam({
    name: 'paymentCode',
    type: Number,
    required: true,
  })
  confirmPaymentPaidByCash(@Param('paymentCode') paymentCode: string) {
    return this.paymentsService.confirmPaymentPaidByCash(Number(paymentCode));
  }
}
