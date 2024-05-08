/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `city` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `major_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `minor_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `region` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `city_name_key` ON `city`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `major_category_name_key` ON `major_category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `minor_category_name_key` ON `minor_category`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `region_name_key` ON `region`(`name`);
