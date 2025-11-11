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
import { AreaSettingsService } from './area-settings.service';
import { CreateAreaSettingDto } from './dto/create-area-setting.dto';
import { UpdateAreaSettingDto } from './dto/update-area-setting.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AreaSetting } from './domain/area-setting';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllAreaSettingsDto } from './dto/find-all-area-settings.dto';

@ApiTags('Areasettings')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'area-settings',
  version: '1',
})
export class AreaSettingsController {
  constructor(private readonly areaSettingsService: AreaSettingsService) {}

  @Post()
  @ApiCreatedResponse({
    type: AreaSetting,
  })
  create(@Body() createAreaSettingDto: CreateAreaSettingDto) {
    return this.areaSettingsService.create(createAreaSettingDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(AreaSetting),
  })
  async findAll(
    @Query() query: FindAllAreaSettingsDto,
  ): Promise<InfinityPaginationResponseDto<AreaSetting>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.areaSettingsService.findAllWithPagination({
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
    type: AreaSetting,
  })
  findById(@Param('id') id: string) {
    return this.areaSettingsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: AreaSetting,
  })
  update(
    @Param('id') id: string,
    @Body() updateAreaSettingDto: UpdateAreaSettingDto,
  ) {
    return this.areaSettingsService.update(id, updateAreaSettingDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.areaSettingsService.remove(id);
  }
}
