import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUUIDCategory1763879072079 implements MigrationInterface {
  name = 'FixUUIDCategory1763879072079';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "FK_f54221c41e330019bffe165c02b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_ac885f9ab5350daba07cf89b893"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryIdId"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "categoryIdId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP CONSTRAINT "FK_22204f34c09887946fad12e1780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignee" DROP CONSTRAINT "PK_1bfdc8f4a0d0ec362948638b2a2"`,
    );
    await queryRunner.query(`ALTER TABLE "consignee" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "consignee" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignee" ADD CONSTRAINT "PK_1bfdc8f4a0d0ec362948638b2a2" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_7726ec3e023740016c5daf936e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_f27fbba27eb1333f1337dbff527"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP CONSTRAINT "PK_ca57e6e027caad01866e7ba39fb"`,
    );
    await queryRunner.query(`ALTER TABLE "order_schedule" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD CONSTRAINT "PK_ca57e6e027caad01866e7ba39fb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP COLUMN "consigneeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "consigneeId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "REL_7726ec3e023740016c5daf936e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "orderScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "orderScheduleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "UQ_7726ec3e023740016c5daf936e9" UNIQUE ("orderScheduleId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "FK_7a76f614c2db456e7ca3542f24f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38"`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD "productId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "orderId"`);
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD "orderId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "productId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "productId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "REL_7a76f614c2db456e7ca3542f24"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "orderDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "orderDetailId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "UQ_7a76f614c2db456e7ca3542f24f" UNIQUE ("orderDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "orderScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "orderScheduleId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "orderDetailId"`);
    await queryRunner.query(
      `ALTER TABLE "batch" ADD "orderDetailId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "productId"`);
    await queryRunner.query(
      `ALTER TABLE "batch" ADD "productId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD CONSTRAINT "FK_22204f34c09887946fad12e1780" FOREIGN KEY ("consigneeId") REFERENCES "consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "FK_f54221c41e330019bffe165c02b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_ac885f9ab5350daba07cf89b893" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "FK_7a76f614c2db456e7ca3542f24f" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_f27fbba27eb1333f1337dbff527" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_f27fbba27eb1333f1337dbff527"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "FK_7a76f614c2db456e7ca3542f24f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_ac885f9ab5350daba07cf89b893"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "FK_f54221c41e330019bffe165c02b"`,
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
      `ALTER TABLE "order_schedule" DROP CONSTRAINT "FK_22204f34c09887946fad12e1780"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "productId"`);
    await queryRunner.query(`ALTER TABLE "batch" ADD "productId" uuid`);
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "orderDetailId"`);
    await queryRunner.query(`ALTER TABLE "batch" ADD "orderDetailId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "orderScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "orderScheduleId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "UQ_7a76f614c2db456e7ca3542f24f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "orderDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "orderDetailId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "REL_7a76f614c2db456e7ca3542f24" UNIQUE ("orderDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "productId"`,
    );
    await queryRunner.query(`ALTER TABLE "inbound_batch" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "productId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "orderId"`);
    await queryRunner.query(`ALTER TABLE "order_detail" ADD "orderId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP COLUMN "productId"`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" ADD "productId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38"`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "PK_0afbab1fa98e2fb0be8e74f6b38" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "FK_7a76f614c2db456e7ca3542f24f" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "UQ_7726ec3e023740016c5daf936e9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP COLUMN "orderScheduleId"`,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "orderScheduleId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "REL_7726ec3e023740016c5daf936e" UNIQUE ("orderScheduleId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "PK_1031171c13130102495201e3e20"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_88850b85b38a8a2ded17a1f5369" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP COLUMN "consigneeId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "consigneeId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP CONSTRAINT "PK_ca57e6e027caad01866e7ba39fb"`,
    );
    await queryRunner.query(`ALTER TABLE "order_schedule" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD CONSTRAINT "PK_ca57e6e027caad01866e7ba39fb" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_f27fbba27eb1333f1337dbff527" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_7726ec3e023740016c5daf936e9" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignee" DROP CONSTRAINT "PK_1bfdc8f4a0d0ec362948638b2a2"`,
    );
    await queryRunner.query(`ALTER TABLE "consignee" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "consignee" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "consignee" ADD CONSTRAINT "PK_1bfdc8f4a0d0ec362948638b2a2" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD CONSTRAINT "FK_22204f34c09887946fad12e1780" FOREIGN KEY ("consigneeId") REFERENCES "consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryIdId"`);
    await queryRunner.query(`ALTER TABLE "product" ADD "categoryIdId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "PK_bebc9158e480b949565b4dc7a82"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_1831dd6f3aaf6cb365dab51c29e" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD CONSTRAINT "FK_a3647bd11aed3cf968c9ce9b835" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_ac885f9ab5350daba07cf89b893" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "FK_f54221c41e330019bffe165c02b" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
