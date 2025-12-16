import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Import entities for statistics
import { OrderEntity } from '../orders/infrastructure/persistence/relational/entities/order.entity';
import { OrderDetailEntity } from '../order-details/infrastructure/persistence/relational/entities/order-detail.entity';
import { OrderScheduleEntity } from '../order-schedules/infrastructure/persistence/relational/entities/order-schedule.entity';
import { OrderPhaseEntity } from '../order-phases/infrastructure/persistence/relational/entities/order-phase.entity';
import { OrderInvoiceEntity } from '../order-invoices/infrastructure/persistence/relational/entities/order-invoice.entity';
import { HarvestScheduleEntity } from '../harvest-schedules/infrastructure/persistence/relational/entities/harvest-schedule.entity';
import { HarvestTicketEntity } from '../harvest-tickets/infrastructure/persistence/relational/entities/harvest-ticket.entity';
import { HarvestDetailEntity } from '../harvest-details/infrastructure/persistence/relational/entities/harvest-detail.entity';
import { HarvestPhaseEntity } from '../harvest-phases/infrastructure/persistence/relational/entities/harvest-phase.entity';
import { HarvestInvoiceEntity } from '../harvest-invoices/infrastructure/persistence/relational/entities/harvest-invoice.entity';
import { BatchEntity } from '../batches/infrastructure/persistence/relational/entities/batch.entity';
import { DeliveryEntity } from '../deliveries/infrastructure/persistence/relational/entities/delivery.entity';
import { DebtEntity } from '../debts/infrastructure/persistence/relational/entities/debt.entity';
import { PaymentEntity } from '../payments/infrastructure/persistence/relational/entities/payment.entity';
import { ProductEntity } from '../products/infrastructure/persistence/relational/entities/product.entity';
import { CategoryEntity } from '../categories/infrastructure/persistence/relational/entities/category.entity';
import { SupplierEntity } from '../suppliers/infrastructure/persistence/relational/entities/supplier.entity';
import { ConsigneeEntity } from '../consignees/infrastructure/persistence/relational/entities/consignee.entity';
import { WarehouseEntity } from '../warehouses/infrastructure/persistence/relational/entities/warehouse.entity';
import { AreaEntity } from '../areas/infrastructure/persistence/relational/entities/area.entity';
import { TruckEntity } from '../trucks/infrastructure/persistence/relational/entities/truck.entity';
import { ImportTicketEntity } from '../import-tickets/infrastructure/persistence/relational/entities/import-ticket.entity';
import { ExportTicketEntity } from '../export-tickets/infrastructure/persistence/relational/entities/export-ticket.entity';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrderEntity,
      OrderDetailEntity,
      OrderScheduleEntity,
      OrderPhaseEntity,
      OrderInvoiceEntity,
      HarvestScheduleEntity,
      HarvestTicketEntity,
      HarvestDetailEntity,
      HarvestPhaseEntity,
      HarvestInvoiceEntity,
      BatchEntity,
      DeliveryEntity,
      DebtEntity,
      PaymentEntity,
      ProductEntity,
      CategoryEntity,
      SupplierEntity,
      ConsigneeEntity,
      WarehouseEntity,
      AreaEntity,
      TruckEntity,
      ImportTicketEntity,
      ExportTicketEntity,
    ]),
  ],
  controllers: [StatisticsController],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
