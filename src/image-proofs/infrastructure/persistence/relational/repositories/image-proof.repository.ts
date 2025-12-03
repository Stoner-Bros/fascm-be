import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ImageProofEntity } from '../entities/image-proof.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { ImageProof } from '../../../../domain/image-proof';
import { ImageProofRepository } from '../../image-proof.repository';
import { ImageProofMapper } from '../mappers/image-proof.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class ImageProofRelationalRepository implements ImageProofRepository {
  constructor(
    @InjectRepository(ImageProofEntity)
    private readonly imageProofRepository: Repository<ImageProofEntity>,
  ) {}

  async create(data: ImageProof): Promise<ImageProof> {
    const persistenceModel = ImageProofMapper.toPersistence(data);
    const newEntity = await this.imageProofRepository.save(
      this.imageProofRepository.create(persistenceModel),
    );
    return ImageProofMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImageProof[]> {
    const entities = await this.imageProofRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => ImageProofMapper.toDomain(entity));
  }

  async findById(id: ImageProof['id']): Promise<NullableType<ImageProof>> {
    const entity = await this.imageProofRepository.findOne({
      where: { id },
    });

    return entity ? ImageProofMapper.toDomain(entity) : null;
  }

  async findByIds(ids: ImageProof['id'][]): Promise<ImageProof[]> {
    const entities = await this.imageProofRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => ImageProofMapper.toDomain(entity));
  }

  async update(
    id: ImageProof['id'],
    payload: Partial<ImageProof>,
  ): Promise<ImageProof> {
    const entity = await this.imageProofRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.imageProofRepository.save(
      this.imageProofRepository.create(
        ImageProofMapper.toPersistence({
          ...ImageProofMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return ImageProofMapper.toDomain(updatedEntity);
  }

  async remove(id: ImageProof['id']): Promise<void> {
    await this.imageProofRepository.delete(id);
  }
}
