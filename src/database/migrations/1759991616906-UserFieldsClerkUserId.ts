import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFieldsClerkUserId1759991616906 implements MigrationInterface {
  name = 'UserFieldsClerkUserId1759991616906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "clerkUserId" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "clerkUserId"`);
  }
}
