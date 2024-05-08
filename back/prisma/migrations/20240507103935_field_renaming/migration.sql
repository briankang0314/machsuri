/*
  Warnings:

  - You are about to drop the column `major_image` on the `major_category` table. All the data in the column will be lost.
  - You are about to drop the column `minor_image` on the `minor_category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `major_category` DROP COLUMN `major_image`,
    ADD COLUMN `major_image_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `minor_category` DROP COLUMN `minor_image`,
    ADD COLUMN `minor_image_url` VARCHAR(191) NULL;
