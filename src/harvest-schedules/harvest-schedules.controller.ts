import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { HarvestSchedule } from './domain/harvest-schedule';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { FindAllHarvestSchedulesDto } from './dto/find-all-harvest-schedules.dto';
import { UpdateHarvestScheduleStatusDto } from './dto/update-harvest-schedule-status.dto';
import { UpdateHarvestScheduleDto } from './dto/update-harvest-schedule.dto';
import { HarvestSchedulesService } from './harvest-schedules.service';

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
    const status = query?.status;
    const sort = query?.sort === 'asc' ? 'ASC' : 'DESC';

    return infinityPagination(
      await this.harvestSchedulesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filters: { status },
        sort,
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

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestSchedulesService.remove(id);
  }

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestSchedule,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateHarvestScheduleStatusDto: UpdateHarvestScheduleStatusDto,
  ) {
    return this.harvestSchedulesService.updateStatus(
      id,
      updateHarvestScheduleStatusDto.status,
      updateHarvestScheduleStatusDto.reason,
    );
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':id/upload-img-proof')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImgProof(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ path: string }> {
    return await this.harvestSchedulesService.uploadImgProof(id, file);
  }
}
