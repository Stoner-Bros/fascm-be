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
import { OrderInvoicesService } from './order-invoices.service';
import { CreateOrderInvoiceDto } from './dto/create-order-invoice.dto';
import { UpdateOrderInvoiceDto } from './dto/update-order-invoice.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { OrderInvoice } from './domain/order-invoice';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllOrderInvoicesDto } from './dto/find-all-order-invoices.dto';

@ApiTags('Orderinvoices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'order-invoices',
  version: '1',
})
export class OrderInvoicesController {
  constructor(private readonly orderInvoicesService: OrderInvoicesService) {}

  @Post()
  @ApiCreatedResponse({
    type: OrderInvoice,
  })
  create(@Body() createOrderInvoiceDto: CreateOrderInvoiceDto) {
    return this.orderInvoicesService.create(createOrderInvoiceDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderInvoice),
  })
  async findAll(
    @Query() query: FindAllOrderInvoicesDto,
  ): Promise<InfinityPaginationResponseDto<OrderInvoice>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderInvoicesService.findAllWithPagination({
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
    type: OrderInvoice,
  })
  findById(@Param('id') id: string) {
    return this.orderInvoicesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderInvoice,
  })
  update(
    @Param('id') id: string,
    @Body() updateOrderInvoiceDto: UpdateOrderInvoiceDto,
  ) {
    return this.orderInvoicesService.update(id, updateOrderInvoiceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.orderInvoicesService.remove(id);
  }
}
