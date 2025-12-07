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
import { OrderInvoiceDetailsService } from './order-invoice-details.service';
import { CreateOrderInvoiceDetailDto } from './dto/create-order-invoice-detail.dto';
import { UpdateOrderInvoiceDetailDto } from './dto/update-order-invoice-detail.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderInvoiceDetail } from './domain/order-invoice-detail';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrderInvoiceDetailsDto } from './dto/find-all-order-invoice-details.dto';

@ApiTags('Orderinvoicedetails')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-invoice-details',
  version: '1',
})
export class OrderInvoiceDetailsController {
  constructor(
    private readonly orderInvoiceDetailsService: OrderInvoiceDetailsService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderInvoiceDetail,
  })
  create(@Body() createOrderInvoiceDetailDto: CreateOrderInvoiceDetailDto) {
    return this.orderInvoiceDetailsService.create(createOrderInvoiceDetailDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderInvoiceDetail),
  })
  async findAll(
    @Query() query: FindAllOrderInvoiceDetailsDto,
  ): Promise<InfinityPaginationResponseDto<OrderInvoiceDetail>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderInvoiceDetailsService.findAllWithPagination({
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
    type: OrderInvoiceDetail,
  })
  findById(@Param('id') id: string) {
    return this.orderInvoiceDetailsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderInvoiceDetail,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderInvoiceDetailDto: UpdateOrderInvoiceDetailDto,
  ) {
    return this.orderInvoiceDetailsService.update(
      id,
      updateOrderInvoiceDetailDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orderInvoiceDetailsService.remove(id);
  }
}
