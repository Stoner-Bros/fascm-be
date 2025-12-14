import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccepted1765706539697 implements MigrationInterface {
  name = 'AddAccepted1765706539697';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "finalUnitPriceAccepted" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "finalUnitPriceAccepted"`,
    );
  }
}
