/*
  Warnings:

  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("user_role")`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('general', 'admin') NOT NULL DEFAULT 'general';
