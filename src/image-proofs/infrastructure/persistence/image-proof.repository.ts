import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { ImageProof } from '../../domain/image-proof';

export abstract class ImageProofRepository {
  abstract create(
    data: Omit<ImageProof, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<ImageProof>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<ImageProof[]>;

  abstract findById(id: ImageProof['id']): Promise<NullableType<ImageProof>>;

  abstract findByIds(ids: ImageProof['id'][]): Promise<ImageProof[]>;

  abstract update(
    id: ImageProof['id'],
    payload: DeepPartial<ImageProof>,
  ): Promise<ImageProof | null>;

  abstract remove(id: ImageProof['id']): Promise<void>;
}
