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
import { TruckSettingsService } from './truck-settings.service';
import { CreateTruckSettingDto } from './dto/create-truck-setting.dto';
import { UpdateTruckSettingDto } from './dto/update-truck-setting.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { TruckSetting } from './domain/truck-setting';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllTruckSettingsDto } from './dto/find-all-truck-settings.dto';

@ApiTags('TruckSettings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'truck-settings',
  version: '1',
})
export class TruckSettingsController {
  constructor(private readonly truckSettingsService: TruckSettingsService) {}

  @Post()
  @ApiCreatedResponse({
    type: TruckSetting,
  })
  create(@Body() createTruckSettingDto: CreateTruckSettingDto) {
    return this.truckSettingsService.create(createTruckSettingDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(TruckSetting),
  })
  async findAll(
    @Query() query: FindAllTruckSettingsDto,
  ): Promise<InfinityPaginationResponseDto<TruckSetting>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.truckSettingsService.findAllWithPagination({
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
    type: TruckSetting,
  })
  findById(@Param('id') id: string) {
    return this.truckSettingsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: TruckSetting,
  })
  update(
    @Param('id') id: string,
    @Body() updateTruckSettingDto: UpdateTruckSettingDto,
  ) {
    return this.truckSettingsService.update(id, updateTruckSettingDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.truckSettingsService.remove(id);
  }
}
