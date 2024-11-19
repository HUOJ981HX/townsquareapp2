/*
  Warnings:

  - You are about to drop the column `relationship` on the `UserAttributes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `UserAttributes` DROP COLUMN `relationship`;

-- CreateTable
CREATE TABLE `Relationship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userAttributesId` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `openTo` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Relationship_userAttributesId_key`(`userAttributesId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Relationship` ADD CONSTRAINT `Relationship_userAttributesId_fkey` FOREIGN KEY (`userAttributesId`) REFERENCES `UserAttributes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
