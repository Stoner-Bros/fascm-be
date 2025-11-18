import { MigrationInterface, QueryRunner } from 'typeorm';

export class HarvestScheduleStatusMigration1763347857047
  implements MigrationInterface
{
  name = 'HarvestScheduleStatusMigration1763347857047';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum" AS ENUM('pending', 'approved', 'rejected', 'canceled', 'completed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "status" "public"."harvest_schedule_status_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "status" character varying`,
    );
  }
}
