import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { HarvestDetail } from './domain/harvest-detail';
import { AcceptPriceDto } from './dto/accep-price.dto';
import { UpdateFinalPriceDto } from './dto/update-price.dto';
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

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestDetail,
  })
  async updateFinalPrice(
    @Param('id') id: string,
    @Body() updateFinalPrice: UpdateFinalPriceDto,
  ) {
    return this.harvestDetailsService.updateFinalPrice(
      id,
      updateFinalPrice.finalUnitPrice,
    );
  }

  @Roles(RoleEnum.supplier)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Patch(':id/final-unit-price-accepted')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestDetail,
  })
  async acceptFinalUnitPrice(
    @Param('id') id: string,
    @Body() acceptPriceDto: AcceptPriceDto,
  ) {
    return this.harvestDetailsService.updateFinalUnitPriceAccepted(
      id,
      acceptPriceDto.finalUnitPriceAccepted,
    );
  }
}
