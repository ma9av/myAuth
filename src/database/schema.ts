import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }

})

const secretSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    secret:{
        type: String,
        required: true
    }
})

export const User = mongoose.model('User', userSchema)
export const Secret = mongoose.model('Secret', secretSchema)
