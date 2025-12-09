import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestInvoiceDetail } from './domain/harvest-invoice-detail';
import { HarvestInvoiceDetailsService } from './harvest-invoice-details.service';

@ApiTags('Harvestinvoicedetails')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-invoice-details',
  version: '1',
})
export class HarvestInvoiceDetailsController {
  constructor(
    private readonly harvestInvoiceDetailsService: HarvestInvoiceDetailsService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestInvoiceDetail,
  })
  findById(@Param('id') id: string) {
    return this.harvestInvoiceDetailsService.findById(id);
  }
}
