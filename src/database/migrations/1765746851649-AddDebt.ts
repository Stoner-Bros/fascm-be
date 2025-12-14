import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDebt1765746851649 implements MigrationInterface {
  name = 'AddDebt1765746851649';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."debt_partnertype_enum" AS ENUM('supplier', 'consignee')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."debt_status_enum" AS ENUM('unpaid', 'partially_paid', 'paid', 'overdue')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."debt_debttype_enum" AS ENUM('payable', 'receivable')`,
    );
    await queryRunner.query(
      `CREATE TABLE "debt" ("partnerType" "public"."debt_partnertype_enum", "status" "public"."debt_status_enum", "dueDate" TIMESTAMP, "creditLimit" integer, "remainingAmount" integer, "paidAmount" integer, "originalAmount" integer, "debtType" "public"."debt_debttype_enum", "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "consigneeId" character varying, "supplierId" character varying, CONSTRAINT "REL_7120a9db761e8f156934a0ae0f" UNIQUE ("consigneeId"), CONSTRAINT "REL_d485fa56e70ace46e29e8b0315" UNIQUE ("supplierId"), CONSTRAINT "PK_f0904ec85a9c8792dded33608a8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_paymenttype_enum" AS ENUM('in', 'out')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentType" "public"."payment_paymenttype_enum"`,
    );
    await queryRunner.query(`ALTER TABLE "payment" ADD "debtId" uuid`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'paid')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "status" "public"."payment_status_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP COLUMN "paymentMethod"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."payment_paymentmethod_enum" AS ENUM('bank_transfer', 'cash')`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentMethod" "public"."payment_paymentmethod_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "debt" ADD CONSTRAINT "FK_7120a9db761e8f156934a0ae0f3" FOREIGN KEY ("consigneeId") REFERENCES "consignee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "debt" ADD CONSTRAINT "FK_d485fa56e70ace46e29e8b03159" FOREIGN KEY ("supplierId") REFERENCES "supplier"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" ADD CONSTRAINT "FK_e5e1d32ace57e5e7b117026829f" FOREIGN KEY ("debtId") REFERENCES "debt"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment" DROP CONSTRAINT "FK_e5e1d32ace57e5e7b117026829f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "debt" DROP CONSTRAINT "FK_d485fa56e70ace46e29e8b03159"`,
    );
    await queryRunner.query(
      `ALTER TABLE "debt" DROP CONSTRAINT "FK_7120a9db761e8f156934a0ae0f3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "payment" DROP COLUMN "paymentMethod"`,
    );
    await queryRunner.query(`DROP TYPE "public"."payment_paymentmethod_enum"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "paymentMethod" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "payment" ADD "status" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "debtId"`);
    await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "paymentType"`);
    await queryRunner.query(`DROP TYPE "public"."payment_paymenttype_enum"`);
    await queryRunner.query(`DROP TABLE "debt"`);
    await queryRunner.query(`DROP TYPE "public"."debt_debttype_enum"`);
    await queryRunner.query(`DROP TYPE "public"."debt_status_enum"`);
    await queryRunner.query(`DROP TYPE "public"."debt_partnertype_enum"`);
  }
}
