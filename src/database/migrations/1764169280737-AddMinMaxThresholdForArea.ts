import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMinMaxThresholdForArea1764169280737
  implements MigrationInterface
{
  name = 'AddMinMaxThresholdForArea1764169280737';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "humidityThreshold"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "temperatureThreshold"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "minHumidity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "maxHumidity" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "minTemperature" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "maxTemperature" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "maxTemperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "minTemperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "maxHumidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "minHumidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "temperatureThreshold" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "humidityThreshold" integer`,
    );
  }
}
