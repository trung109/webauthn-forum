import mongoose from "mongoose";
import { type } from "os";

const {Schema} = mongoose;

export const userSchema = new Schema( {
    name: {
        type: String,
        trim: true,
    }, 
    id: {
        type: String,
        require: true,
        unique: true
    }, 
    username: {
        type: String,
        trim: true,
        require: true,
        unique: true
    }, 
    email: {
        type: String,
        trim: true,
        require: true,
        unique: true
    }, 
    password: {
        type: String,
        require: true,
        min: 8
    }, 
    bio: {
        type: String,
        max: 256
    }, 
    photoUrl: {
        type: String, 
        default:'/assets/images/default-avatar.jpg'
    },
    role: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
}, {timestamp: true})

export default mongoose.model('User', userSchema)

