import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestDetail } from './domain/harvest-detail';
import { HarvestDetailsService } from './harvest-details.service';

@ApiTags('Harvestdetails')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-details',
  version: '1',
})
export class HarvestDetailsController {
  constructor(private readonly harvestDetailsService: HarvestDetailsService) {}

  @Get('harvest-ticket/:harvestTicketId')
  @ApiParam({
    name: 'harvestTicketId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: [HarvestDetail],
  })
  findByHarvestTicketId(@Param('harvestTicketId') harvestTicketId: string) {
    return this.harvestDetailsService.findByHarvestTicketId(harvestTicketId);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestDetail,
  })
  findById(@Param('id') id: string) {
    return this.harvestDetailsService.findById(id);
  }
}
