import { log } from "console";
import mongoose from "mongoose";

export const connect = async (url:string)=>{
    try {
        const result = await mongoose.connect(url)
        log("connected successfully")

    } catch (error) {
        console.error(error);
    }
}

