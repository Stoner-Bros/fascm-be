import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdjustPaymentCodeType1765367814330 implements MigrationInterface {
  name = 'AdjustPaymentCodeType1765367814330';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentCode"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentCode" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentCode"`);
    await queryRunner.query(`ALTER TABLE "payment" ADD "paymentCode" integer`);
  }
}
