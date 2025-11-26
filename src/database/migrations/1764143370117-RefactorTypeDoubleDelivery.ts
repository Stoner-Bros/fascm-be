import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorTypeDoubleDelivery1764143370117
  implements MigrationInterface
{
  name = 'RefactorTypeDoubleDelivery1764143370117';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endLng"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "endLng" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endLat"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "endLat" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "startLng"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "startLng" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "startLat"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "startLat" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "startLat"`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "startLat" integer`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "startLng"`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "startLng" integer`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endLat"`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "endLat" integer`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endLng"`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "endLng" integer`);
  }
}
