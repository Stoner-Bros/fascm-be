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
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
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
import { HarvestPhase } from './domain/harvest-phase';
import {
  CreateHarvestPhaseDto,
  CreateMultipleHarvestPhaseDto,
} from './dto/create-harvest-phase.dto';
import { FindAllHarvestPhasesDto } from './dto/find-all-harvest-phases.dto';
import { HarvestPhaseResponse } from './dto/harvest-phase-response.dto';
import { UpdateHarvestPhaseStatusDto } from './dto/update-harvest-phase-status.dto';
import { UpdateHarvestPhaseDto } from './dto/update-harvest-phase.dto';
import { HarvestPhasesService } from './harvest-phases.service';

@ApiTags('Harvestphases')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-phases',
  version: '1',
})
export class HarvestPhasesController {
  constructor(private readonly harvestPhasesService: HarvestPhasesService) {}

  @Post()
  @ApiCreatedResponse({
    type: HarvestPhase,
  })
  create(@Body() createHarvestPhaseDto: CreateHarvestPhaseDto) {
    return this.harvestPhasesService.create(createHarvestPhaseDto);
  }

  @Post('multiple')
  @ApiCreatedResponse({
    type: HarvestPhase,
  })
  createMultiple(
    @Body() createMultipleHarvestPhaseDto: CreateMultipleHarvestPhaseDto,
  ) {
    return this.harvestPhasesService.createMultiple(
      createMultipleHarvestPhaseDto,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestPhaseResponse),
  })
  async findAll(
    @Query() query: FindAllHarvestPhasesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestPhase>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestPhasesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filters: {
          deliveryStaffId: query?.deliveryStaffId,
        },
      }),
      { page, limit },
    );
  }

  @Get('harvest-schedule/:harvestScheduleId')
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestPhaseResponse),
  })
  async findAllBySchedule(
    @Param('harvestScheduleId') scheduleId: string,
    @Query() query: FindAllHarvestPhasesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestPhaseResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestPhasesService.findAllByScheduleWithPagination({
        harvestScheduleId: scheduleId,
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
    type: HarvestPhaseResponse,
  })
  findById(@Param('id') id: string) {
    return this.harvestPhasesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestPhase,
  })
  update(
    @Param('id') id: string,
    @Body() updateHarvestPhaseDto: UpdateHarvestPhaseDto,
  ) {
    return this.harvestPhasesService.update(id, updateHarvestPhaseDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestPhasesService.remove(id);
  }

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestPhase,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateHarvestPhaseStatusDto: UpdateHarvestPhaseStatusDto,
  ) {
    return this.harvestPhasesService.updateStatus(
      id,
      updateHarvestPhaseStatusDto.status,
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
    return await this.harvestPhasesService.uploadImgProof(id, file);
  }
}
