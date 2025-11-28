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
  Req,
  SerializeOptions,
} from '@nestjs/common';
import { ConsigneesService } from './consignees.service';
import { CreateConsigneeDto } from './dto/create-consignee.dto';
import { UpdateConsigneeDto } from './dto/update-consignee.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Consignee } from './domain/consignee';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllConsigneesDto } from './dto/find-all-consignees.dto';
import { RoleEnum } from 'src/roles/roles.enum';
import { Roles } from 'src/roles/roles.decorator';

@ApiTags('Consignees')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'consignees',
  version: '1',
})
export class ConsigneesController {
  constructor(private readonly consigneesService: ConsigneesService) {}

  @Post()
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiCreatedResponse({
    type: Consignee,
  })
  create(@Body() createConsigneeDto: CreateConsigneeDto) {
    return this.consigneesService.create(createConsigneeDto);
  }

  @Get()
  @Roles(RoleEnum.admin, RoleEnum.manager)
  @SerializeOptions({
    groups: ['admin'],
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Consignee),
  })
  async findAll(
    @Query() query: FindAllConsigneesDto,
  ): Promise<InfinityPaginationResponseDto<Consignee>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.consigneesService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get('mine')
  @Roles(RoleEnum.consignee)
  @SerializeOptions({
    groups: ['me'],
  })
  @ApiOkResponse({
    type: Consignee,
  })
  async findMine(@Req() req: any) {
    const userId = req?.user?.id as string | undefined;
    const consignee = await this.consigneesService.findByUserId(
      String(userId ?? ''),
    );
    return consignee;
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
    type: Consignee,
  })
  findById(@Param('id') id: string) {
    return this.consigneesService.findById(id);
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
    type: Consignee,
  })
  update(
    @Param('id') id: string,
    @Body() updateConsigneeDto: UpdateConsigneeDto,
  ) {
    return this.consigneesService.update(id, updateConsigneeDto);
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
    return this.consigneesService.remove(id);
  }
}
