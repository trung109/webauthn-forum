import mongoose from "mongoose";
const { Schema } = mongoose;

const webauthnChallengeSchema = new Schema({
    id: {
        type: String,
        trim: true,
        default: '',
        unique: true
    },
    username: {
        type: String,
        trim: true,
        require: true,
    },
    value: {
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

export default mongoose.model('WebauthnChallenge', webauthnChallengeSchema)