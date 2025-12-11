import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTruckToWarehouse1765364667039 implements MigrationInterface {
  name = 'AddTruckToWarehouse1765364667039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "truck" ADD "warehouseId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "truck" ADD CONSTRAINT "FK_ddc3d86086d67c6ed29168cbdac" FOREIGN KEY ("warehouseId") REFERENCES "warehouse"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "truck" DROP CONSTRAINT "FK_ddc3d86086d67c6ed29168cbdac"`,
    );
    await queryRunner.query(`ALTER TABLE "truck" DROP COLUMN "warehouseId"`);
  }
}
