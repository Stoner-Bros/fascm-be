import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestTicket } from './domain/harvest-ticket';
import { HarvestTicketsService } from './harvest-tickets.service';

@ApiTags('Harvesttickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-tickets',
  version: '1',
})
export class HarvestTicketsController {
  constructor(private readonly harvestTicketsService: HarvestTicketsService) {}
  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestTicket,
  })
  findById(@Param('id') id: string) {
    return this.harvestTicketsService.findById(id);
  }
}
