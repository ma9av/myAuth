import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import { connect } from './database/connection.ts'
import router from './router/userRouter.ts'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', 'https://localhost:5173'); // Restrict to a specific origin
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true'); // Include credentials
    next();
  });

  
app.use(express.json())
app.use(cookieParser())

connect("mongodb://localhost:27017")

app.use(router)

app.get('/', (req:Request, res:Response) => {
    res.send('Hola amigo')
})

app.listen(8080, ()=>{
    console.log("port is on 8080");
    
})

