import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterAreaFlow1764691947249 implements MigrationInterface {
  name = 'AlterAreaFlow1764691947249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "volumne"`);
    await queryRunner.query(
      `ALTER TABLE "area" ADD "availableCapacity" integer`,
    );
    await queryRunner.query(`ALTER TABLE "area" ADD "capacity" integer`);
    await queryRunner.query(
      `ALTER TABLE "area_setting" ADD "minCapacity" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "area_setting" DROP COLUMN "minCapacity"`,
    );
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "capacity"`);
    await queryRunner.query(
      `ALTER TABLE "area" DROP COLUMN "availableCapacity"`,
    );
    await queryRunner.query(`ALTER TABLE "area" ADD "volumne" integer`);
  }
}
