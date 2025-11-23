import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaymentsService } from './payments.service';

@ApiTags('Payos Webhook')
@Controller({
  path: 'payos-webhook',
  version: '1',
})
export class PayosWebhookController {
  constructor(private readonly paymentsService: PaymentsService) {}

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
}
