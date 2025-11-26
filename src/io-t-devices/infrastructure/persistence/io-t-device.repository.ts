import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { IoTDevice } from '../../domain/io-t-device';

export abstract class IoTDeviceRepository {
  abstract create(
    data: Omit<IoTDevice, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<IoTDevice>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<IoTDevice[]>;

  abstract findById(id: IoTDevice['id']): Promise<NullableType<IoTDevice>>;

  abstract findByIds(ids: IoTDevice['id'][]): Promise<IoTDevice[]>;

  abstract update(
    id: IoTDevice['id'],
    payload: DeepPartial<IoTDevice>,
  ): Promise<IoTDevice | null>;

  abstract remove(id: IoTDevice['id']): Promise<void>;

  abstract findAreaWithDeviceId(
    deviceId: IoTDevice['id'],
  ): Promise<NullableType<string>>;
}
