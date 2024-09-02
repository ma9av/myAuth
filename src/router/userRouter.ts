import express, { NextFunction, Request, Response } from 'express'
import { Secret, User } from '../database/schema.ts'
import { comparePassword, generateHashedPassword } from '../hashing/bcrypt.ts'
import { signJWTToken } from '../jwt/jwt.ts'
import { authenticateUser, UserRequest } from '../authenticate/authenticate.ts'
const router = express.Router()

router.post('/login',async (req: Request , res: Response)=>{
    const { name , password } = req.body
    
    const user = await User.findOne({
        username: name,
    })
    if(user){
        if(comparePassword(password, user.password)){

            const jwtToken = await signJWTToken({
                username: user.username,
                password: user.password
            })

            
            res.cookie('access-token-auth', jwtToken, {secure: true, sameSite:'none'})
            res.json({"access_token": jwtToken}) 
            return
        }else{
            res.json({ "message": "Invalid password"})
            return
        }
    }

    res.json({ error: "Invalid username or password"})

})

router.post('/register',async (req: Request , res: Response)=>{
    const { name , password } = req.body

    const findExisting = await User.findOne({
        username: name
    })


    if(findExisting){
        res.json({ error:"User already exists..!!"})
        return
    }

    const hashedPassword = await generateHashedPassword(password)
    console.log(hashedPassword)

    const newUser = await User.create({
        "username": name,
        "password": hashedPassword
    })

    if(newUser){
        res.json({ message: 'User created successfully'})
        return
    }else{
        res.json({ error: "Error creating user"})
        return
    }
})

router.post('/secrets', authenticateUser ,async (req: UserRequest , res: Response, next: NextFunction)=>{
    const user = JSON.parse(JSON.stringify(req.user))

    if(!req.body.secret){
        return res.json({ message: "No valid secret provided"})
    }
    const findExisting = await Secret.findOne({
        username: user.username
    })

    if(findExisting){
        return res.json({ message: "There is a secret already"})
    }

    const secret =  await Secret.create({
        username: user.username,
        secret: req.body.secret        
    })
    
    if(secret){
        return res.json(secret)
    }

    return res.json({message: "error creating secret"})
})

router.get('/secrets', authenticateUser , async (req: UserRequest, res: Response, next: NextFunction)=>{
    const user = JSON.parse(JSON.stringify(req.user))

    const secret = await Secret.findOne({
        username: user.username
    })

    if(!secret){
        return res.json({ message:"No secret found" })
    }
    
    return res.json(secret?.secret)
} )

export default router