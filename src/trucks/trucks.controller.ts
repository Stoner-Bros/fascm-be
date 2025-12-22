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
import { Truck } from './domain/truck';
import { CreateTruckDto } from './dto/create-truck.dto';
import { FindAllTrucksDto } from './dto/find-all-trucks.dto';
import { UpdateTruckStatusDto } from './dto/update-truck-status.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { TrucksService } from './trucks.service';

@ApiTags('Trucks')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'trucks',
  version: '1',
})
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  @ApiCreatedResponse({
    type: Truck,
  })
  create(@Body() createTruckDto: CreateTruckDto) {
    return this.trucksService.create(createTruckDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Truck),
  })
  async findAll(
    @Query() query: FindAllTrucksDto,
  ): Promise<InfinityPaginationResponseDto<Truck>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    const status = query?.status;
    const warehouseId = query?.warehouseId;
    const sort = query?.sort === 'asc' ? 'ASC' : 'DESC';

    return infinityPagination(
      await this.trucksService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        filters: {
          status,
          warehouseId,
        },
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
    type: Truck,
  })
  findById(@Param('id') id: string) {
    return this.trucksService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Truck,
  })
  update(@Param('id') id: string, @Body() updateTruckDto: UpdateTruckDto) {
    return this.trucksService.update(id, updateTruckDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.trucksService.remove(id);
  }

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Truck,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateTruckStatusDto: UpdateTruckStatusDto,
  ) {
    return this.trucksService.updateStatus(id, updateTruckStatusDto.status);
  }
}
