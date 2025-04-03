import { Doctor, Patient } from ".prisma/client"
import { Request } from "express"

export type AuthResponse = {
    success: boolean,
    message: string,
    data: {
        user: Partial<Patient>,
        token: string
    }
}

export interface ProtectedRequest extends Request{
    user?: Patient
}