import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { HarvestDetailsService } from './harvest-details.service';
import { CreateHarvestDetailDto } from './dto/create-harvest-detail.dto';
import { UpdateHarvestDetailDto } from './dto/update-harvest-detail.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestDetail } from './domain/harvest-detail';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHarvestDetailsDto } from './dto/find-all-harvest-details.dto';

@ApiTags('Harvestdetails')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-details',
  version: '1',
})
export class HarvestDetailsController {
  constructor(private readonly harvestDetailsService: HarvestDetailsService) {}

  @Post()
  @ApiCreatedResponse({
    type: HarvestDetail,
  })
  create(@Body() createHarvestDetailDto: CreateHarvestDetailDto) {
    return this.harvestDetailsService.create(createHarvestDetailDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestDetail),
  })
  async findAll(
    @Query() query: FindAllHarvestDetailsDto,
  ): Promise<InfinityPaginationResponseDto<HarvestDetail>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestDetailsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

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
  update(
    @Param('id') id: string,
    @Body() updateHarvestDetailDto: UpdateHarvestDetailDto,
  ) {
    return this.harvestDetailsService.update(id, updateHarvestDetailDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestDetailsService.remove(id);
  }
}
