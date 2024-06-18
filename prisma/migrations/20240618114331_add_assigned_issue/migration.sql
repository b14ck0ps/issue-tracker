-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `assigneToUserId` VARCHAR(255) NULL;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_assigneToUserId_fkey` FOREIGN KEY (`assigneToUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
