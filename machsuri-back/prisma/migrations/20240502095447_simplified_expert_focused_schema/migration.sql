/*
  Warnings:

  - You are about to drop the column `createdAt` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `deletedAt` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `detailAddressId` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `employeeNumber` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `expertImage` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `workExperience` on the `experts` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `expertId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reviews` table. All the data in the column will be lost.
  - You are about to drop the `_AnswersApplyForms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_QuestionsApplyForms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `address` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `answers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applyForm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `detailAddress` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expertPosts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expertsCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `majorCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `minorCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `questions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `reviewImages` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `experts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city_id` to the `experts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `experts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `experts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expert_id` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_AnswersApplyForms` DROP FOREIGN KEY `_answersapplyforms_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_AnswersApplyForms` DROP FOREIGN KEY `_answersapplyforms_ibfk_2`;

-- DropForeignKey
ALTER TABLE `_QuestionsApplyForms` DROP FOREIGN KEY `_questionsapplyforms_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_QuestionsApplyForms` DROP FOREIGN KEY `_questionsapplyforms_ibfk_2`;

-- DropForeignKey
ALTER TABLE `answers` DROP FOREIGN KEY `answers_questionId_fkey`;

-- DropForeignKey
ALTER TABLE `applyForm` DROP FOREIGN KEY `applyForm_minorCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `applyForm` DROP FOREIGN KEY `applyForm_userId_fkey`;

-- DropForeignKey
ALTER TABLE `detailAddress` DROP FOREIGN KEY `detailAddress_addressId_fkey`;

-- DropForeignKey
ALTER TABLE `expertPosts` DROP FOREIGN KEY `expertPosts_expertId_fkey`;

-- DropForeignKey
ALTER TABLE `experts` DROP FOREIGN KEY `experts_detailAddressId_fkey`;

-- DropForeignKey
ALTER TABLE `experts` DROP FOREIGN KEY `experts_userId_fkey`;

-- DropForeignKey
ALTER TABLE `expertsCategories` DROP FOREIGN KEY `expertsCategories_expertId_fkey`;

-- DropForeignKey
ALTER TABLE `expertsCategories` DROP FOREIGN KEY `expertsCategories_minorCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `minorCategories` DROP FOREIGN KEY `minorCategories_majorCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `questions` DROP FOREIGN KEY `questions_minorCategoryId_fkey`;

-- DropForeignKey
ALTER TABLE `reviewImages` DROP FOREIGN KEY `reviewImages_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_expertId_fkey`;

-- DropForeignKey
ALTER TABLE `reviews` DROP FOREIGN KEY `reviews_userId_fkey`;

-- AlterTable
ALTER TABLE `experts` DROP COLUMN `createdAt`,
    DROP COLUMN `deletedAt`,
    DROP COLUMN `detailAddressId`,
    DROP COLUMN `employeeNumber`,
    DROP COLUMN `endTime`,
    DROP COLUMN `expertImage`,
    DROP COLUMN `isDeleted`,
    DROP COLUMN `startTime`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    DROP COLUMN `workExperience`,
    ADD COLUMN `city_id` INTEGER NOT NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deleted_at` DATETIME(3) NULL,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `end_time` VARCHAR(191) NULL,
    ADD COLUMN `expert_image` VARCHAR(191) NULL,
    ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NULL,
    ADD COLUMN `start_time` VARCHAR(191) NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `work_experience` INTEGER NULL;

-- AlterTable
ALTER TABLE `reviews` DROP COLUMN `createdAt`,
    DROP COLUMN `expertId`,
    DROP COLUMN `updatedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expert_id` INTEGER NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `_AnswersApplyForms`;

-- DropTable
DROP TABLE `_QuestionsApplyForms`;

-- DropTable
DROP TABLE `address`;

-- DropTable
DROP TABLE `answers`;

-- DropTable
DROP TABLE `applyForm`;

-- DropTable
DROP TABLE `detailAddress`;

-- DropTable
DROP TABLE `expertPosts`;

-- DropTable
DROP TABLE `expertsCategories`;

-- DropTable
DROP TABLE `majorCategories`;

-- DropTable
DROP TABLE `minorCategories`;

-- DropTable
DROP TABLE `questions`;

-- DropTable
DROP TABLE `reviewImages`;

-- DropTable
DROP TABLE `users`;

-- CreateTable
CREATE TABLE `job_posts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expert_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `summary` VARCHAR(191) NOT NULL,
    `remuneration` DECIMAL(65, 30) NOT NULL,
    `contact_info` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_applications` (
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
CREATE TABLE `major_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `major_image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `minor_categories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `major_category_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `minor_image` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expert_minor_categories` (
    `expert_id` INTEGER NOT NULL,
    `minor_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`expert_id`, `minor_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_post_major_categories` (
    `job_post_id` INTEGER NOT NULL,
    `major_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`job_post_id`, `major_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `job_post_minor_categories` (
    `job_post_id` INTEGER NOT NULL,
    `minor_category_id` INTEGER NOT NULL,

    PRIMARY KEY (`job_post_id`, `minor_category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `regions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `region_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `experts_email_key` ON `experts`(`email`);

-- AddForeignKey
ALTER TABLE `experts` ADD CONSTRAINT `experts_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_posts` ADD CONSTRAINT `job_posts_expert_id_fkey` FOREIGN KEY (`expert_id`) REFERENCES `experts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_posts` ADD CONSTRAINT `job_posts_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `cities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_applicant_id_fkey` FOREIGN KEY (`applicant_id`) REFERENCES `experts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_applications` ADD CONSTRAINT `job_applications_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `minor_categories` ADD CONSTRAINT `minor_categories_major_category_id_fkey` FOREIGN KEY (`major_category_id`) REFERENCES `major_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expert_minor_categories` ADD CONSTRAINT `expert_minor_categories_expert_id_fkey` FOREIGN KEY (`expert_id`) REFERENCES `experts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expert_minor_categories` ADD CONSTRAINT `expert_minor_categories_minor_category_id_fkey` FOREIGN KEY (`minor_category_id`) REFERENCES `minor_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_post_major_categories` ADD CONSTRAINT `job_post_major_categories_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_post_major_categories` ADD CONSTRAINT `job_post_major_categories_major_category_id_fkey` FOREIGN KEY (`major_category_id`) REFERENCES `major_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_post_minor_categories` ADD CONSTRAINT `job_post_minor_categories_job_post_id_fkey` FOREIGN KEY (`job_post_id`) REFERENCES `job_posts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `job_post_minor_categories` ADD CONSTRAINT `job_post_minor_categories_minor_category_id_fkey` FOREIGN KEY (`minor_category_id`) REFERENCES `minor_categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_expert_id_fkey` FOREIGN KEY (`expert_id`) REFERENCES `experts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cities` ADD CONSTRAINT `cities_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `regions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
