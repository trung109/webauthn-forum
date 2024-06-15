//JWT LOGIC 
import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (username, user_nonce, role ) => {
    const payload = {
        name: username,
        nonce: user_nonce,
        role: role
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: '6h',
        algorithm: 'HS256',
        issuer:'All-for-one-gate'
    });
    return token;
}


export var generateHash = (input) => {
    var hash =  crypto.createHash('sha256');
    hash.update(input + "somenonce");
    var pasword_hash = hash.digest('hex').slice(0,128);
    return pasword_hash;
}


