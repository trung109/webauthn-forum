import mongoose from "mongoose";
const { Schema } = mongoose;

const credentialsSchema = new Schema({
    username: {
        type: String,
        trim: true,
        require: true,
    },
    credential: {
        type: Object,
        default: {}
    }
}, { timestamp: true })

export default mongoose.model('Credentials', credentialsSchema)