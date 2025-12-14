import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorBatch1765702277786 implements MigrationInterface {
  name = 'RefactorBatch1765702277786';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "batch" DROP CONSTRAINT "FK_7ac96c8300a24e9150718424c28"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_47d081ba217e201d4245e9d76d0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" RENAME COLUMN "productId" TO "batchId"`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "volume"`);
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "exportTicketId"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "unitPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP COLUMN "unitPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail" DROP COLUMN "unitPrice"`,
    );
    await queryRunner.query(`ALTER TABLE "batch" ADD "costPrice" integer`);
    await queryRunner.query(
      `ALTER TABLE "batch" ADD "currentQuantity" integer`,
    );
    await queryRunner.query(`ALTER TABLE "batch" ADD "expiredAt" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "finalUnitPrice" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "expectedUnitPrice" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD "quantity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD "unitPrice" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD "unit" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD "exportTicketId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "batchId"`);
    await queryRunner.query(`ALTER TABLE "price" ADD "batchId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_1b9c123e8bdec27788fb665b0cf" FOREIGN KEY ("batchId") REFERENCES "batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD CONSTRAINT "FK_1ed55cba911d06955ed8b565fa7" FOREIGN KEY ("exportTicketId") REFERENCES "export_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP CONSTRAINT "FK_1ed55cba911d06955ed8b565fa7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_1b9c123e8bdec27788fb665b0cf"`,
    );
    await queryRunner.query(`ALTER TABLE "price" DROP COLUMN "batchId"`);
    await queryRunner.query(
      `ALTER TABLE "price" ADD "batchId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP COLUMN "exportTicketId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP COLUMN "unit"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP COLUMN "unitPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP COLUMN "quantity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "expectedUnitPrice"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "finalUnitPrice"`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "expiredAt"`);
    await queryRunner.query(
      `ALTER TABLE "batch" DROP COLUMN "currentQuantity"`,
    );
    await queryRunner.query(`ALTER TABLE "batch" DROP COLUMN "costPrice"`);
    await queryRunner.query(
      `ALTER TABLE "order_detail" ADD "unitPrice" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD "unitPrice" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "unitPrice" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD "exportTicketId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "batch" ADD "volume" integer`);
    await queryRunner.query(
      `ALTER TABLE "price" RENAME COLUMN "batchId" TO "productId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_47d081ba217e201d4245e9d76d0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "batch" ADD CONSTRAINT "FK_7ac96c8300a24e9150718424c28" FOREIGN KEY ("exportTicketId") REFERENCES "export_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
