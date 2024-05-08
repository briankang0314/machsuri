/*
  Warnings:

  - You are about to drop the `cities` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_applications` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_post_major_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_post_minor_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `job_posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `major_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `minor_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `regions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviews` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_minor_categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `cities` DROP FOREIGN KEY `cities_region_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_applications` DROP FOREIGN KEY `job_applications_applicant_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_applications` DROP FOREIGN KEY `job_applications_job_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_post_major_categories` DROP FOREIGN KEY `job_post_major_categories_job_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_post_major_categories` DROP FOREIGN KEY `job_post_major_categories_major_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_post_minor_categories` DROP FOREIGN KEY `job_post_minor_categories_job_post_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_post_minor_categories` DROP FOREIGN KEY `job_post_minor_categories_minor_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_posts` DROP FOREIGN KEY `job_posts_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `job_posts` DROP FOREIGN KEY `job_posts_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `minor_categories` DROP FOREIGN KEY `minor_categories_major_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_minor_categories` DROP FOREIGN KEY `user_minor_categories_minor_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_minor_categories` DROP FOREIGN KEY `user_minor_categories_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `users` DROP FOREIGN KEY `users_city_id_fkey`;

-- DropTable
DROP TABLE `cities`;

-- DropTable
DROP TABLE `job_applications`;

-- DropTable
DROP TABLE `job_post_major_categories`;

-- DropTable
DROP TABLE `job_post_minor_categories`;

-- DropTable
DROP TABLE `job_posts`;

-- DropTable
DROP TABLE `major_categories`;

-- DropTable
DROP TABLE `minor_categories`;

-- DropTable
DROP TABLE `regions`;

-- DropTable
DROP TABLE `reviews`;

-- DropTable
DROP TABLE `user_minor_categories`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `city_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `profile_image_url` VARCHAR(191) NULL,
    `intro` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `work_start_time` VARCHAR(191) NULL,
    `work_end_time` VARCHAR(191) NULL,
    `work_experience` INTEGER NULL,
    `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_post` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `fee` DECIMAL(65, 30) NOT NULL,
    `contact_info` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `job_post_id` INTEGER NOT NULL,
    `applicant_id` INTEGER NOT NULL,
    `cover_letter` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    `applied_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `major_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `major_image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minor_category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `major_category_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `minor_image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_preference` (
    `user_id` INTEGER NOT NULL,
    `minor_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`user_id`, `minor_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_category` (
    `job_post_id` INTEGER NOT NULL,
    `minor_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`job_post_id`, `minor_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `grade` INTEGER NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_post` ADD CONSTRAINT `job_post_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_post` ADD CONSTRAINT `job_post_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_application` ADD CONSTRAINT `job_application_applicant_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_application` ADD CONSTRAINT `job_application_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `minor_category` ADD CONSTRAINT `minor_category_major_category_id_fkey` FOREIGN KEY (`major_category_id`) REFERENCES `major_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_preference` ADD CONSTRAINT `user_preference_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_preference` ADD CONSTRAINT `user_preference_minor_category_id_fkey` FOREIGN KEY (`minor_category_id`) REFERENCES `minor_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_category` ADD CONSTRAINT `job_category_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_category` ADD CONSTRAINT `job_category_minor_category_id_fkey` FOREIGN KEY (`minor_category_id`) REFERENCES `minor_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `city` ADD CONSTRAINT `city_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
