/*
  Warnings:

  - You are about to alter the column `quantity` on the `Holding` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Holding" ALTER COLUMN "quantity" SET DATA TYPE INTEGER;
