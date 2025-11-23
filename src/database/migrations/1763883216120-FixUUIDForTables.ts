import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUUIDForTables1763883216120 implements MigrationInterface {
  name = 'FixUUIDForTables1763883216120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_745e205298d9b9aad2b6babdabf"`,
    );
    await queryRunner.query(`ALTER TABLE "io_t_device" DROP COLUMN "truckId"`);
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD "truckId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_e4c43c75fae4a51b9864fca886d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck" DROP CONSTRAINT "PK_e4a8b9e596dde8251fe35bcb5f3"`,
    );
    await queryRunner.query(`ALTER TABLE "truck" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "truck" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck" ADD CONSTRAINT "PK_e4a8b9e596dde8251fe35bcb5f3" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "FK_000489cb39657d4468e05a2efe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "PK_bdb198dfa229431e045a958d145"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_schedule" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "PK_bdb198dfa229431e045a958d145" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "REL_000489cb39657d4468e05a2efe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "harvestScheduleIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "harvestScheduleIdId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "UQ_000489cb39657d4468e05a2efe2" UNIQUE ("harvestScheduleIdId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_a19664bcf5d111516340ac417d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "PK_282124f36757332d936cb3cb007"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_detail" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "PK_282124f36757332d936cb3cb007" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "FK_7a74104bdff508fcd00f404905d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "PK_c80e4a1f547af589dc582c91181"`,
    );
    await queryRunner.query(`ALTER TABLE "inbound_batch" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "PK_c80e4a1f547af589dc582c91181" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "REL_a19664bcf5d111516340ac417d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "harvestDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "harvestDetailId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "UQ_a19664bcf5d111516340ac417d2" UNIQUE ("harvestDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a0fa1b7e9023e1b117af6517fab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "PK_b443043aec8fa5b21d43f7fd9b7"`,
    );
    await queryRunner.query(`ALTER TABLE "import_ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "PK_b443043aec8fa5b21d43f7fd9b7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "REL_7a74104bdff508fcd00f404905"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP COLUMN "inboundBatchId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "inboundBatchId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "UQ_7a74104bdff508fcd00f404905d" UNIQUE ("inboundBatchId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "PK_fb6cecd255dd8225feef422eb85"`,
    );
    await queryRunner.query(`ALTER TABLE "export_ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "PK_fb6cecd255dd8225feef422eb85" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP COLUMN "truckId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD "truckId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "truckId"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "truckId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "harvestScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "harvestScheduleId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "importTicketId"`);
    await queryRunner.query(
      `ALTER TABLE "batch" ADD "importTicketId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_745e205298d9b9aad2b6babdabf" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "FK_000489cb39657d4468e05a2efe2" FOREIGN KEY ("harvestScheduleIdId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_a19664bcf5d111516340ac417d2" FOREIGN KEY ("harvestDetailId") REFERENCES "harvest_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "FK_7a74104bdff508fcd00f404905d" FOREIGN KEY ("inboundBatchId") REFERENCES "inbound_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_e4c43c75fae4a51b9864fca886d" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a0fa1b7e9023e1b117af6517fab" FOREIGN KEY ("importTicketId") REFERENCES "import_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a0fa1b7e9023e1b117af6517fab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_e4c43c75fae4a51b9864fca886d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "FK_7a74104bdff508fcd00f404905d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_a19664bcf5d111516340ac417d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "FK_000489cb39657d4468e05a2efe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_745e205298d9b9aad2b6babdabf"`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "importTicketId"`);
    await queryRunner.query(`ALTER TABLE "batch" ADD "importTicketId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "harvestScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "harvestScheduleId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "truckId"`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "truckId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP COLUMN "truckId"`,
    );
    await queryRunner.query(`ALTER TABLE "delivery_staff" ADD "truckId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "PK_fb6cecd255dd8225feef422eb85"`,
    );
    await queryRunner.query(`ALTER TABLE "export_ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "PK_fb6cecd255dd8225feef422eb85" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "UQ_7a74104bdff508fcd00f404905d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP COLUMN "inboundBatchId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "inboundBatchId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "REL_7a74104bdff508fcd00f404905" UNIQUE ("inboundBatchId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "PK_b443043aec8fa5b21d43f7fd9b7"`,
    );
    await queryRunner.query(`ALTER TABLE "import_ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "PK_b443043aec8fa5b21d43f7fd9b7" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a0fa1b7e9023e1b117af6517fab" FOREIGN KEY ("importTicketId") REFERENCES "import_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "UQ_a19664bcf5d111516340ac417d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "harvestDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "harvestDetailId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "REL_a19664bcf5d111516340ac417d" UNIQUE ("harvestDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "PK_c80e4a1f547af589dc582c91181"`,
    );
    await queryRunner.query(`ALTER TABLE "inbound_batch" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "PK_c80e4a1f547af589dc582c91181" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "FK_7a74104bdff508fcd00f404905d" FOREIGN KEY ("inboundBatchId") REFERENCES "inbound_batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "PK_282124f36757332d936cb3cb007"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_detail" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "PK_282124f36757332d936cb3cb007" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_a19664bcf5d111516340ac417d2" FOREIGN KEY ("harvestDetailId") REFERENCES "harvest_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "UQ_000489cb39657d4468e05a2efe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "harvestScheduleIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "harvestScheduleIdId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "REL_000489cb39657d4468e05a2efe" UNIQUE ("harvestScheduleIdId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "PK_bdb198dfa229431e045a958d145"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_schedule" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "PK_bdb198dfa229431e045a958d145" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "FK_000489cb39657d4468e05a2efe2" FOREIGN KEY ("harvestScheduleIdId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck" DROP CONSTRAINT "PK_e4a8b9e596dde8251fe35bcb5f3"`,
    );
    await queryRunner.query(`ALTER TABLE "truck" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "truck" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck" ADD CONSTRAINT "PK_e4a8b9e596dde8251fe35bcb5f3" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_e4c43c75fae4a51b9864fca886d" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "io_t_device" DROP COLUMN "truckId"`);
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD "truckId" uuid NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_745e205298d9b9aad2b6babdabf" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
