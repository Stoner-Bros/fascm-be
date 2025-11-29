import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnumStatus1764398453405 implements MigrationInterface {
  name = 'AddEnumStatus1764398453405';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_schedule" DROP COLUMN "status"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_schedule_status_enum" AS ENUM('pending', 'rejected', 'preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "status" "public"."order_schedule_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."harvest_schedule_status_enum" RENAME TO "harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum" AS ENUM('pending', 'rejected', 'preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ALTER COLUMN "status" TYPE "public"."harvest_schedule_status_enum" USING "status"::"text"::"public"."harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."delivery_status_enum" AS ENUM('scheduled', 'delivering', 'completed', 'cancelled', 'delayed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "status" "public"."delivery_status_enum"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "delivery" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."delivery_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "status" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum_old" AS ENUM('pending', 'approved', 'rejected', 'canceled', 'completed')`,
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
      `ALTER TABLE "order_schedule" DROP COLUMN "status"`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_schedule_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ADD "status" character varying`,
    );
  }
}
