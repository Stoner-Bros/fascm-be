import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorTruckStatus1764762465097 implements MigrationInterface {
  name = 'RefactorTruckStatus1764762465097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "truck" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."truck_status_enum" AS ENUM('available', 'unavailable', 'maintenance', 'in_use')`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck" ADD "status" "public"."truck_status_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "truck" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."truck_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "truck" ADD "status" character varying`,
    );
  }
}
