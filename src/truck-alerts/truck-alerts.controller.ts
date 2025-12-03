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
import { TruckAlertsService } from './truck-alerts.service';
import { CreateTruckAlertDto } from './dto/create-truck-alert.dto';
import { UpdateTruckAlertDto } from './dto/update-truck-alert.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TruckAlert } from './domain/truck-alert';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllTruckAlertsDto } from './dto/find-all-truck-alerts.dto';

@ApiTags('TruckAlerts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'truck-alerts',
  version: '1',
})
export class TruckAlertsController {
  constructor(private readonly truckAlertsService: TruckAlertsService) {}

  @Post()
  @ApiCreatedResponse({
    type: TruckAlert,
  })
  create(@Body() createTruckAlertDto: CreateTruckAlertDto) {
    return this.truckAlertsService.create(createTruckAlertDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(TruckAlert),
  })
  async findAll(
    @Query() query: FindAllTruckAlertsDto,
  ): Promise<InfinityPaginationResponseDto<TruckAlert>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.truckAlertsService.findAllWithPagination({
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
    type: TruckAlert,
  })
  findById(@Param('id') id: string) {
    return this.truckAlertsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TruckAlert,
  })
  update(
    @Param('id') id: string,
    @Body() updateTruckAlertDto: UpdateTruckAlertDto,
  ) {
    return this.truckAlertsService.update(id, updateTruckAlertDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.truckAlertsService.remove(id);
  }
}
