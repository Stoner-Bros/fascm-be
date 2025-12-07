import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorSomeTable1765079776378 implements MigrationInterface {
  name = 'RefactorSomeTable1765079776378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "area_setting" RENAME COLUMN "minCapacity" TO "minStock"`,
    );
    await queryRunner.query(
      `CREATE TABLE "price" ("price" integer, "quantity" integer, "unit" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productId" character varying NOT NULL, CONSTRAINT "PK_d163e55e8cce6908b2e0f27cea4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "area" DROP COLUMN "availableCapacity"`,
    );
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "capacity"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "englishName"`);
    await queryRunner.query(
      `ALTER TABLE "category" DROP COLUMN "vietnameseName"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pricePerKg"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryIdId"`);
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "minStorageHumidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "maxStorageHumidity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "minStorageTemperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP COLUMN "maxStorageTemperature"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" DROP COLUMN "truckId"`,
    );
    await queryRunner.query(`ALTER TABLE "area" ADD "unit" character varying`);
    await queryRunner.query(`ALTER TABLE "area" ADD "quantity" integer`);
    await queryRunner.query(
      `ALTER TABLE "area" ADD "status" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "name" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "categoryId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" ADD CONSTRAINT "FK_47d081ba217e201d4245e9d76d0" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_ff0c0301a95e517153df97f6812"`,
    );
    await queryRunner.query(
      `ALTER TABLE "price" DROP CONSTRAINT "FK_47d081ba217e201d4245e9d76d0"`,
    );
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "categoryId"`);
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "area" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD "truckId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "maxStorageTemperature" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "minStorageTemperature" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "maxStorageHumidity" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "minStorageHumidity" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "categoryIdId" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "product" ADD "pricePerKg" integer`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD "vietnameseName" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD "englishName" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "area" ADD "capacity" integer`);
    await queryRunner.query(
      `ALTER TABLE "area" ADD "availableCapacity" integer`,
    );
    await queryRunner.query(`DROP TABLE "price"`);
    await queryRunner.query(
      `ALTER TABLE "area_setting" RENAME COLUMN "minStock" TO "minCapacity"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery_staff" ADD CONSTRAINT "FK_c5699fe66cab9e7e4aaca2468f5" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
