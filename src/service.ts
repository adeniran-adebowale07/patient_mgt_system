import { Patient, PrismaClient } from '@prisma/client'
import { create } from 'domain';

const prisma = new PrismaClient()




async function getAllPatients() {
    const result = await prisma.patient.findMany();
    return result;
}

//READ
async function findPatient(patientId: number) {
    const patient = await prisma.patient.findUnique({
        where: { patientId }
    })
    return patient;
}

//CREATE
async function createPatient(patient: Patient) {
    return await prisma.patient.create({
        data: { ...patient }
    })
}

//DELETE
async function deletePatient(patientId: number) {
    await prisma.patient.delete({
        where: { patientId }
    });
}

//UPDATE
async function updatePatientRecord(patientId: number, patientInfo : Patient) {
    return await prisma.patient.update({
        where: { patientId },
        data: { ...patientInfo }
    })
}

const quickStart = async () => {
    // const result = await createBook("Fire and Ice", "Brandon Sanderson");
    // const result = await getAllBooks();
    // const result = await findBook(2);
    // const result = await deleteBook(1);
    // const result = await updateBook(2, "Fire and Ice", "Brandon Sanderson");
    // console.log(result);
}


quickStart();