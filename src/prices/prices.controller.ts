import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { Price } from './domain/price';
import { CreatePriceDto } from './dto/create-price.dto';
import { FindAllPricesDto } from './dto/find-all-prices.dto';
import { PriceResponse } from './dto/price-response.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PricesService } from './prices.service';

@ApiTags('Prices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'prices',
  version: '1',
})
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Price,
  })
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Price),
  })
  async findAll(
    @Query() query: FindAllPricesDto,
  ): Promise<InfinityPaginationResponseDto<Price>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.pricesService.findAllWithPagination({
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
    type: Price,
  })
  findById(@Param('id') id: string) {
    return this.pricesService.findById(id);
  }

  @Get(':id/batch')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PriceResponse,
  })
  findPricesOfBatch(@Param('id') id: string) {
    return this.pricesService.findPricesOfBatch(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Price,
  })
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.pricesService.remove(id);
  }
}
