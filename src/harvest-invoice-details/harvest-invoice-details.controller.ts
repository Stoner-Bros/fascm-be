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
import { HarvestInvoiceDetailsService } from './harvest-invoice-details.service';
import { CreateHarvestInvoiceDetailDto } from './dto/create-harvest-invoice-detail.dto';
import { UpdateHarvestInvoiceDetailDto } from './dto/update-harvest-invoice-detail.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestInvoiceDetail } from './domain/harvest-invoice-detail';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHarvestInvoiceDetailsDto } from './dto/find-all-harvest-invoice-details.dto';

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

  @Post()
  @ApiCreatedResponse({
    type: HarvestInvoiceDetail,
  })
  create(@Body() createHarvestInvoiceDetailDto: CreateHarvestInvoiceDetailDto) {
    return this.harvestInvoiceDetailsService.create(
      createHarvestInvoiceDetailDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestInvoiceDetail),
  })
  async findAll(
    @Query() query: FindAllHarvestInvoiceDetailsDto,
  ): Promise<InfinityPaginationResponseDto<HarvestInvoiceDetail>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestInvoiceDetailsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

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

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestInvoiceDetail,
  })
  update(
    @Param('id') id: string,
    @Body() updateHarvestInvoiceDetailDto: UpdateHarvestInvoiceDetailDto,
  ) {
    return this.harvestInvoiceDetailsService.update(
      id,
      updateHarvestInvoiceDetailDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestInvoiceDetailsService.remove(id);
  }
}
