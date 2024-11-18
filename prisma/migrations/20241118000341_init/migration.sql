-- CreateTable
CREATE TABLE `UserAttributes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `age` INTEGER NULL,
    `gender` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `friendship` VARCHAR(191) NULL,
    `relationship` VARCHAR(191) NULL,
    `job` VARCHAR(191) NULL,
    `collaboration` VARCHAR(191) NULL,
    `help` VARCHAR(191) NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `UserAttributes_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserAttributes` ADD CONSTRAINT `UserAttributes_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
