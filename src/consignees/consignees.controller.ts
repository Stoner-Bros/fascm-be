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
  @ApiCreatedResponse({
    type: Consignee,
  })
  create(@Body() createConsigneeDto: CreateConsigneeDto) {
    return this.consigneesService.create(createConsigneeDto);
  }

  @Get()
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
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.consigneesService.remove(id);
  }
}
