import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderInvoice } from './domain/order-invoice';
import { OrderInvoicesService } from './order-invoices.service';

@ApiTags('Orderinvoices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-invoices',
  version: '1',
})
export class OrderInvoicesController {
  constructor(private readonly orderInvoicesService: OrderInvoicesService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderInvoice,
  })
  findById(@Param('id') id: string) {
    return this.orderInvoicesService.findById(id);
  }
}
