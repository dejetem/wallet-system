import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1700000000000 implements MigrationInterface {
    name = 'CreateInitialTables1700000000000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enable UUID extension
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "email" VARCHAR NOT NULL UNIQUE,
                "password" VARCHAR NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")
            )
        `);

        // Create wallets table
        await queryRunner.query(`
            CREATE TABLE "wallets" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "userId" VARCHAR NOT NULL,
                "balance" DECIMAL(10,2) NOT NULL DEFAULT 0,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id")
            )
        `);

        // Create transactions table
        await queryRunner.query(`
            CREATE TYPE "transaction_type_enum" AS ENUM('credit', 'debit')
        `);

        await queryRunner.query(`
            CREATE TABLE "transactions" (
                "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
                "userId" VARCHAR NOT NULL,
                "type" transaction_type_enum NOT NULL,
                "amount" DECIMAL(10,2) NOT NULL,
                "timestamp" TIMESTAMP NOT NULL DEFAULT now(),
                "description" VARCHAR,
                CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "transactions"`);
        await queryRunner.query(`DROP TYPE "transaction_type_enum"`);
        await queryRunner.query(`DROP TABLE "wallets"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}