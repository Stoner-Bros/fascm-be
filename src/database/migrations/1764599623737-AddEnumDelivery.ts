import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnumDelivery1764599623737 implements MigrationInterface {
  name = 'AddEnumDelivery1764599623737';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."delivery_status_enum" RENAME TO "delivery_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."delivery_status_enum" AS ENUM('scheduled', 'delivering', 'delivered', 'returning', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "status" TYPE "public"."delivery_status_enum" USING "status"::"text"::"public"."delivery_status_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."delivery_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."delivery_status_enum_old" AS ENUM('scheduled', 'delivering', 'completed', 'cancelled', 'delayed')`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ALTER COLUMN "status" TYPE "public"."delivery_status_enum_old" USING "status"::"text"::"public"."delivery_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."delivery_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."delivery_status_enum_old" RENAME TO "delivery_status_enum"`,
    );
  }
}
