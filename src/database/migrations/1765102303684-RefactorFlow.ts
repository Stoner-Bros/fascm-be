import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorFlow1765102303684 implements MigrationInterface {
  name = 'RefactorFlow1765102303684';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_f72f3de3a0f3989ece4e76fbcef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_5a7a028d021d940764df70ce46e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "FK_000489cb39657d4468e05a2efe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_f27fbba27eb1333f1337dbff527"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" RENAME COLUMN "supplierIdId" TO "supplierId"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalVolume"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalMass"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalPayment"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "vatAmount"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "totalAmount"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "taxRate"`);
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "REL_9ad13532f48db4ac5a3b3dd70e"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "paymentId"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderDate"`);
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP COLUMN "orderScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP COLUMN "harvestScheduleId"`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "taxRate"`);
    await queryRunner.query(`ALTER TABLE "harvest_ticket" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "totalPayment"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "vatAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "totalAmount"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "taxRate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "accountNumber"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "paymentMethod"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "UQ_000489cb39657d4468e05a2efe2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "harvestScheduleIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" DROP COLUMN "taxRate"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "orderScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "harvestScheduleId"`,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "unit" character varying`);
    await queryRunner.query(`ALTER TABLE "order" ADD "quantity" integer`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD "orderNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD "orderPhaseId" uuid`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD "harvestPhaseId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "order_invoice" ADD "paymentId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order_invoice" ADD CONSTRAINT "UQ_443aafd64111878279958fb8b9e" UNIQUE ("paymentId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "harvestScheduleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "UQ_01e0ee26db029347e25f2e7d9d8" UNIQUE ("harvestScheduleId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "deliveryStaffId" uuid`,
    );
    await queryRunner.query(`ALTER TABLE "delivery" ADD "harvestPhaseId" uuid`);
    await queryRunner.query(`ALTER TABLE "delivery" ADD "orderPhaseId" uuid`);
    await queryRunner.query(
      `ALTER TYPE "public"."order_schedule_status_enum" RENAME TO "order_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_schedule_status_enum" AS ENUM('pending', 'rejected', 'approved', 'processing', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ALTER COLUMN "status" TYPE "public"."order_schedule_status_enum" USING "status"::"text"::"public"."order_schedule_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."order_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."harvest_schedule_status_enum" RENAME TO "harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum" AS ENUM('pending', 'rejected', 'approved', 'processing', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ALTER COLUMN "status" TYPE "public"."harvest_schedule_status_enum" USING "status"::"text"::"public"."harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_phase" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_phase_status_enum" AS ENUM('preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_phase" ADD "status" "public"."harvest_phase_status_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "order_phase" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."order_phase_status_enum" AS ENUM('preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_phase" ADD "status" "public"."order_phase_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "FK_fab5e80eb307078b87d377e516e" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_27d75a83c8dc319139a43ed73bb" FOREIGN KEY ("orderPhaseId") REFERENCES "order_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_d7fd70e11a79f32afc1f01e3d89" FOREIGN KEY ("harvestPhaseId") REFERENCES "harvest_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice" ADD CONSTRAINT "FK_443aafd64111878279958fb8b9e" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "FK_01e0ee26db029347e25f2e7d9d8" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_855bf71d3649e4c92fbcbd54f2d" FOREIGN KEY ("deliveryStaffId") REFERENCES "delivery_staff"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_355d6049294473a50989366030b" FOREIGN KEY ("harvestPhaseId") REFERENCES "harvest_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_cc9ebb4e608d8c441b1a410539c" FOREIGN KEY ("orderPhaseId") REFERENCES "order_phase"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_cc9ebb4e608d8c441b1a410539c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_355d6049294473a50989366030b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP CONSTRAINT "FK_855bf71d3649e4c92fbcbd54f2d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "FK_01e0ee26db029347e25f2e7d9d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice" DROP CONSTRAINT "FK_443aafd64111878279958fb8b9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_d7fd70e11a79f32afc1f01e3d89"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP CONSTRAINT "FK_27d75a83c8dc319139a43ed73bb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" DROP CONSTRAINT "FK_fab5e80eb307078b87d377e516e"`,
    );
    await queryRunner.query(`ALTER TABLE "order_phase" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."order_phase_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "order_phase" ADD "status" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "harvest_phase" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."harvest_phase_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "harvest_phase" ADD "status" character varying`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."harvest_schedule_status_enum_old" AS ENUM('pending', 'rejected', 'approved', 'preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ALTER COLUMN "status" TYPE "public"."harvest_schedule_status_enum_old" USING "status"::"text"::"public"."harvest_schedule_status_enum_old"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."harvest_schedule_status_enum_old" RENAME TO "harvest_schedule_status_enum"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_schedule_status_enum_old" AS ENUM('pending', 'rejected', 'approved', 'preparing', 'delivering', 'delivered', 'completed', 'canceled')`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_schedule" ALTER COLUMN "status" TYPE "public"."order_schedule_status_enum_old" USING "status"::"text"::"public"."order_schedule_status_enum_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."order_schedule_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."order_schedule_status_enum_old" RENAME TO "order_schedule_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "orderPhaseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "harvestPhaseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" DROP COLUMN "deliveryStaffId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP CONSTRAINT "UQ_01e0ee26db029347e25f2e7d9d8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" DROP COLUMN "harvestScheduleId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice" DROP CONSTRAINT "UQ_443aafd64111878279958fb8b9e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order_invoice" DROP COLUMN "paymentId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP COLUMN "harvestPhaseId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" DROP COLUMN "orderPhaseId"`,
    );
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderNumber"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "unit"`);
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "harvestScheduleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD "orderScheduleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_detail" ADD "taxRate" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "harvestScheduleIdId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "UQ_000489cb39657d4468e05a2efe2" UNIQUE ("harvestScheduleIdId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "paymentMethod" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "accountNumber" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "taxRate" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "totalAmount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "vatAmount" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "totalPayment" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD "date" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "order_detail" ADD "taxRate" integer`);
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD "harvestScheduleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD "orderScheduleId" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD "orderDate" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "paymentId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "REL_9ad13532f48db4ac5a3b3dd70e" UNIQUE ("paymentId")`,
    );
    await queryRunner.query(`ALTER TABLE "order" ADD "taxRate" integer`);
    await queryRunner.query(`ALTER TABLE "order" ADD "totalAmount" integer`);
    await queryRunner.query(`ALTER TABLE "order" ADD "vatAmount" integer`);
    await queryRunner.query(`ALTER TABLE "order" ADD "totalPayment" integer`);
    await queryRunner.query(`ALTER TABLE "order" ADD "totalMass" integer`);
    await queryRunner.query(`ALTER TABLE "order" ADD "totalVolume" integer`);
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" RENAME COLUMN "supplierId" TO "supplierIdId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_f27fbba27eb1333f1337dbff527" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "delivery" ADD CONSTRAINT "FK_62bff6d2a7d74b547ba49285bd1" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_ticket" ADD CONSTRAINT "FK_000489cb39657d4468e05a2efe2" FOREIGN KEY ("harvestScheduleIdId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_5a7a028d021d940764df70ce46e" FOREIGN KEY ("orderScheduleId") REFERENCES "order_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "image_proof" ADD CONSTRAINT "FK_f72f3de3a0f3989ece4e76fbcef" FOREIGN KEY ("harvestScheduleId") REFERENCES "harvest_schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "harvest_schedule" ADD CONSTRAINT "FK_d76d2955ec6db24504ad26b34bb" FOREIGN KEY ("supplierIdId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_9ad13532f48db4ac5a3b3dd70e5" FOREIGN KEY ("paymentId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
