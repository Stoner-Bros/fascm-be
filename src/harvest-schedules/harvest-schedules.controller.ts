import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
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
import { SuppliersService } from 'src/suppliers/suppliers.service';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { HarvestSchedule } from './domain/harvest-schedule';
import { CreateHarvestScheduleDto } from './dto/create-harvest-schedule.dto';
import { FindAllHarvestSchedulesDto } from './dto/find-all-harvest-schedules.dto';
import { HarvestScheduleResponse } from './dto/harvest-schedule-response';
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
    private readonly supplierService: SuppliersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: HarvestSchedule,
  })
  create(
    @Body() createHarvestScheduleDto: CreateHarvestScheduleDto,
    @Request() request,
  ) {
    return this.harvestSchedulesService.create(
      createHarvestScheduleDto,
      request.user.id,
    );
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestScheduleResponse),
  })
  async findAll(
    @Query() query: FindAllHarvestSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestScheduleResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const status = query?.status;
    const warehouseId = query?.warehouseId;
    const sort = query?.sort === 'asc' ? 'ASC' : 'DESC';

    return infinityPagination(
      await this.harvestSchedulesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filters: { status, warehouseId },
        sort,
      }),
      { page, limit },
    );
  }

  @Get('supplier/:supplierId')
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestScheduleResponse),
  })
  async findAllBySupplier(
    @Param('supplierId') supplierId: string,
    @Query() query: FindAllHarvestSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestScheduleResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const status = query?.status;
    const sort = query?.sort === 'asc' ? 'ASC' : 'DESC';

    return infinityPagination(
      await this.harvestSchedulesService.findAllBySupplierWithPagination({
        supplierId,
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

  @Get('mine')
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestScheduleResponse),
  })
  async findAllMine(
    @Request() request,
    @Query() query: FindAllHarvestSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<HarvestScheduleResponse>> {
    const userId = request.user.id;
    const supplier = await this.supplierService.findByUserId(userId);
    if (!supplier) {
      return infinityPagination([], { page: 1, limit: 10 });
    }
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const status = query?.status;
    const sort = query?.sort === 'asc' ? 'ASC' : 'DESC';

    return infinityPagination(
      await this.harvestSchedulesService.findAllBySupplierWithPagination({
        supplierId: supplier.id,
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
    type: HarvestScheduleResponse,
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
    @Request() request,
  ) {
    return this.harvestSchedulesService.update(
      id,
      updateHarvestScheduleDto,
      request.user.id,
    );
  }

  // @Delete(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // remove(@Param('id') id: string) {
  //   return this.harvestSchedulesService.remove(id);
  // }

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
}
