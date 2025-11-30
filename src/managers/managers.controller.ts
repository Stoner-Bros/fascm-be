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
  SerializeOptions,
  Req,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Manager } from './domain/manager';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllManagersDto } from './dto/find-all-managers.dto';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';

@ApiTags('Managers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'managers',
  version: '1',
})
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  @Roles(RoleEnum.admin)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiCreatedResponse({
    type: Manager,
  })
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Get()
  @Roles(RoleEnum.admin)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Manager),
  })
  async findAll(
    @Query() query: FindAllManagersDto,
  ): Promise<InfinityPaginationResponseDto<Manager>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.managersService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('mine')
  @Roles(RoleEnum.manager)
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiOkResponse({
    type: Manager,
  })
  async findMine(@Req() req: any) {
    const userId = req?.user?.id as string | undefined;
    const manager = await this.managersService.findByUserId(
      Number(userId ?? ''),
    );
    return manager;
  }

  @Get(':id')
  @Roles(RoleEnum.admin)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Manager,
  })
  findById(@Param('id') id: string) {
    return this.managersService.findById(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Manager,
  })
  update(@Param('id') id: string, @Body() updateManagerDto: UpdateManagerDto) {
    return this.managersService.update(id, updateManagerDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.managersService.remove(id);
  }
}
