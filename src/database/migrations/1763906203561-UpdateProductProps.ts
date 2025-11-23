import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateProductProps1763906203561 implements MigrationInterface {
  name = 'UpdateProductProps1763906203561';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "storageHumidityRange"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "storageTemperatureRange"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "minStorageHumidity" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "maxStorageHumidity" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "minStorageTemperature" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "maxStorageTemperature" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "maxStorageTemperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "minStorageTemperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "maxStorageHumidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "minStorageHumidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "storageTemperatureRange" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "storageHumidityRange" character varying`,
    );
  }
}
