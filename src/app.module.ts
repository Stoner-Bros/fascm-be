import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import googleConfig from './auth-google/config/google.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { HeaderResolver, I18nModule } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';

const infrastructureDatabaseModule = TypeOrmModule.forRootAsync({
  useClass: TypeOrmConfigService,
  dataSourceFactory: async (options: DataSourceOptions) => {
    return new DataSource(options).initialize();
  },
});

import { SuppliersModule } from './suppliers/suppliers.module';

import { DeliveryStaffsModule } from './delivery-staffs/delivery-staffs.module';

import { HarvestSchedulesModule } from './harvest-schedules/harvest-schedules.module';

import { HarvestTicketsModule } from './harvest-tickets/harvest-tickets.module';

import { CategoriesModule } from './categories/categories.module';

import { ProductsModule } from './products/products.module';

import { HarvestDetailsModule } from './harvest-details/harvest-details.module';

import { ManagersModule } from './managers/managers.module';

import { WarehousesModule } from './warehouses/warehouses.module';

import { StaffsModule } from './staffs/staffs.module';

import { IoTDevicesModule } from './io-t-devices/io-t-devices.module';

import { AreasModule } from './areas/areas.module';

import { AreaAlertsModule } from './area-alerts/area-alerts.module';

import { AreaSettingsModule } from './area-settings/area-settings.module';

import { InboundBatchesModule } from './inbound-batches/inbound-batches.module';

import { ImportTicketsModule } from './import-tickets/import-tickets.module';

import { BatchesModule } from './batches/batches.module';

import { PaymentsModule } from './payments/payments.module';

import { ConsigneesModule } from './consignees/consignees.module';

import { OrderSchedulesModule } from './order-schedules/order-schedules.module';

import { OrdersModule } from './orders/orders.module';

import { OrderDetailsModule } from './order-details/order-details.module';

import { TrucksModule } from './trucks/trucks.module';

import { DeliveriesModule } from './deliveries/deliveries.module';

import { ExportTicketsModule } from './export-tickets/export-tickets.module';

@Module({
  imports: [
    ExportTicketsModule,
    ExportTicketsModule,
    ExportTicketsModule,
    DeliveriesModule,
    TrucksModule,
    OrderDetailsModule,
    OrdersModule,
    OrderSchedulesModule,
    ConsigneesModule,
    PaymentsModule,
    BatchesModule,
    ImportTicketsModule,
    InboundBatchesModule,
    AreaSettingsModule,
    AreaAlertsModule,
    AreasModule,
    IoTDevicesModule,
    StaffsModule,
    WarehousesModule,
    ManagersModule,
    HarvestDetailsModule,
    ProductsModule,
    CategoriesModule,
    HarvestTicketsModule,
    HarvestSchedulesModule,
    DeliveryStaffsModule,
    SuppliersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
      ],
      envFilePath: ['.env'],
    }),
    infrastructureDatabaseModule,
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthModule,
    AuthGoogleModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
