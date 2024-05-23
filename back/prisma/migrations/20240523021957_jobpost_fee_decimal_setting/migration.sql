/*
  Warnings:

  - You are about to alter the column `fee` on the `job_post` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE `job_post` MODIFY `fee` DECIMAL(10, 2) NOT NULL;
