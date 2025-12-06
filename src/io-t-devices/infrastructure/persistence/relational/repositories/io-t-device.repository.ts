import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IoTDeviceEntity } from '../entities/io-t-device.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { IoTDevice } from '../../../../domain/io-t-device';
import { IoTDeviceRepository } from '../../io-t-device.repository';
import { IoTDeviceMapper } from '../mappers/io-t-device.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';
import { IoTDeviceResponse } from '../../../../dto/io-t-device-response.dto';

@Injectable()
export class IoTDeviceRelationalRepository implements IoTDeviceRepository {
  constructor(
    @InjectRepository(IoTDeviceEntity)
    private readonly ioTDeviceRepository: Repository<IoTDeviceEntity>,
  ) {}

  async create(data: IoTDevice): Promise<IoTDevice> {
    const persistenceModel = IoTDeviceMapper.toPersistence(data);
    const newEntity = await this.ioTDeviceRepository.save(
      this.ioTDeviceRepository.create(persistenceModel),
    );
    return IoTDeviceMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<IoTDeviceResponse[]> {
    const entities = await this.ioTDeviceRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      relations: ['truck', 'area'],
    });

    return entities.map((entity) => IoTDeviceMapper.toResponse(entity));
  }

  async findById(
    id: IoTDevice['id'],
  ): Promise<NullableType<IoTDeviceResponse>> {
    const entity = await this.ioTDeviceRepository.findOne({
      where: { id },
      relations: ['truck', 'area'],
    });

    return entity ? IoTDeviceMapper.toResponse(entity) : null;
  }

  async findByIds(ids: IoTDevice['id'][]): Promise<IoTDevice[]> {
    const entities = await this.ioTDeviceRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => IoTDeviceMapper.toDomain(entity));
  }

  async update(
    id: IoTDevice['id'],
    payload: Partial<IoTDevice>,
  ): Promise<IoTDevice> {
    const entity = await this.ioTDeviceRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.ioTDeviceRepository.save(
      this.ioTDeviceRepository.create(
        IoTDeviceMapper.toPersistence({
          ...IoTDeviceMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return IoTDeviceMapper.toDomain(updatedEntity);
  }

  async remove(id: IoTDevice['id']): Promise<void> {
    await this.ioTDeviceRepository.delete(id);
  }

  async findAreaWithDeviceId(
    deviceId: IoTDevice['id'],
  ): Promise<NullableType<string>> {
    const entity = await this.ioTDeviceRepository.findOne({
      where: { id: deviceId },
      relations: ['area'],
    });

    return entity && entity.area ? entity.area.id : null;
  }

  async findTruckWithDeviceId(
    deviceId: IoTDevice['id'],
  ): Promise<NullableType<string>> {
    const entity = await this.ioTDeviceRepository.findOne({
      where: { id: deviceId },
      relations: ['truck'],
    });

    return entity && entity.truck ? entity.truck.id : null;
  }
}
