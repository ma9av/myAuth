import jwt from 'jsonwebtoken'

export const signJWTToken = async (payload: object)=>{

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!)
}

export const verifyToken = async (token: string)=>{
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, {maxAge: '12h'})
}

