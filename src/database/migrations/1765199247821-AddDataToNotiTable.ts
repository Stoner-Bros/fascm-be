import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDataToNotiTable1765199247821 implements MigrationInterface {
  name = 'AddDataToNotiTable1765199247821';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "notification" ADD "data" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "notification" DROP COLUMN "data"`);
  }
}
