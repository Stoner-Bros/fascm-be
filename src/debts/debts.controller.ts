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
  Request,
} from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Debt } from './domain/debt';
import { AuthGuard } from '@nestjs/passport';
import { Payment } from 'src/payments/domain/payment';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllDebtsDto } from './dto/find-all-debts.dto';

@ApiTags('Debts')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'debts',
  version: '1',
})
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Post()
  @ApiCreatedResponse({
    type: Debt,
  })
  create(@Body() createDebtDto: CreateDebtDto) {
    return this.debtsService.create(createDebtDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(Debt),
  })
  async findAll(
    @Query() query: FindAllDebtsDto,
  ): Promise<InfinityPaginationResponseDto<Debt>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.debtsService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
        partnerType: query.partnerType,
      }),
      { page, limit },
    );
  }

  @Get('my-debts')
  @ApiOkResponse({
    type: Debt,
  })
  getMyDebts(@Request() request) {
    return this.debtsService.getMyDebts(request.user);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Debt,
  })
  findById(@Param('id') id: string) {
    return this.debtsService.findById(id);
  }

  @Get(':id/payments')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(Payment),
  })
  async getPaymentsByDebtId(
    @Param('id') id: string,
    @Query() query: FindAllDebtsDto,
  ): Promise<InfinityPaginationResponseDto<Payment>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.debtsService.getPaymentsByDebtId(id, {
        page,
        limit,
      }),
      { page, limit },
    );
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: Debt,
  })
  update(@Param('id') id: string, @Body() updateDebtDto: UpdateDebtDto) {
    return this.debtsService.update(id, updateDebtDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.debtsService.remove(id);
  }
}
