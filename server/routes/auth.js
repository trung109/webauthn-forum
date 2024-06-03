import express from "express";
import { register, login, resetPassword } from "../controllers/auth.js";
const router = express.Router();
import { rateLimit } from "express-rate-limit";


const authLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header,
    statusCode: 404,
	message: 'Too many request, try again later'
})

const resetPasswordLimiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 1, // Limit each IP to 2 requests per `window` (here, per 2 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header,
    statusCode: 404,
	message: 'Too many request, try again later'
})


router.post('/auth/register', register)
router.post('/auth/login', authLimiter, login)
router.post('/auth/reset-password', resetPasswordLimiter, resetPassword);

export default router;
