/*
  Warnings:

  - You are about to drop the column `expert_id` on the `job_posts` table. All the data in the column will be lost.
  - You are about to drop the column `expert_id` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `expert_minor_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `experts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `user_id` to the `job_posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `expert_minor_categories` DROP FOREIGN KEY `expert_minor_categories_expert_id_fkey`;

-- DropForeignKey
ALTER TABLE `expert_minor_categories` DROP FOREIGN KEY `expert_minor_categories_minor_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `experts` DROP FOREIGN KEY `experts_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_applications` DROP FOREIGN KEY `job_applications_applicant_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_posts` DROP FOREIGN KEY `job_posts_expert_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_expert_id_fkey`;

-- AlterTable
ALTER TABLE `job_posts` DROP COLUMN `expert_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `expert_id`,
    ADD COLUMN `user_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `expert_minor_categories`;

-- DropTable
DROP TABLE `experts`;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `user_image` VARCHAR(191) NULL,
    `intro` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `start_time` VARCHAR(191) NULL,
    `end_time` VARCHAR(191) NULL,
    `work_experience` INTEGER NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_minor_categories` (
    `user_id` INTEGER NOT NULL,
    `minor_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `minor_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_posts` ADD CONSTRAINT `job_posts_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_applicant_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_minor_categories` ADD CONSTRAINT `user_minor_categories_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_minor_categories` ADD CONSTRAINT `user_minor_categories_minor_category_id_fkey` FOREIGN KEY (`minor_category_id`) REFERENCES `minor_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
