import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema({
    id: {
        type: String,
        require: true,
        unique: true
    },
    author: {
        type: String,
        trim: true,
        require: true,
    },
    content: {
        type: String,
        require: true
    },
    postId: {
        type: Number,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { timestamp: true })



export default mongoose.model('Comment', commentSchema)

