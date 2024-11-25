-- DropForeignKey
ALTER TABLE `FilterablePostAttributes` DROP FOREIGN KEY `FilterPostAttributes_filtersId_fkey`;

-- DropForeignKey
ALTER TABLE `FilterablePostAttributes` DROP FOREIGN KEY `FilterPostAttributes_postId_fkey`;

-- DropForeignKey
ALTER TABLE `FilterableUserAttributes` DROP FOREIGN KEY `FilterUserAttributes_filtersId_fkey`;

-- DropForeignKey
ALTER TABLE `FilterableUserAttributes` DROP FOREIGN KEY `FilterUserAttributes_userId_fkey`;

-- AlterTable
ALTER TABLE `FilterablePostAttributes` ADD COLUMN `userId` VARCHAR(191) NULL,
    MODIFY `postId` INTEGER NULL,
    MODIFY `filtersId` INTEGER NULL;

-- AlterTable
ALTER TABLE `FilterableUserAttributes` MODIFY `userId` VARCHAR(191) NULL,
    MODIFY `filtersId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `FilterableUserAttributes` ADD CONSTRAINT `FilterableUserAttributes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilterableUserAttributes` ADD CONSTRAINT `FilterableUserAttributes_filtersId_fkey` FOREIGN KEY (`filtersId`) REFERENCES `Filters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilterablePostAttributes` ADD CONSTRAINT `FilterablePostAttributes_postId_fkey` FOREIGN KEY (`postId`) REFERENCES `Post`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FilterablePostAttributes` ADD CONSTRAINT `FilterablePostAttributes_filtersId_fkey` FOREIGN KEY (`filtersId`) REFERENCES `Filters`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `FilterablePostAttributes` RENAME INDEX `FilterPostAttributes_postId_key` TO `FilterablePostAttributes_postId_key`;

-- RenameIndex
ALTER TABLE `FilterableUserAttributes` RENAME INDEX `FilterUserAttributes_filtersId_key` TO `FilterableUserAttributes_filtersId_key`;

-- RenameIndex
ALTER TABLE `FilterableUserAttributes` RENAME INDEX `FilterUserAttributes_userId_key` TO `FilterableUserAttributes_userId_key`;
