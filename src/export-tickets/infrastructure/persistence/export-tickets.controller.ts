import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { ExportTicket } from 'src/export-tickets/domain/export-ticket';
import { CreateExportTicketDto } from 'src/export-tickets/dto/create-export-ticket.dto';
import { FindAllExportTicketsDto } from 'src/export-tickets/dto/find-all-export-tickets.dto';
import { FindExportTicketsByAreaDto } from 'src/export-tickets/dto/find-export-tickets-by-area.dto';
import { ExportTicketsService } from 'src/export-tickets/export-tickets.service';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from 'src/utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from 'src/utils/infinity-pagination';

@ApiTags('Exporttickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'export-tickets',
  version: '1',
})
export class ExportTicketsController {
  constructor(private readonly exportTicketsService: ExportTicketsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ExportTicket,
  })
  create(@Body() createExportTicketDto: CreateExportTicketDto) {
    return this.exportTicketsService.create(createExportTicketDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ExportTicket),
  })
  async findAll(
    @Query() query: FindAllExportTicketsDto,
  ): Promise<InfinityPaginationResponseDto<ExportTicket>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.exportTicketsService.findAllWithPagination({
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
    type: ExportTicket,
  })
  findById(@Param('id') id: string) {
    return this.exportTicketsService.findById(id);
  }

  // @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   type: String,
  //   required: true,
  // })
  // @ApiOkResponse({
  //   type: ExportTicket,
  // })
  // update(
  //   @Param('id') id: string,
  //   @Body() updateExportTicketDto: UpdateExportTicketDto,
  // ) {
  //   return this.exportTicketsService.update(id, updateExportTicketDto);
  // }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.exportTicketsService.remove(id);
  }

  @Get('by-area/:areaId')
  @ApiParam({
    name: 'areaId',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: InfinityPaginationResponse(ExportTicket),
  })
  async findByArea(
    @Param('areaId') areaId: string,
    @Query() query: FindExportTicketsByAreaDto,
  ): Promise<InfinityPaginationResponseDto<ExportTicket>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.exportTicketsService.findByAreaWithPagination({
        areaId,
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }
}
