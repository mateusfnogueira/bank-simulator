/*
  Warnings:

  - Added the required column `specialBalance` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "specialBalance" DOUBLE PRECISION NOT NULL;
