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
import { HarvestTicketsService } from './harvest-tickets.service';
import { CreateHarvestTicketDto } from './dto/create-harvest-ticket.dto';
import { UpdateHarvestTicketDto } from './dto/update-harvest-ticket.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { HarvestTicket } from './domain/harvest-ticket';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllHarvestTicketsDto } from './dto/find-all-harvest-tickets.dto';

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
    type: InfinityPaginationResponse(HarvestTicket),
  })
  async findAll(
    @Query() query: FindAllHarvestTicketsDto,
  ): Promise<InfinityPaginationResponseDto<HarvestTicket>> {
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
