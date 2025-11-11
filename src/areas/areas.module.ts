import { IoTDevicesModule } from '../io-t-devices/io-t-devices.module';
import { WarehousesModule } from '../warehouses/warehouses.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { AreasService } from './areas.service';
import { AreasController } from './areas.controller';
import { RelationalAreaPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => IoTDevicesModule),

    WarehousesModule,

    // do not remove this comment
    RelationalAreaPersistenceModule,
  ],
  controllers: [AreasController],
  providers: [AreasService],
  exports: [AreasService, RelationalAreaPersistenceModule],
})
export class AreasModule {}
