import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotification1765077191179 implements MigrationInterface {
  name = 'AddNotification1765077191179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "permission" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "feature" ("id" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_03930932f909ca4be8e33d16a2d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "role_permission" ("id" integer NOT NULL, "roleId" integer, "permissionId" integer, "featureId" integer, CONSTRAINT "PK_96c8f1fd25538d3692024115b47" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "notification" ("deletedAt" TIMESTAMP, "isRead" boolean, "type" character varying, "message" character varying, "title" character varying, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_e3130a39c1e4a740d044e685730" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" ADD CONSTRAINT "FK_b07a0ea2896be61c2bd4b34e24b" FOREIGN KEY ("featureId") REFERENCES "feature"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_b07a0ea2896be61c2bd4b34e24b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_72e80be86cab0e93e67ed1a7a9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "role_permission" DROP CONSTRAINT "FK_e3130a39c1e4a740d044e685730"`,
    );
    await queryRunner.query(`DROP TABLE "notification"`);
    await queryRunner.query(`DROP TABLE "role_permission"`);
    await queryRunner.query(`DROP TABLE "feature"`);
    await queryRunner.query(`DROP TABLE "permission"`);
  }
}
