import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../jwt/jwt";
import { JwtPayload } from "jsonwebtoken";

export declare interface UserRequest extends Request{
    user?: string | JwtPayload

}
export const authenticateUser = async (req: UserRequest, res: Response, next: NextFunction)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader?.split(' ')[1]

    if(!token){
        res.json({message: 'User is not authorized'})
        return
    }

    const verifiedUser = await verifyToken(token)

    if(!verifiedUser){
        return res.json({message: 'Invalid user'})
    }

    req.user = verifiedUser

    next()
}