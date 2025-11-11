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
import { IoTDevicesService } from './io-t-devices.service';
import { CreateIoTDeviceDto } from './dto/create-io-t-device.dto';
import { UpdateIoTDeviceDto } from './dto/update-io-t-device.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IoTDevice } from './domain/io-t-device';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllIoTDevicesDto } from './dto/find-all-io-t-devices.dto';

@ApiTags('Iotdevices')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'io-t-devices',
  version: '1',
})
export class IoTDevicesController {
  constructor(private readonly ioTDevicesService: IoTDevicesService) {}

  @Post()
  @ApiCreatedResponse({
    type: IoTDevice,
  })
  create(@Body() createIoTDeviceDto: CreateIoTDeviceDto) {
    return this.ioTDevicesService.create(createIoTDeviceDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(IoTDevice),
  })
  async findAll(
    @Query() query: FindAllIoTDevicesDto,
  ): Promise<InfinityPaginationResponseDto<IoTDevice>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.ioTDevicesService.findAllWithPagination({
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
    type: IoTDevice,
  })
  findById(@Param('id') id: string) {
    return this.ioTDevicesService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: IoTDevice,
  })
  update(
    @Param('id') id: string,
    @Body() updateIoTDeviceDto: UpdateIoTDeviceDto,
  ) {
    return this.ioTDevicesService.update(id, updateIoTDeviceDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.ioTDevicesService.remove(id);
  }
}
