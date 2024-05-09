/*
  Warnings:

  - You are about to alter the column `status` on the `job_application` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("job_application_status")`.
  - You are about to alter the column `status` on the `job_post` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("job_post_status")`.

*/
-- AlterTable
ALTER TABLE `job_application` MODIFY `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `job_post` MODIFY `status` ENUM('open', 'closed') NOT NULL DEFAULT 'open';
