import { IoTDevicesModule } from '../io-t-devices/io-t-devices.module';
import {
  // do not remove this comment
  Module,
  forwardRef,
} from '@nestjs/common';
import { TrucksService } from './trucks.service';
import { TrucksController } from './trucks.controller';
import { RelationalTruckPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    forwardRef(() => IoTDevicesModule),

    // do not remove this comment
    RelationalTruckPersistenceModule,
  ],
  controllers: [TrucksController],
  providers: [TrucksService],
  exports: [TrucksService, RelationalTruckPersistenceModule],
})
export class TrucksModule {}
