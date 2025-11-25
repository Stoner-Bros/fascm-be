import { NestFactory } from '@nestjs/core';
import { RoleSeedService } from './role/role-seed.service';
import { SeedModule } from './seed.module';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { WarehouseSeedService } from './warehouse/warehouse-seed.service';
import { AreaSeedService } from './area/area-seed.service';
import { CategorySeedService } from './category/category-seed.service';
import { ProductSeedService } from './product/product-seed.service';
import { TruckSeedService } from './truck/truck-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);
  // Core entities
  await app.get(WarehouseSeedService).run();
  await app.get(AreaSeedService).run(); // depends on warehouse
  await app.get(CategorySeedService).run();
  await app.get(ProductSeedService).run(); // depends on category
  await app.get(TruckSeedService).run();

  // run seeds in dependency order
  await app.get(RoleSeedService).run();
  await app.get(StatusSeedService).run();
  await app.get(UserSeedService).run();

  await app.close();
};

void runSeed();
