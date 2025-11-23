import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHarvestScheduleReason1763900954625
  implements MigrationInterface
{
  name = 'AddHarvestScheduleReason1763900954625';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD "reason" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "FK_3f2c21c929383fac18ff7ddd348"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "PK_97bbf9a8db5c522eeb1deffe531"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "PK_97bbf9a8db5c522eeb1deffe531" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "harvestTicketId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "harvestTicketId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "FK_3f2c21c929383fac18ff7ddd348" FOREIGN KEY ("harvestTicketId") REFERENCES "harvest_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP CONSTRAINT "FK_3f2c21c929383fac18ff7ddd348"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "harvestTicketId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "harvestTicketId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "PK_97bbf9a8db5c522eeb1deffe531"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_ticket" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "PK_97bbf9a8db5c522eeb1deffe531" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD CONSTRAINT "FK_3f2c21c929383fac18ff7ddd348" FOREIGN KEY ("harvestTicketId") REFERENCES "harvest_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP COLUMN "reason"`,
    );
  }
}
