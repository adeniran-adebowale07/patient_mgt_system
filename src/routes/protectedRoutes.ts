import { Request, Response, Router } from "express"

import patientController from "../controllers/patientController";



const router = Router();

//Post Routes
router.get("/patients", patientController.getAllPatients)

router.get("/patients/:patientId", patientController.getPatient)
router.post("/patient", patientController.createPatientInfo)
router.post("/medicalRecord", patientController.createPatientMedicalRecord)

export default router;