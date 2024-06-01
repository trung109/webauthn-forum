import mongoose from "mongoose";


const { Schema } = mongoose;

export const userSchema = new Schema({
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
        default: '/assets/images/default-avatar.jpg'
    },
    role: {
        type: String,
        require: true,
        default: 'user'
    },
    joinedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        require: true,
        default: 'inactive'
    }
}, { timestamp: true })

export default mongoose.model('User', userSchema)

