import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImageFieldProduct1762923771368 implements MigrationInterface {
  name = 'AddImageFieldProduct1762923771368';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "image"`);
  }
}
