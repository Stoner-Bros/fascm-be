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
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Staff } from './domain/staff';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllStaffsDto } from './dto/find-all-staffs.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Staffs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'staffs',
  version: '1',
})
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiCreatedResponse({
    type: Staff,
  })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Staff),
  })
  async findAll(
    @Query() query: FindAllStaffsDto,
  ): Promise<InfinityPaginationResponseDto<Staff>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.staffsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('mine')
  @Roles(RoleEnum.staff)
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiOkResponse({
    type: Staff,
  })
  async findMine(@Req() req: any) {
    const userId = req?.user?.id as string | undefined;
    const staff = await this.staffsService.findByUserId(Number(userId ?? ''));
    return staff;
  }

  @Get(':id')
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Staff,
  })
  findById(@Param('id') id: string) {
    return this.staffsService.findById(id);
  }

  @Patch(':id')
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Staff,
  })
  update(@Param('id') id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(id, updateStaffDto);
  }

  @Delete(':id')
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.staffsService.remove(id);
  }
}
