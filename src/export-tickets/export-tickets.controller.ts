import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { ExportTicket } from './domain/export-ticket';
import { FindAllExportTicketsDto } from './dto/find-all-export-tickets.dto';
import { ExportTicketsService } from './export-tickets.service';

@ApiTags('Exporttickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'export-tickets',
  version: '1',
})
export class ExportTicketsController {
  constructor(private readonly exportTicketsService: ExportTicketsService) {}

  // @Post()
  // @ApiCreatedResponse({
  //   type: ExportTicket,
  // })
  // create(@Body() createExportTicketDto: CreateExportTicketDto) {
  //   return this.exportTicketsService.create(createExportTicketDto);
  // }

  // @Post('many')
  // @ApiCreatedResponse({
  //   type: [ExportTicket],
  // })
  // createBulk(@Body() createExportTicketDtos: CreateExportTicketDto[]) {
  //   return this.exportTicketsService.createBulk(createExportTicketDtos);
  // }

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
}
