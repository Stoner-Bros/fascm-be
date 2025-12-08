import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
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
import { OrderPhase } from './domain/order-phase';
import {
  CreateMultipleOrderPhaseDto,
  CreateOrderPhaseDto,
} from './dto/create-order-phase.dto';
import { FindAllOrderPhasesDto } from './dto/find-all-order-phases.dto';
import { OrderPhaseResponse } from './dto/order-phase-response.dto';
import { UpdateOrderPhaseStatusDto } from './dto/update-order-phase-status.dto';
import { UpdateOrderPhaseDto } from './dto/update-order-phase.dto';
import { OrderPhasesService } from './order-phases.service';

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

  @Post('multiple')
  @ApiCreatedResponse({
    type: OrderPhase,
  })
  createMultiple(
    @Body() createMultipleOrderPhaseDto: CreateMultipleOrderPhaseDto,
  ) {
    return this.orderPhasesService.createMultiple(createMultipleOrderPhaseDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderPhaseResponse),
  })
  async findAll(
    @Query() query: FindAllOrderPhasesDto,
  ): Promise<InfinityPaginationResponseDto<OrderPhaseResponse>> {
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

  @Get('order-schedule/:orderScheduleId')
  @ApiOkResponse({
    type: InfinityPaginationResponse(OrderPhaseResponse),
  })
  async findAllBySchedule(
    @Param('orderScheduleId') scheduleId: string,
    @Query() query: FindAllOrderPhasesDto,
  ): Promise<InfinityPaginationResponseDto<OrderPhaseResponse>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.orderPhasesService.findAllByScheduleWithPagination({
        orderScheduleId: scheduleId,
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
    type: OrderPhaseResponse,
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

  @Patch(':id/status')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: OrderPhase,
  })
  updateStatus(
    @Param('id') id: string,
    @Body() updateOrderPhaseStatusDto: UpdateOrderPhaseStatusDto,
  ) {
    return this.orderPhasesService.updateStatus(
      id,
      updateOrderPhaseStatusDto.status,
    );
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post(':id/upload-img-proof')
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async uploadImgProof(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<{ path: string }> {
    return await this.orderPhasesService.uploadImgProof(id, file);
  }
}
