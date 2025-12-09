import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddOrderDetailSelectionEntity1765297911818
  implements MigrationInterface
{
  name = 'AddOrderDetailSelectionEntity1765297911818';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "order_detail_selection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "batchId" uuid, "orderDetailId" character varying, CONSTRAINT "PK_d5130b363194886c45c5bb679ee" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD CONSTRAINT "FK_5029e3acb4725acdab529503afb" FOREIGN KEY ("batchId") REFERENCES "batch"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" ADD CONSTRAINT "FK_ae27fc821da7e1bb562abce4e1a" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP CONSTRAINT "FK_ae27fc821da7e1bb562abce4e1a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_detail_selection" DROP CONSTRAINT "FK_5029e3acb4725acdab529503afb"`,
    );
    await queryRunner.query(`DROP TABLE "order_detail_selection"`);
  }
}
