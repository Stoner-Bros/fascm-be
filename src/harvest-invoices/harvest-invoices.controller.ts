import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestInvoice } from './domain/harvest-invoice';
import { HarvestInvoicesService } from './harvest-invoices.service';

@ApiTags('Harvestinvoices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-invoices',
  version: '1',
})
export class HarvestInvoicesController {
  constructor(
    private readonly harvestInvoicesService: HarvestInvoicesService,
  ) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestInvoice,
  })
  findById(@Param('id') id: string) {
    return this.harvestInvoicesService.findById(id);
  }
}
