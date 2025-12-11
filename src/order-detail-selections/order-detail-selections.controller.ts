import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderDetailSelection } from './domain/order-detail-selection';
import { OrderDetailSelectionsService } from './order-detail-selections.service';

@ApiTags('Orderdetailselections')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-detail-selections',
  version: '1',
})
export class OrderDetailSelectionsController {
  constructor(
    private readonly orderDetailSelectionsService: OrderDetailSelectionsService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderDetailSelection,
  })
  findById(@Param('id') id: string) {
    return this.orderDetailSelectionsService.findById(id);
  }
}
