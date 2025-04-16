-- DropIndex
DROP INDEX `appointments_doctorId_fkey` ON `appointments`;

-- DropIndex
DROP INDEX `appointments_patientId_fkey` ON `appointments`;

-- DropIndex
DROP INDEX `medical_records_doctorid_fkey` ON `medical_records`;

-- DropIndex
DROP INDEX `medical_records_patientId_fkey` ON `medical_records`;

-- DropIndex
DROP INDEX `prescriptions_doctorId_fkey` ON `prescriptions`;

-- DropIndex
DROP INDEX `prescriptions_medicalRecordId_fkey` ON `prescriptions`;

-- DropIndex
DROP INDEX `prescriptions_patientId_fkey` ON `prescriptions`;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`doctorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `Doctor`(`doctorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptions` ADD CONSTRAINT `prescriptions_medicalRecordId_fkey` FOREIGN KEY (`medicalRecordId`) REFERENCES `medical_records`(`recordId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_doctorid_fkey` FOREIGN KEY (`doctorid`) REFERENCES `Doctor`(`doctorId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medical_records` ADD CONSTRAINT `medical_records_patientId_fkey` FOREIGN KEY (`patientId`) REFERENCES `patients`(`patientId`) ON DELETE RESTRICT ON UPDATE CASCADE;
