/*
  Warnings:

  - You are about to drop the `Example` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Example";
