/*
  Warnings:

  - You are about to drop the column `image_url` on the `job_post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `job_post` DROP COLUMN `image_url`;

-- CreateTable
CREATE TABLE `job_image` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_post_id` INTEGER NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `is_thumbnail` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `job_image` ADD CONSTRAINT `job_image_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
