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
import { HarvestSchedulesService } from './harvest-schedules.service';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { ConfirmHarvestScheduleDto } from './dto/confirm-harvest-schedule.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestSchedule } from './domain/harvest-schedule';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHarvestSchedulesDto } from './dto/find-all-harvest-schedules.dto';

@ApiTags('Harvestschedules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-schedules',
  version: '1',
})
export class HarvestSchedulesController {
  constructor(
    private readonly harvestSchedulesService: HarvestSchedulesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: HarvestSchedule,
  })
  create(@Body() createHarvestScheduleDto: CreateHarvestScheduleDto) {
    return this.harvestSchedulesService.create(createHarvestScheduleDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestSchedule),
  })
  async findAll(
    @Query() query: FindAllHarvestSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestSchedule>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestSchedulesService.findAllWithPagination({
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
    type: HarvestSchedule,
  })
  findById(@Param('id') id: string) {
    return this.harvestSchedulesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestSchedule,
  })
  update(
    @Param('id') id: string,
    @Body() updateHarvestScheduleDto: UpdateHarvestScheduleDto,
  ) {
    return this.harvestSchedulesService.update(id, updateHarvestScheduleDto);
  }

  @Patch(':id/confirm')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestSchedule,
  })
  confirm(
    @Param('id') id: string,
    @Body() confirmHarvestScheduleDto: ConfirmHarvestScheduleDto,
  ) {
    return this.harvestSchedulesService.confirm(
      id,
      confirmHarvestScheduleDto.status,
    );
  }

  @Patch(':id/cancel')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestSchedule,
  })
  cancel(@Param('id') id: string) {
    return this.harvestSchedulesService.cancel(id);
  }

  @Patch(':id/complete')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestSchedule,
  })
  complete(@Param('id') id: string) {
    return this.harvestSchedulesService.complete(id);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestSchedulesService.remove(id);
  }
}
