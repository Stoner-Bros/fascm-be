import { Module } from '@nestjs/common';
import { IoTDeviceRepository } from '../io-t-device.repository';
import { IoTDeviceRelationalRepository } from './repositories/io-t-device.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IoTDeviceEntity } from './entities/io-t-device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IoTDeviceEntity])],
  providers: [
    {
      provide: IoTDeviceRepository,
      useClass: IoTDeviceRelationalRepository,
    },
  ],
  exports: [IoTDeviceRepository],
})
export class RelationalIoTDevicePersistenceModule {}
