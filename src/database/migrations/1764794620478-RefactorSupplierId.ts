import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorSupplierId1764794620478 implements MigrationInterface {
  name = 'RefactorSupplierId1764794620478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" DROP CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828"`,
    );
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "supplierIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "supplierIdId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb" FOREIGN KEY ("supplierIdId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "supplierIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "supplierIdId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" DROP CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828"`,
    );
    await queryRunner.query(`ALTER TABLE "supplier" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "supplier" ADD CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb" FOREIGN KEY ("supplierIdId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
