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
import { HarvestPhasesService } from './harvest-phases.service';
import { CreateHarvestPhaseDto } from './dto/create-harvest-phase.dto';
import { UpdateHarvestPhaseDto } from './dto/update-harvest-phase.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestPhase } from './domain/harvest-phase';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHarvestPhasesDto } from './dto/find-all-harvest-phases.dto';

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

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestPhase),
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
    type: HarvestPhase,
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
}
