import { AppUser} from ".prisma/client"
import { Request } from "express"

export type AuthResponse = {
    success: boolean,
    message: string,
    data: {
        user: Partial<AppUser>,
        token: string
    }
}

export interface ProtectedRequest extends Request{
    user?: AppUser
}