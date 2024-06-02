import express from "express";
import { register, login, resetPassword } from "../controllers/auth.js";
const router = express.Router();
import { rateLimit } from "express-rate-limit";


// const authLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	// standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header,
//     // statusCode: 404,
// 	// message: 'Too many request, try again later'
// })
// router.use(authLimiter)


router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/reset-password', resetPassword);

export default router;
