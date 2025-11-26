import { MigrationInterface, QueryRunner } from 'typeorm';

export class IOTDevicesMigration1764126728997 implements MigrationInterface {
  name = 'IOTDevicesMigration1764126728997';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_745e205298d9b9aad2b6babdabf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_0b88db2af5ae4e180af64b72c30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "PK_22d2a92d3552a3a811cb4daf3a3"`,
    );
    await queryRunner.query(`ALTER TABLE "io_t_device" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD "id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "PK_22d2a92d3552a3a811cb4daf3a3" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ALTER COLUMN "truckId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ALTER COLUMN "areaId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_745e205298d9b9aad2b6babdabf" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_0b88db2af5ae4e180af64b72c30" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_0b88db2af5ae4e180af64b72c30"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "FK_745e205298d9b9aad2b6babdabf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ALTER COLUMN "areaId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ALTER COLUMN "truckId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" DROP CONSTRAINT "PK_22d2a92d3552a3a811cb4daf3a3"`,
    );
    await queryRunner.query(`ALTER TABLE "io_t_device" DROP COLUMN "id"`);
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "PK_22d2a92d3552a3a811cb4daf3a3" PRIMARY KEY ("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_0b88db2af5ae4e180af64b72c30" FOREIGN KEY ("areaId") REFERENCES "area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "io_t_device" ADD CONSTRAINT "FK_745e205298d9b9aad2b6babdabf" FOREIGN KEY ("truckId") REFERENCES "truck"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
