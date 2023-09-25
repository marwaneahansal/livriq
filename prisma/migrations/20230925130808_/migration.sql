-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('Seller', 'Shipper');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Roles";
