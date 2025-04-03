import { Response } from "express"
import { asyncHandler } from "../utils/asyncHandler"
import { ProtectedRequest } from "../utils/types"
import AppError from "../errors/AppError";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const getAllPatients = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    const patients = await prisma.patient.findMany({
       take: Number(process.env.RECORD_LIMIT)
    })

    const response = {
        success: true,
        message: "Posts fetched successfully",
        data: { patients }
    }

    res.status(Number(process.env.REQUEST_SUCCESS)).json(response);
})

const getPatient = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    const { patientId } = req.params;
    const patient = await prisma.patient.findUnique({
        where: { patientId: parseInt(patientId) }
        
    })

    if (!patient) throw new AppError("Patient not found", Number(process.env.NOT_FOUND));

    

    const response = {
        success: true,
        message: "Patient fetched successfully",
        data: { patient }
    }

    res.status(Number(process.env.REQUEST_SUCCESS)).json(response);
})

const createPatientInfo = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    const { firstname, middlename,lastname, email,  nationalId, gender, dateofbirth, contactnumber  } = req.body;

    

    if (!lastname || !firstname || !nationalId || !gender || !dateofbirth || !contactnumber ||!email ) throw new AppError("Ensure title and content are provided", Number(process.env.INCOMPLETE_RECORD));

    const patient = await prisma.patient.create({
        data: { firstName:firstname, middleName:middlename ||"",lastName:lastname, email,  nationalId, gender, dateOfBirth: dateofbirth, contactnumber 
        }
    })
    
    const response = {
        success: true,
        message: "Patient Record created successfully!!!",
        data: { patient }
    }

    return res.status(201).json(response);
})



const getPatientMedicalRecord = asyncHandler(async (req: ProtectedRequest, res: Response) => {
    const { patienttId } = req.params;

    const medicalRecords= await prisma.medicalRecord.findMany({
        where: { patientId: parseInt(patienttId) }
       
    });

    const response = {
        success: true,
        message: "Comments fetched successfully",
        data: { medicalRecords }
    }

    res.status(Number(process.env.REQUEST_SUCCESS)).json(response);
});

const createPatientMedicalRecord = asyncHandler(async (req: ProtectedRequest, res: Response) => {
   
    const { doctorId, patientId, diagnosis, treatment,prescription} = req.body;

    if (!doctorId || !patientId ) throw new AppError("Ensure to fill all necessary fields", 400);

    const record = await prisma.medicalRecord.create({
        data: {

            doctorid: doctorId,
            patientId: patientId,
            diagnosis: diagnosis,
            treatment: treatment,
            record_date: new Date(),
            
        }
    });

    if (prescription?.length) {
        await prisma.prescription.createMany({
          data: prescription.map( (p: { medicine: any; dosage: any; duration: any; instructions: any; }) => ({
            medicalRecordId: record.recordId,
            medicine: p.medicine,
            dosage: p.dosage,
            duration: p.duration,
            instructions: p.instructions || null,
          }))
        });
    }
    const response = {
        success: true,
        message: "Medical Record Created successfully",
        data: { record }
    }

    res.status(201).json(response);
});

export default {
    getAllPatients,
    getPatient,
    getPatientMedicalRecord,
    createPatientInfo,
    createPatientMedicalRecord
    
}