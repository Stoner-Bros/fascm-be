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
import { OrderPhasesService } from './order-phases.service';
import { CreateOrderPhaseDto } from './dto/create-order-phase.dto';
import { UpdateOrderPhaseDto } from './dto/update-order-phase.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderPhase } from './domain/order-phase';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrderPhasesDto } from './dto/find-all-order-phases.dto';

@ApiTags('Orderphases')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-phases',
  version: '1',
})
export class OrderPhasesController {
  constructor(private readonly orderPhasesService: OrderPhasesService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderPhase,
  })
  create(@Body() createOrderPhaseDto: CreateOrderPhaseDto) {
    return this.orderPhasesService.create(createOrderPhaseDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderPhase),
  })
  async findAll(
    @Query() query: FindAllOrderPhasesDto,
  ): Promise<InfinityPaginationResponseDto<OrderPhase>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderPhasesService.findAllWithPagination({
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
    type: OrderPhase,
  })
  findById(@Param('id') id: string) {
    return this.orderPhasesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderPhase,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderPhaseDto: UpdateOrderPhaseDto,
  ) {
    return this.orderPhasesService.update(id, updateOrderPhaseDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orderPhasesService.remove(id);
  }
}
