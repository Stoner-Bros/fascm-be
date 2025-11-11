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
import { ImportTicketsService } from './import-tickets.service';
import { CreateImportTicketDto } from './dto/create-import-ticket.dto';
import { UpdateImportTicketDto } from './dto/update-import-ticket.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ImportTicket } from './domain/import-ticket';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllImportTicketsDto } from './dto/find-all-import-tickets.dto';

@ApiTags('Importtickets')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'import-tickets',
  version: '1',
})
export class ImportTicketsController {
  constructor(private readonly importTicketsService: ImportTicketsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ImportTicket,
  })
  create(@Body() createImportTicketDto: CreateImportTicketDto) {
    return this.importTicketsService.create(createImportTicketDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ImportTicket),
  })
  async findAll(
    @Query() query: FindAllImportTicketsDto,
  ): Promise<InfinityPaginationResponseDto<ImportTicket>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.importTicketsService.findAllWithPagination({
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
    type: ImportTicket,
  })
  findById(@Param('id') id: string) {
    return this.importTicketsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ImportTicket,
  })
  update(
    @Param('id') id: string,
    @Body() updateImportTicketDto: UpdateImportTicketDto,
  ) {
    return this.importTicketsService.update(id, updateImportTicketDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.importTicketsService.remove(id);
  }
}
