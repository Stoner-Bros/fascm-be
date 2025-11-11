import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1762861511978 implements MigrationInterface {
  name = 'InitDb1762861511978';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "warehouse" ("address" character varying, "name" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_965abf9f99ae8c5983ae74ebde8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "supplier" ("contact" character varying, "taxCode" character varying, "address" character varying, "certificate" character varying, "qrCode" character varying, "gardenName" character varying NOT NULL, "representativeName" character varying NOT NULL, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, CONSTRAINT "REL_e8902c50550ff82dd0143913c0" UNIQUE ("userId"), CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "area" ("description" character varying, "volumne" integer, "location" character varying, "name" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "warehouseId" uuid, CONSTRAINT "PK_39d5e4de490139d6535d75f42ff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "io_t_device" ("status" character varying, "data" character varying, "lastDataTime" TIMESTAMP, "type" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "truckId" uuid NOT NULL, "areaId" uuid NOT NULL, CONSTRAINT "PK_22d2a92d3552a3a811cb4daf3a3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "truck" ("status" character varying, "currentLocation" character varying, "model" character varying, "licensePhoto" character varying, "licensePlate" character varying, "capacity" integer, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e4a8b9e596dde8251fe35bcb5f3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("position" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "warehouseId" uuid, "userId" integer, CONSTRAINT "REL_eba76c23bcfc9dad2479b7fd2a" UNIQUE ("userId"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "category" ("englishName" character varying, "vietnameseName" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("status" character varying, "storageHumidityRange" character varying, "storageTemperatureRange" character varying, "description" character varying, "name" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryIdId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("paymentCode" character varying, "status" character varying, "amount" integer, "paymentMethod" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "consignee" ("contact" character varying, "taxCode" character varying, "address" character varying, "certificate" character varying, "qrCode" character varying, "organizationName" character varying, "representativeName" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_97554f7d3938e8f6c9a70c2278" UNIQUE ("userId"), CONSTRAINT "PK_1bfdc8f4a0d0ec362948638b2a2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_schedule" ("description" character varying, "status" character varying, "orderDate" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "consigneeId" uuid, CONSTRAINT "PK_ca57e6e027caad01866e7ba39fb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("totalVolume" integer, "totalMass" integer, "totalPayment" integer, "vatAmount" integer, "totalAmount" integer, "taxRate" integer, "orderDate" character varying, "orderUrl" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paymentId" uuid, "orderScheduleId" uuid, CONSTRAINT "REL_9ad13532f48db4ac5a3b3dd70e" UNIQUE ("paymentId"), CONSTRAINT "REL_7726ec3e023740016c5daf936e" UNIQUE ("orderScheduleId"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_detail" ("taxRate" integer, "amount" integer, "unitPrice" integer, "quantity" integer, "unit" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, "orderId" uuid, CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "warehouseId" uuid, "userId" integer, CONSTRAINT "REL_e5edf25b611a7223b1532372a8" UNIQUE ("warehouseId"), CONSTRAINT "REL_909f33eeb8724245b2f1033be1" UNIQUE ("userId"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest_schedule" ("description" character varying, "status" character varying, "harvestDate" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "supplierIdId" uuid, CONSTRAINT "PK_bdb198dfa229431e045a958d145" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest_ticket" ("date" TIMESTAMP, "quantity" integer, "unit" character varying, "totalPayment" integer, "vatAmount" integer, "totalAmount" integer, "taxRate" integer, "accountNumber" character varying, "paymentMethod" character varying, "ticketNumber" character varying, "ticketUrl" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "harvestScheduleIdId" uuid, CONSTRAINT "REL_000489cb39657d4468e05a2efe" UNIQUE ("harvestScheduleIdId"), CONSTRAINT "PK_97bbf9a8db5c522eeb1deffe531" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest_detail" ("taxRate" integer, "amount" integer, "unitPrice" integer, "quantity" integer, "unit" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, "harvestTicketId" uuid, CONSTRAINT "PK_282124f36757332d936cb3cb007" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "inbound_batch" ("quantity" integer, "unit" character varying, "batchCode" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" uuid, "harvestDetailId" uuid, CONSTRAINT "REL_a19664bcf5d111516340ac417d" UNIQUE ("harvestDetailId"), CONSTRAINT "PK_c80e4a1f547af589dc582c91181" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "import_ticket" ("numberOfBatch" integer, "percent" integer, "importDate" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "inboundBatchId" uuid, CONSTRAINT "REL_7a74104bdff508fcd00f404905" UNIQUE ("inboundBatchId"), CONSTRAINT "PK_b443043aec8fa5b21d43f7fd9b7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "export_ticket" ("numberOfBatch" integer, "ExportDate" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderDetailId" uuid, CONSTRAINT "REL_7a76f614c2db456e7ca3542f24" UNIQUE ("orderDetailId"), CONSTRAINT "PK_fb6cecd255dd8225feef422eb85" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "delivery_staff" ("licenseExpiredAt" TIMESTAMP, "licensePhoto" character varying, "licenseNumber" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "truckId" uuid, "warehouseId" uuid, "userId" integer NOT NULL, CONSTRAINT "REL_91e4fba2ec535c18f77ea2c7a7" UNIQUE ("userId"), CONSTRAINT "PK_53d8c61dd0e36e2f7c650458b6d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "delivery" ("status" character varying, "endTime" TIMESTAMP, "startTime" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "truckId" uuid, "harvestScheduleId" uuid, "orderScheduleId" uuid, CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "batch" ("volume" integer, "quantity" integer, "unit" character varying, "batchCode" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderDetailId" uuid, "areaId" uuid, "productId" uuid, "importTicketId" uuid, CONSTRAINT "PK_57da3b830b57bec1fd329dcaf43" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "area_setting" ("humidityThreshold" integer, "temperatureThreshold" integer, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaId" uuid, CONSTRAINT "REL_3ffacd7c71098a9fc6c3397c66" UNIQUE ("areaId"), CONSTRAINT "PK_4d565eb73410bebaf5f0a528e40" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "area_alert" ("status" character varying, "message" character varying, "alertType" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "areaId" uuid, CONSTRAINT "PK_0d6c725f7205d8a7a5f98c16122" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD CONSTRAINT "FK_e8902c50550ff82dd0143913c0a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "area" ADD CONSTRAINT "FK_63679a4001108cc888e0e58c621" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_745e205298d9b9aad2b6babdabf" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_0b88db2af5ae4e180af64b72c30" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_6c87d3042ea89666d41de078185" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignee" ADD CONSTRAINT "FK_97554f7d3938e8f6c9a70c22785" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD CONSTRAINT "FK_22204f34c09887946fad12e1780" FOREIGN KEY ("consigneeId") REFERENCES "consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_7726ec3e023740016c5daf936e9" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" ADD CONSTRAINT "FK_e5edf25b611a7223b1532372a85" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" ADD CONSTRAINT "FK_909f33eeb8724245b2f1033be14" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb" FOREIGN KEY ("supplierIdId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "FK_000489cb39657d4468e05a2efe2" FOREIGN KEY ("harvestScheduleIdId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "FK_f54221c41e330019bffe165c02b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "FK_3f2c21c929383fac18ff7ddd348" FOREIGN KEY ("harvestTicketId") REFERENCES "harvest_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_ac885f9ab5350daba07cf89b893" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_a19664bcf5d111516340ac417d2" FOREIGN KEY ("harvestDetailId") REFERENCES "harvest_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "FK_7a74104bdff508fcd00f404905d" FOREIGN KEY ("inboundBatchId") REFERENCES "inbound_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "FK_7a76f614c2db456e7ca3542f24f" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD CONSTRAINT "FK_db0a797866f2433887db2f2e160" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD CONSTRAINT "FK_91e4fba2ec535c18f77ea2c7a7c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_e4c43c75fae4a51b9864fca886d" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_f27fbba27eb1333f1337dbff527" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_e055d67566036da8c5977e7d274" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a0fa1b7e9023e1b117af6517fab" FOREIGN KEY ("importTicketId") REFERENCES "import_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD CONSTRAINT "FK_3ffacd7c71098a9fc6c3397c66d" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_alert" ADD CONSTRAINT "FK_352ac6fe5bf01ad5cfed6aa48da" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "area_alert" DROP CONSTRAINT "FK_352ac6fe5bf01ad5cfed6aa48da"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP CONSTRAINT "FK_3ffacd7c71098a9fc6c3397c66d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a0fa1b7e9023e1b117af6517fab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_e055d67566036da8c5977e7d274"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_f27fbba27eb1333f1337dbff527"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_e4c43c75fae4a51b9864fca886d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP CONSTRAINT "FK_91e4fba2ec535c18f77ea2c7a7c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP CONSTRAINT "FK_db0a797866f2433887db2f2e160"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "FK_7a76f614c2db456e7ca3542f24f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "FK_7a74104bdff508fcd00f404905d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_a19664bcf5d111516340ac417d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_ac885f9ab5350daba07cf89b893"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "FK_3f2c21c929383fac18ff7ddd348"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "FK_f54221c41e330019bffe165c02b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "FK_000489cb39657d4468e05a2efe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" DROP CONSTRAINT "FK_909f33eeb8724245b2f1033be14"`,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" DROP CONSTRAINT "FK_e5edf25b611a7223b1532372a85"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_7726ec3e023740016c5daf936e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP CONSTRAINT "FK_22204f34c09887946fad12e1780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignee" DROP CONSTRAINT "FK_97554f7d3938e8f6c9a70c22785"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_6c87d3042ea89666d41de078185"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_0b88db2af5ae4e180af64b72c30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_745e205298d9b9aad2b6babdabf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area" DROP CONSTRAINT "FK_63679a4001108cc888e0e58c621"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" DROP CONSTRAINT "FK_e8902c50550ff82dd0143913c0a"`,
    );
    await queryRunner.query(`DROP TABLE "area_alert"`);
    await queryRunner.query(`DROP TABLE "area_setting"`);
    await queryRunner.query(`DROP TABLE "batch"`);
    await queryRunner.query(`DROP TABLE "delivery"`);
    await queryRunner.query(`DROP TABLE "delivery_staff"`);
    await queryRunner.query(`DROP TABLE "export_ticket"`);
    await queryRunner.query(`DROP TABLE "import_ticket"`);
    await queryRunner.query(`DROP TABLE "inbound_batch"`);
    await queryRunner.query(`DROP TABLE "harvest_detail"`);
    await queryRunner.query(`DROP TABLE "harvest_ticket"`);
    await queryRunner.query(`DROP TABLE "harvest_schedule"`);
    await queryRunner.query(`DROP TABLE "manager"`);
    await queryRunner.query(`DROP TABLE "order_detail"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TABLE "order_schedule"`);
    await queryRunner.query(`DROP TABLE "consignee"`);
    await queryRunner.query(`DROP TABLE "payment"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "category"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "truck"`);
    await queryRunner.query(`DROP TABLE "io_t_device"`);
    await queryRunner.query(`DROP TABLE "area"`);
    await queryRunner.query(`DROP TABLE "supplier"`);
    await queryRunner.query(`DROP TABLE "warehouse"`);
  }
}
