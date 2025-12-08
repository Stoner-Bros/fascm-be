import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixProductRelationship1765212239443 implements MigrationInterface {
  name = 'FixProductRelationship1765212239443';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP CONSTRAINT "FK_c11bb45f88d27ab8e14bc2818d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP CONSTRAINT "REL_c11bb45f88d27ab8e14bc2818d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" DROP CONSTRAINT "FK_d95dcb4c1d8490999e5fd54a3ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" DROP CONSTRAINT "REL_d95dcb4c1d8490999e5fd54a3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD CONSTRAINT "FK_c11bb45f88d27ab8e14bc2818d3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" ADD CONSTRAINT "FK_d95dcb4c1d8490999e5fd54a3ce" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" DROP CONSTRAINT "FK_d95dcb4c1d8490999e5fd54a3ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" DROP CONSTRAINT "FK_c11bb45f88d27ab8e14bc2818d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" ADD CONSTRAINT "REL_d95dcb4c1d8490999e5fd54a3c" UNIQUE ("productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_invoice_detail" ADD CONSTRAINT "FK_d95dcb4c1d8490999e5fd54a3ce" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD CONSTRAINT "REL_c11bb45f88d27ab8e14bc2818d" UNIQUE ("productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice_detail" ADD CONSTRAINT "FK_c11bb45f88d27ab8e14bc2818d3" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
