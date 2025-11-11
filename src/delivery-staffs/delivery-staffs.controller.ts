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
import { DeliveryStaffsService } from './delivery-staffs.service';
import { CreateDeliveryStaffDto } from './dto/create-delivery-staff.dto';
import { UpdateDeliveryStaffDto } from './dto/update-delivery-staff.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DeliveryStaff } from './domain/delivery-staff';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllDeliveryStaffsDto } from './dto/find-all-delivery-staffs.dto';

@ApiTags('Deliverystaffs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'delivery-staffs',
  version: '1',
})
export class DeliveryStaffsController {
  constructor(private readonly deliveryStaffsService: DeliveryStaffsService) {}

  @Post()
  @ApiCreatedResponse({
    type: DeliveryStaff,
  })
  create(@Body() createDeliveryStaffDto: CreateDeliveryStaffDto) {
    return this.deliveryStaffsService.create(createDeliveryStaffDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(DeliveryStaff),
  })
  async findAll(
    @Query() query: FindAllDeliveryStaffsDto,
  ): Promise<InfinityPaginationResponseDto<DeliveryStaff>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.deliveryStaffsService.findAllWithPagination({
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
    type: DeliveryStaff,
  })
  findById(@Param('id') id: string) {
    return this.deliveryStaffsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: DeliveryStaff,
  })
  update(
    @Param('id') id: string,
    @Body() updateDeliveryStaffDto: UpdateDeliveryStaffDto,
  ) {
    return this.deliveryStaffsService.update(id, updateDeliveryStaffDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.deliveryStaffsService.remove(id);
  }
}
