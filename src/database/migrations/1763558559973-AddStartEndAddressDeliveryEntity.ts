import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddStartEndAddressDeliveryEntity1763558559973
  implements MigrationInterface
{
  name = 'AddStartEndAddressDeliveryEntity1763558559973';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "delivery" ADD "endLng" integer`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "endLat" integer`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "startLng" integer`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "startLat" integer`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "endAddress" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "startAddress" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentCode"`);
    await queryRunner.query(`ALTER TABLE "payment" ADD "paymentCode" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentCode"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentCode" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "startAddress"`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endAddress"`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "startLat"`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "startLng"`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endLat"`);
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "endLng"`);
  }
}
