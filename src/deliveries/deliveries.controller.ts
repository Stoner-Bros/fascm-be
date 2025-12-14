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
import { DeliveriesService } from './deliveries.service';
import { Delivery } from './domain/delivery';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { FindAllDeliveriesDto } from './dto/find-all-deliveries.dto';
import { UpdateDeliveryStatusDto } from './dto/update-delivery-status.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryResponse } from './dto/delivery-response.dto';

@ApiTags('Deliveries')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'deliveries',
  version: '1',
})
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Delivery,
  })
  create(@Body() createDeliveryDto: CreateDeliveryDto) {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(DeliveryResponse),
  })
  async findAll(
    @Query() query: FindAllDeliveriesDto,
  ): Promise<InfinityPaginationResponseDto<DeliveryResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.deliveriesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filters: {
          orderPhaseId: query?.orderPhaseId,
          harvestPhaseId: query?.harvestPhaseId,
        },
      }),
      { page, limit },
    );
  }

  @Get('with-harvest-phase')
  @ApiOkResponse({
    type: InfinityPaginationResponse(DeliveryResponse),
  })
  async findAllWithHarvestPhase(
    @Query() query: FindAllDeliveriesDto,
  ): Promise<InfinityPaginationResponseDto<DeliveryResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.deliveriesService.findAllWithHarvestPhase({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('with-order-phase')
  @ApiOkResponse({
    type: InfinityPaginationResponse(DeliveryResponse),
  })
  async findAllWithOrderPhase(
    @Query() query: FindAllDeliveriesDto,
  ): Promise<InfinityPaginationResponseDto<DeliveryResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.deliveriesService.findAllWithOrderPhase({
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
    type: Delivery,
  })
  findById(@Param('id') id: string) {
    return this.deliveriesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Delivery,
  })
  update(
    @Param('id') id: string,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ) {
    return this.deliveriesService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.deliveriesService.remove(id);
  }

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Delivery,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateDeliveryStatusDto: UpdateDeliveryStatusDto,
  ) {
    return this.deliveriesService.updateStatus(
      id,
      updateDeliveryStatusDto.status,
    );
  }
}
