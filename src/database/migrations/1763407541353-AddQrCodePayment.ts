import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQrCodePayment1763407541353 implements MigrationInterface {
  name = 'AddQrCodePayment1763407541353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "qrCode" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "qrCode"`);
  }
}
