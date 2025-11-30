import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddHavestDateDeliveriedDateRemoveOrderDate1764494763817
  implements MigrationInterface
{
  name = 'AddHavestDateDeliveriedDateRemoveOrderDate1764494763817';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_schedule" RENAME COLUMN "orderDate" TO "deliveryDate"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order_schedule" RENAME COLUMN "deliveryDate" TO "orderDate"`,
    );
  }
}
