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
import { OrderSchedulesService } from './order-schedules.service';
import { ConsigneesService } from '../consignees/consignees.service';
import { CreateOrderScheduleDto } from './dto/create-order-schedule.dto';
import { UpdateOrderScheduleDto } from './dto/update-order-schedule.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderSchedule } from './domain/order-schedule';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrderSchedulesDto } from './dto/find-all-order-schedules.dto';

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

    return infinityPagination(
      await this.orderSchedulesService.findAllWithPagination({
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
}
