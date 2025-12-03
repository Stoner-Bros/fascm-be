import { MigrationInterface, QueryRunner } from 'typeorm';

export class TruckSettingsAndAlerts1764733796493 implements MigrationInterface {
  name = 'TruckSettingsAndAlerts1764733796493';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "truck_setting" ("minHumidity" integer, "maxHumidity" integer, "minTemperature" integer, "maxTemperature" integer, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "truckId" character varying, CONSTRAINT "REL_011c156195774f56197f72e0d2" UNIQUE ("truckId"), CONSTRAINT "PK_248db219808491dfebd3053a9dc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "truck_alert" ("status" character varying, "message" character varying, "alertType" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "truckId" character varying, CONSTRAINT "PK_11b6d46ee0ff58a4ca32b338733" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck_setting" ADD CONSTRAINT "FK_011c156195774f56197f72e0d28" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck_alert" ADD CONSTRAINT "FK_1ed563e8bf6d9cb3631d1bf330b" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "truck_alert" DROP CONSTRAINT "FK_1ed563e8bf6d9cb3631d1bf330b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "truck_setting" DROP CONSTRAINT "FK_011c156195774f56197f72e0d28"`,
    );
    await queryRunner.query(`DROP TABLE "truck_alert"`);
    await queryRunner.query(`DROP TABLE "truck_setting"`);
  }
}
