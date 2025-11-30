import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnumStatusSchedule1764474052657 implements MigrationInterface {
  name = 'AddEnumStatusSchedule1764474052657';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."order_schedule_status_enum" RENAME TO "order_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_schedule_status_enum" AS ENUM('pending', 'rejected', 'preparing', 'delivering', 'delivered', 'completed', 'canceled', 'approved')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ALTER COLUMN "status" TYPE "public"."order_schedule_status_enum" USING "status"::"text"::"public"."order_schedule_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."order_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."harvest_schedule_status_enum" RENAME TO "harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum" AS ENUM('pending', 'rejected', 'preparing', 'delivering', 'delivered', 'completed', 'canceled', 'approved')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ALTER COLUMN "status" TYPE "public"."harvest_schedule_status_enum" USING "status"::"text"::"public"."harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."harvest_schedule_status_enum_old"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum_old" AS ENUM('pending', 'rejected', 'preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ALTER COLUMN "status" TYPE "public"."harvest_schedule_status_enum_old" USING "status"::"text"::"public"."harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."harvest_schedule_status_enum_old" RENAME TO "harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_schedule_status_enum_old" AS ENUM('pending', 'rejected', 'preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ALTER COLUMN "status" TYPE "public"."order_schedule_status_enum_old" USING "status"::"text"::"public"."order_schedule_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_schedule_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."order_schedule_status_enum_old" RENAME TO "order_schedule_status_enum"`,
    );
  }
}
