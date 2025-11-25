import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveClerkFromUser1764072522348 implements MigrationInterface {
  name = 'RemoveClerkFromUser1764072522348';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "clerkUserId"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "clerkUserId" character varying`,
    );
  }
}
