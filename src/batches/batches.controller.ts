import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { BatchesService } from './batches.service';
import { Batch } from './domain/batch';
import { BatchResponse } from './dto/batch-response.dto';
import { FindBatchesByFilterDto } from './dto/find-batches-by-filter.dto';

@ApiTags('Batches')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'batches',
  version: '1',
})
export class BatchesController {
  constructor(private readonly batchesService: BatchesService) {}

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Batch,
  })
  findById(@Param('id') id: string) {
    return this.batchesService.findById(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.batchesService.remove(id);
  }

  @Get('filter/by-params')
  @ApiOkResponse({
    type: InfinityPaginationResponse(BatchResponse),
  })
  async findByFilters(
    @Query() query: FindBatchesByFilterDto,
  ): Promise<InfinityPaginationResponseDto<BatchResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.batchesService.findByFiltersWithPagination({
        areaId: query.areaId,
        productId: query.productId,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
