import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixUUIDForDelivery1763905299688 implements MigrationInterface {
  name = 'FixUUIDForDelivery1763905299688';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0"`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0"`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id")`,
    );
  }
}
