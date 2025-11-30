import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAddressFieldSchedule1764481183918
  implements MigrationInterface
{
  name = 'AddAddressFieldSchedule1764481183918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "address" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "address" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "address" TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP COLUMN "address"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "address" TIMESTAMP`,
    );
  }
}
