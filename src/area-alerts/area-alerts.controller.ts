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
import { AreaAlertsService } from './area-alerts.service';
import { CreateAreaAlertDto } from './dto/create-area-alert.dto';
import { UpdateAreaAlertDto } from './dto/update-area-alert.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AreaAlert } from './domain/area-alert';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAreaAlertsDto } from './dto/find-all-area-alerts.dto';

@ApiTags('Areaalerts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'area-alerts',
  version: '1',
})
export class AreaAlertsController {
  constructor(private readonly areaAlertsService: AreaAlertsService) {}

  @Post()
  @ApiCreatedResponse({
    type: AreaAlert,
  })
  create(@Body() createAreaAlertDto: CreateAreaAlertDto) {
    return this.areaAlertsService.create(createAreaAlertDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AreaAlert),
  })
  async findAll(
    @Query() query: FindAllAreaAlertsDto,
  ): Promise<InfinityPaginationResponseDto<AreaAlert>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.areaAlertsService.findAllWithPagination({
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
    type: AreaAlert,
  })
  findById(@Param('id') id: string) {
    return this.areaAlertsService.findById(id);
  }

  @Get('active/area/:areaId')
  @ApiParam({
    name: 'areaId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AreaAlert,
  })
  findActiveByAreaId(@Param('areaId') areaId: string) {
    return this.areaAlertsService.findActiveAlertByAreaId(areaId);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AreaAlert,
  })
  update(
    @Param('id') id: string,
    @Body() updateAreaAlertDto: UpdateAreaAlertDto,
  ) {
    return this.areaAlertsService.update(id, updateAreaAlertDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.areaAlertsService.remove(id);
  }
}
