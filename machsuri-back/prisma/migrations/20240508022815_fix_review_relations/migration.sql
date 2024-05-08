/*
  Warnings:

  - You are about to drop the column `grade` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `review` table. All the data in the column will be lost.
  - Added the required column `rating` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewee_id` to the `review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reviewer_id` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `review` DROP FOREIGN KEY `review_user_id_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `grade`,
    DROP COLUMN `user_id`,
    ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `reviewee_id` INTEGER NOT NULL,
    ADD COLUMN `reviewer_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_reviewee_id_fkey` FOREIGN KEY (`reviewee_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_reviewer_id_fkey` FOREIGN KEY (`reviewer_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
