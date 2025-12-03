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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ConsigneesService } from '../consignees/consignees.service';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { OrderSchedule } from './domain/order-schedule';
import { CreateOrderScheduleDto } from './dto/create-order-schedule.dto';
import { FindAllOrderSchedulesDto } from './dto/find-all-order-schedules.dto';
import { UpdateOrderScheduleStatusDto } from './dto/update-order-schedule-status.dto';
import { UpdateOrderScheduleDto } from './dto/update-order-schedule.dto';
import { OrderSchedulesService } from './order-schedules.service';

@ApiTags('Orderschedules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-schedules',
  version: '1',
})
export class OrderSchedulesController {
  constructor(
    private readonly orderSchedulesService: OrderSchedulesService,
    private readonly consigneesService: ConsigneesService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderSchedule,
  })
  create(
    @Body() createOrderScheduleDto: CreateOrderScheduleDto,
    @Req() req: any,
  ) {
    return (async () => {
      if (!createOrderScheduleDto.consignee?.id && req?.user?.id) {
        const consignee = await this.consigneesService.findByUserId(
          req.user.id,
        );
        if (consignee) {
          createOrderScheduleDto.consignee = { id: consignee.id } as any;
        }
      }
      return this.orderSchedulesService.create(createOrderScheduleDto);
    })();
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderSchedule),
  })
  async findAll(
    @Query() query: FindAllOrderSchedulesDto,
  ): Promise<InfinityPaginationResponseDto<OrderSchedule>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }
    const status = query?.status;
    const sort = query?.sort === 'asc' ? 'ASC' : 'DESC';

    return infinityPagination(
      await this.orderSchedulesService.findAllWithPagination({
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
    type: OrderSchedule,
  })
  findById(@Param('id') id: string) {
    return this.orderSchedulesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderSchedule,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderScheduleDto: UpdateOrderScheduleDto,
  ) {
    return this.orderSchedulesService.update(id, updateOrderScheduleDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orderSchedulesService.remove(id);
  }

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderSchedule,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderScheduleStatusDto: UpdateOrderScheduleStatusDto,
  ) {
    return this.orderSchedulesService.updateStatus(
      id,
      updateOrderScheduleStatusDto.status,
      updateOrderScheduleStatusDto.reason,
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
    return await this.orderSchedulesService.uploadImgProof(id, file);
  }
}
