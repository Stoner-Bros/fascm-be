import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Payment } from './domain/payment';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllPaymentsDto } from './dto/find-all-payments.dto';
import { PayOSWebhookDto, CancelPaymentDto } from './dto/payos-webhook.dto';

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

  @Get('payos/:orderCode')
  @ApiOperation({ summary: 'Get payment information from PayOS' })
  @ApiParam({
    name: 'orderCode',
    type: Number,
    required: true,
    description: 'PayOS order code',
  })
  @ApiOkResponse({
    description: 'Payment information retrieved successfully',
  })
  getPaymentInfo(@Param('orderCode') orderCode: string) {
    return this.paymentsService.getPaymentInfo(Number(orderCode));
  }

  @Post('payos/:orderCode/cancel')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cancel a payment in PayOS' })
  @ApiParam({
    name: 'orderCode',
    type: Number,
    required: true,
    description: 'PayOS order code',
  })
  @ApiOkResponse({
    description: 'Payment cancelled successfully',
  })
  cancelPayment(
    @Param('orderCode') orderCode: string,
    @Body() body?: CancelPaymentDto,
  ) {
    return this.paymentsService.cancelPayment(
      Number(orderCode),
      body?.cancellationReason,
    );
  }

  @Post('webhook/payos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Handle PayOS webhook for payment status updates' })
  @ApiOkResponse({
    description: 'Webhook processed successfully',
  })
  handlePayOSWebhook(@Body() webhookData: PayOSWebhookDto) {
    return this.paymentsService.confirmWebhook(webhookData);
  }
}
