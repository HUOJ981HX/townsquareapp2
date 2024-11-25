/*
  Warnings:

  - You are about to drop the column `postFilter` on the `Filters` table. All the data in the column will be lost.
  - You are about to drop the column `userFilter` on the `Filters` table. All the data in the column will be lost.
  - You are about to drop the column `mood` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postFilterDisplay` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `postFilterQueryRole` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `filter` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `FilterableUserAttributes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Relationship` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `FilterableUserAttributes` DROP FOREIGN KEY `UserAttributes_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Relationship` DROP FOREIGN KEY `Relationship_userAttributesId_fkey`;

-- AlterTable
ALTER TABLE `Filters` DROP COLUMN `postFilter`,
    DROP COLUMN `userFilter`;

-- AlterTable
ALTER TABLE `Post` DROP COLUMN `mood`,
    DROP COLUMN `postFilterDisplay`,
    DROP COLUMN `postFilterQueryRole`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `filter`;

-- DropTable
DROP TABLE `FilterableUserAttributes`;

-- DropTable
DROP TABLE `Relationship`;

-- CreateTable
CREATE TABLE `FilterableUserAttributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `ethnicity` VARCHAR(191) NULL,
    `personalityType` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NOT NULL,
    `filtersId` INTEGER NOT NULL,

    UNIQUE INDEX `FilterUserAttributes_userId_key`(`userId`),
    UNIQUE INDEX `FilterUserAttributes_filtersId_key`(`filtersId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FilterablePostAttributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `postFilterDisplay` VARCHAR(191) NULL,
    `postFilterQueryRole` VARCHAR(191) NULL,
    `mood` VARCHAR(191) NULL,
    `postId` INTEGER NOT NULL,
    `filtersId` INTEGER NOT NULL,

    UNIQUE INDEX `FilterPostAttributes_postId_key`(`postId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FilterableUserAttributes` ADD CONSTRAINT `FilterUserAttributes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilterableUserAttributes` ADD CONSTRAINT `FilterUserAttributes_filtersId_fkey` FOREIGN KEY (`filtersId`) REFERENCES `Filters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilterablePostAttributes` ADD CONSTRAINT `FilterPostAttributes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilterablePostAttributes` ADD CONSTRAINT `FilterPostAttributes_filtersId_fkey` FOREIGN KEY (`filtersId`) REFERENCES `Filters`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
