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
import { HarvestInvoicesService } from './harvest-invoices.service';
import { CreateHarvestInvoiceDto } from './dto/create-harvest-invoice.dto';
import { UpdateHarvestInvoiceDto } from './dto/update-harvest-invoice.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestInvoice } from './domain/harvest-invoice';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHarvestInvoicesDto } from './dto/find-all-harvest-invoices.dto';

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

  @Post()
  @ApiCreatedResponse({
    type: HarvestInvoice,
  })
  create(@Body() createHarvestInvoiceDto: CreateHarvestInvoiceDto) {
    return this.harvestInvoicesService.create(createHarvestInvoiceDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestInvoice),
  })
  async findAll(
    @Query() query: FindAllHarvestInvoicesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestInvoice>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestInvoicesService.findAllWithPagination({
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
    type: HarvestInvoice,
  })
  findById(@Param('id') id: string) {
    return this.harvestInvoicesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestInvoice,
  })
  update(
    @Param('id') id: string,
    @Body() updateHarvestInvoiceDto: UpdateHarvestInvoiceDto,
  ) {
    return this.harvestInvoicesService.update(id, updateHarvestInvoiceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestInvoicesService.remove(id);
  }
}
