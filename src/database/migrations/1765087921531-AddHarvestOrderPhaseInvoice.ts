import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHarvestOrderPhaseInvoice1765087921531
  implements MigrationInterface
{
  name = 'AddHarvestOrderPhaseInvoice1765087921531';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" RENAME COLUMN "orderDetailId" TO "exportTicketId"`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_phase" ("description" character varying, "status" character varying, "phaseNumber" integer, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderScheduleId" character varying, CONSTRAINT "PK_66edfde1a28af726d91c202f7f4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_invoice" ("totalPayment" integer, "totalAmount" integer, "quantity" integer, "unit" character varying, "vatAmount" integer, "taxRate" integer, "invoiceNumber" integer, "invoiceUrl" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderPhaseId" uuid, CONSTRAINT "REL_9505f253cbc25eecb2ead6e7c9" UNIQUE ("orderPhaseId"), CONSTRAINT "PK_93ce10e74111c24405be0726bfd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "order_invoice_detail" ("amount" integer, "taxRate" integer, "unitPrice" integer, "quantity" integer, "unit" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "exportTicketId" character varying, "productId" character varying, "orderInvoiceId" uuid, CONSTRAINT "REL_d3859e5b0dcd097b7066746762" UNIQUE ("exportTicketId"), CONSTRAINT "REL_c11bb45f88d27ab8e14bc2818d" UNIQUE ("productId"), CONSTRAINT "PK_2227ef9b4714645d596547c4e80" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest_phase" ("description" character varying, "status" character varying, "phaseNumber" integer, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "harvestScheduleId" character varying, CONSTRAINT "PK_5f190d9e6f5b732ff0cd4fc9de2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest_invoice" ("totalPayment" integer, "totalAmount" integer, "quantity" integer, "unit" character varying, "vatAmount" integer, "taxRate" integer, "accountNumber" character varying, "paymentStatus" character varying, "paymentMethod" character varying, "invoiceNumber" integer, "invoiceUrl" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "harvestPhaseId" uuid, CONSTRAINT "REL_6cf790c8e901e288a224602287" UNIQUE ("harvestPhaseId"), CONSTRAINT "PK_ebc539db5dd89b7baf0278ee61f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "harvest_invoice_detail" ("amount" integer, "taxRate" integer, "unitPrice" integer, "quantity" integer, "unit" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" character varying, "harvestInvoiceId" uuid, CONSTRAINT "REL_d95dcb4c1d8490999e5fd54a3c" UNIQUE ("productId"), CONSTRAINT "PK_e66e8bc0dd88757ef3f76a3aafa" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "numberOfBatch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "ExportDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP CONSTRAINT "UQ_7a76f614c2db456e7ca3542f24f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "orderDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP COLUMN "numberOfBatch"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP CONSTRAINT "UQ_7a74104bdff508fcd00f404905d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP COLUMN "inboundBatchId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "UQ_a19664bcf5d111516340ac417d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "harvestDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "unit" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "quantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "exportDate" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "unit" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "quantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "expiredAt" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "importTicketId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "UQ_26fe60ce144d4c8af120471f35e" UNIQUE ("importTicketId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "harvestInvoiceDetailId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "UQ_76cd10b1a926f5ccfa2413473af" UNIQUE ("harvestInvoiceDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_phase" ADD CONSTRAINT "FK_f3f681cb814fb7542e1c100a5a0" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice" ADD CONSTRAINT "FK_9505f253cbc25eecb2ead6e7c9e" FOREIGN KEY ("orderPhaseId") REFERENCES "order_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD CONSTRAINT "FK_d3859e5b0dcd097b70667467628" FOREIGN KEY ("exportTicketId") REFERENCES "export_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD CONSTRAINT "FK_c11bb45f88d27ab8e14bc2818d3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD CONSTRAINT "FK_28369d2589bb8510c19dca6a617" FOREIGN KEY ("orderInvoiceId") REFERENCES "order_invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_phase" ADD CONSTRAINT "FK_01bac7076fbc0e11ef2834437b7" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice" ADD CONSTRAINT "FK_6cf790c8e901e288a2246022871" FOREIGN KEY ("harvestPhaseId") REFERENCES "harvest_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" ADD CONSTRAINT "FK_d95dcb4c1d8490999e5fd54a3ce" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" ADD CONSTRAINT "FK_e8f6179e118a4d8504dbf24dbda" FOREIGN KEY ("harvestInvoiceId") REFERENCES "harvest_invoice"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_26fe60ce144d4c8af120471f35e" FOREIGN KEY ("importTicketId") REFERENCES "import_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "FK_76cd10b1a926f5ccfa2413473af" FOREIGN KEY ("harvestInvoiceDetailId") REFERENCES "harvest_invoice_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_7ac96c8300a24e9150718424c28" FOREIGN KEY ("exportTicketId") REFERENCES "export_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_7ac96c8300a24e9150718424c28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_76cd10b1a926f5ccfa2413473af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "FK_26fe60ce144d4c8af120471f35e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" DROP CONSTRAINT "FK_e8f6179e118a4d8504dbf24dbda"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" DROP CONSTRAINT "FK_d95dcb4c1d8490999e5fd54a3ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice" DROP CONSTRAINT "FK_6cf790c8e901e288a2246022871"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_phase" DROP CONSTRAINT "FK_01bac7076fbc0e11ef2834437b7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP CONSTRAINT "FK_28369d2589bb8510c19dca6a617"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP CONSTRAINT "FK_c11bb45f88d27ab8e14bc2818d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP CONSTRAINT "FK_d3859e5b0dcd097b70667467628"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice" DROP CONSTRAINT "FK_9505f253cbc25eecb2ead6e7c9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_phase" DROP CONSTRAINT "FK_f3f681cb814fb7542e1c100a5a0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "UQ_76cd10b1a926f5ccfa2413473af"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "harvestInvoiceDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP CONSTRAINT "UQ_26fe60ce144d4c8af120471f35e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" DROP COLUMN "importTicketId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP COLUMN "expiredAt"`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(`ALTER TABLE "import_ticket" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "exportDate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(`ALTER TABLE "export_ticket" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "harvestDetailId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD CONSTRAINT "UQ_a19664bcf5d111516340ac417d2" UNIQUE ("harvestDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "inbound_batch" ADD "productId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "inboundBatchId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD CONSTRAINT "UQ_7a74104bdff508fcd00f404905d" UNIQUE ("inboundBatchId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "import_ticket" ADD "numberOfBatch" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "orderDetailId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD CONSTRAINT "UQ_7a76f614c2db456e7ca3542f24f" UNIQUE ("orderDetailId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "ExportDate" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "export_ticket" ADD "numberOfBatch" integer`,
    );
    await queryRunner.query(`DROP TABLE "harvest_invoice_detail"`);
    await queryRunner.query(`DROP TABLE "harvest_invoice"`);
    await queryRunner.query(`DROP TABLE "harvest_phase"`);
    await queryRunner.query(`DROP TABLE "order_invoice_detail"`);
    await queryRunner.query(`DROP TABLE "order_invoice"`);
    await queryRunner.query(`DROP TABLE "order_phase"`);
    await queryRunner.query(
      `ALTER TABLE "batch" RENAME COLUMN "exportTicketId" TO "orderDetailId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_a64a28e0243a97ddf6a1ce4f5bd" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
  }
}
