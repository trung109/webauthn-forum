import express from "express";
import { register, login, resetPassword } from "../controllers/auth.js";
const router = express.Router();
import { rateLimit } from "express-rate-limit";

<<<<<<< HEAD
// const authLimiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	// standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header,
//     // statusCode: 404,
// 	// message: 'Too many request, try again later'
// })
// router.use(authLimiter)
=======
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header,
  statusCode: 404,
  message: "Too many request, try again later",
});
router.use(authLimiter);
>>>>>>> 99003ce8f7251e58a232c992d54862d23859f133

router.post("/auth/register", register);
router.post("/auth/login", login);
// router.post('/auth/verify-account', verifyAccount);
router.post("/auth/reset-password", resetPassword);

export default router;
