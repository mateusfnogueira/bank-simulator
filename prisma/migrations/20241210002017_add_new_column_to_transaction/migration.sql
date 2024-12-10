-- CreateEnum
CREATE TYPE "TransactionCategory" AS ENUM ('PIX', 'TED', 'DOC', 'DEPOSIT');

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "recipient" TEXT,
ALTER COLUMN "category" DROP NOT NULL;
