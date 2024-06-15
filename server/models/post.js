import mongoose from "mongoose";
import { PostCounter } from '../models/counter.js'
const { Schema } = mongoose;

const postSchema = new Schema({
    id: {
        type: Number,
        require: true,
        unique: true
    },
    title: {
        type: String,
        trim: true,
        require: true,
    },
    author: {
        type: Object,
        trim: true,
        require: true,
    },
    content: {
        type: String,
        require: true
    },
    tags: {
        type: [String],
        require: true
    },
    upvotes: {
        type: Number,
        default: 0
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    state: {
        type: String,
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamp: true })

postSchema.pre('save', async function (next) {
    const post = this;

    post.updatedAt = new Date();
    if (post.isNew) {
        try {
            let counter = await PostCounter.findByIdAndUpdate(
                { _id: 'postId' },
                { $inc: { seq: 1 } },
                { new: true, upsert: true }
            );
            post.id = counter.seq;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }

});


export default mongoose.model('Post', postSchema)

