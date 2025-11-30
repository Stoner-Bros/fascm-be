import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRejectReason1764497870324 implements MigrationInterface {
  name = 'AddRejectReason1764497870324';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "reason" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP COLUMN "reason"`,
    );
  }
}
