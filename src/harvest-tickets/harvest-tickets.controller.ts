import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { HarvestTicket } from './domain/harvest-ticket';
import { CreateHarvestTicketDto } from './dto/create-harvest-ticket.dto';
import { FindAllHarvestTicketsDto } from './dto/find-all-harvest-tickets.dto';
import { HarvestTicketResponse } from './dto/harvest-ticket-response.dto';
import { UpdateHarvestTicketDto } from './dto/update-harvest-ticket.dto';
import { HarvestTicketsService } from './harvest-tickets.service';

@ApiTags('Harvesttickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'harvest-tickets',
  version: '1',
})
export class HarvestTicketsController {
  constructor(private readonly harvestTicketsService: HarvestTicketsService) {}

  @Post()
  @ApiCreatedResponse({
    type: HarvestTicket,
  })
  create(@Body() createHarvestTicketDto: CreateHarvestTicketDto) {
    return this.harvestTicketsService.create(createHarvestTicketDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(HarvestTicketResponse),
  })
  async findAll(
    @Query() query: FindAllHarvestTicketsDto,
  ): Promise<InfinityPaginationResponseDto<HarvestTicketResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.harvestTicketsService.findAllWithPagination({
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
    type: HarvestTicket,
  })
  findById(@Param('id') id: string) {
    return this.harvestTicketsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: HarvestTicket,
  })
  update(
    @Param('id') id: string,
    @Body() updateHarvestTicketDto: UpdateHarvestTicketDto,
  ) {
    return this.harvestTicketsService.update(id, updateHarvestTicketDto);
  }

  // @Patch(':id/recalculate')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: HarvestTicket,
  // })
  // recalculate(@Param('id') id: string) {
  //   return this.harvestTicketsService.recalculateTicketTotals(id);
  // }

  // @Get(':id/invoice')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // async downloadInvoice(
  //   @Param('id') id: string,
  //   @Res() res: Response,
  // ): Promise<void> {
  //   const pdfBuffer = await this.harvestTicketsService.generateInvoicePdf(id);

  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': `attachment; filename="harvest-invoice-${id}.pdf"`,
  //     'Content-Length': pdfBuffer.length.toString(),
  //   });

  //   res.end(pdfBuffer);
  // }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.harvestTicketsService.remove(id);
  }
}
