-- AlterTable
ALTER TABLE `user` ADD COLUMN `company_name` VARCHAR(191) NULL,
    ADD COLUMN `openchat_name` VARCHAR(191) NOT NULL DEFAULT '';
