/*
  Warnings:

  - Added the required column `name2` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Test" ADD COLUMN     "name2" TEXT NOT NULL;
