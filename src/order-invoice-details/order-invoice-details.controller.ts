import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderInvoiceDetail } from './domain/order-invoice-detail';
import { OrderInvoiceDetailsService } from './order-invoice-details.service';

@ApiTags('Orderinvoicedetails')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-invoice-details',
  version: '1',
})
export class OrderInvoiceDetailsController {
  constructor(
    private readonly orderInvoiceDetailsService: OrderInvoiceDetailsService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderInvoiceDetail,
  })
  findById(@Param('id') id: string) {
    return this.orderInvoiceDetailsService.findById(id);
  }
}
