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
import { ImageProofsService } from './image-proofs.service';
import { CreateImageProofDto } from './dto/create-image-proof.dto';
import { UpdateImageProofDto } from './dto/update-image-proof.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ImageProof } from './domain/image-proof';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllImageProofsDto } from './dto/find-all-image-proofs.dto';

@ApiTags('Imageproofs')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'image-proofs',
  version: '1',
})
export class ImageProofsController {
  constructor(private readonly imageProofsService: ImageProofsService) {}

  @Post()
  @ApiCreatedResponse({
    type: ImageProof,
  })
  create(@Body() createImageProofDto: CreateImageProofDto) {
    return this.imageProofsService.create(createImageProofDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(ImageProof),
  })
  async findAll(
    @Query() query: FindAllImageProofsDto,
  ): Promise<InfinityPaginationResponseDto<ImageProof>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.imageProofsService.findAllWithPagination({
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
    type: ImageProof,
  })
  findById(@Param('id') id: string) {
    return this.imageProofsService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: ImageProof,
  })
  update(
    @Param('id') id: string,
    @Body() updateImageProofDto: UpdateImageProofDto,
  ) {
    return this.imageProofsService.update(id, updateImageProofDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.imageProofsService.remove(id);
  }
}
