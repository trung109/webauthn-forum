import mongoose from "mongoose";
import User from '../models/user.js'
const {Schema} = mongoose;

const postSchema = new Schema( {
    id: {
        type: int,
        require: true,
        unique: true
    }, 
    title: {
        type: String,
        trim: true,
        require: true,
    }, 
    username: {
        type: String,
        trim: true,
        require: true,
        unique: true
    }, 
    content: {
        type: String,
        require: true

    },
    tag: {
        type: [String],
        require: true
    }
}, {timestamp: true})

export default mongoose.model('Post', postSchema)

