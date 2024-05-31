import mongoose from "mongoose";
const { Schema } = mongoose;

const activateTokenSchema = new Schema({
    username: {
        type: String,
        trim: true,
        require: true,
        unique: true
    },
    token: {
        type: String,
        trim: true,
        default: '',
        unique: true
    },
    issueat: {
        type: Number,
        default: 0,
        require: true
    },
    expire: {
        type: Number,
        default: 0,
        require: true
    }
}, { timestamp: true })

export default mongoose.model('ActivateToken', activateTokenSchema)

