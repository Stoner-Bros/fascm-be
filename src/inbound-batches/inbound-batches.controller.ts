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
import { InboundBatchesService } from './inbound-batches.service';
import { CreateInboundBatchDto } from './dto/create-inbound-batch.dto';
import { UpdateInboundBatchDto } from './dto/update-inbound-batch.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { InboundBatch } from './domain/inbound-batch';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllInboundBatchesDto } from './dto/find-all-inbound-batches.dto';

@ApiTags('Inboundbatches')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'inbound-batches',
  version: '1',
})
export class InboundBatchesController {
  constructor(private readonly inboundBatchesService: InboundBatchesService) {}

  @Post()
  @ApiCreatedResponse({
    type: InboundBatch,
  })
  create(@Body() createInboundBatchDto: CreateInboundBatchDto) {
    return this.inboundBatchesService.create(createInboundBatchDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(InboundBatch),
  })
  async findAll(
    @Query() query: FindAllInboundBatchesDto,
  ): Promise<InfinityPaginationResponseDto<InboundBatch>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.inboundBatchesService.findAllWithPagination({
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
    type: InboundBatch,
  })
  findById(@Param('id') id: string) {
    return this.inboundBatchesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InboundBatch,
  })
  update(
    @Param('id') id: string,
    @Body() updateInboundBatchDto: UpdateInboundBatchDto,
  ) {
    return this.inboundBatchesService.update(id, updateInboundBatchDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.inboundBatchesService.remove(id);
  }
}
