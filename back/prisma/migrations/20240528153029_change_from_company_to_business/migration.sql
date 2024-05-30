/*
  Warnings:

  - You are about to drop the column `company_name` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `company_name`,
    ADD COLUMN `business_name` VARCHAR(191) NULL;
