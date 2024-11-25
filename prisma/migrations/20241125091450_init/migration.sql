/*
  Warnings:

  - You are about to drop the column `userId` on the `FilterablePostAttributes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[filtersId]` on the table `FilterablePostAttributes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `FilterablePostAttributes` DROP COLUMN `userId`;

-- CreateIndex
CREATE UNIQUE INDEX `FilterablePostAttributes_filtersId_key` ON `FilterablePostAttributes`(`filtersId`);
