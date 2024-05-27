//TESTING FUNCTIONS HERE
import jwt from "jsonwebtoken";
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
        issuer: 'All-for-one-gate',
    });
    return token;
}

console.log(generateToken("fuck", "you", "too"));