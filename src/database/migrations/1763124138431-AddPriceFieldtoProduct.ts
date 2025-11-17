import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPriceFieldtoProduct1763124138431 implements MigrationInterface {
  name = 'AddPriceFieldtoProduct1763124138431';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" ADD "pricePerKg" integer`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "pricePerKg"`);
  }
}
