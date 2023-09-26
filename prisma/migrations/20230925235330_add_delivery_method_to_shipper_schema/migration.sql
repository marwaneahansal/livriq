/*
  Warnings:

  - Added the required column `deliveryMethod` to the `Shipper` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shipper" ADD COLUMN     "deliveryMethod" TEXT NOT NULL;
