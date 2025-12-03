import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageProof1764784802239 implements MigrationInterface {
  name = 'AddImageProof1764784802239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "image_proof" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "orderScheduleId" character varying, "harvestScheduleId" character varying, "photoId" uuid, CONSTRAINT "REL_3d5a77b6071c70acd3b0e175af" UNIQUE ("photoId"), CONSTRAINT "PK_b13ed66327d2216fdaa55257cc0" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_5a7a028d021d940764df70ce46e" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_f72f3de3a0f3989ece4e76fbcef" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_3d5a77b6071c70acd3b0e175afc" FOREIGN KEY ("photoId") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_3d5a77b6071c70acd3b0e175afc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_f72f3de3a0f3989ece4e76fbcef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_5a7a028d021d940764df70ce46e"`,
    );
    await queryRunner.query(`DROP TABLE "image_proof"`);
  }
}
