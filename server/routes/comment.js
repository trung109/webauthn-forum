import express from "express";
import { addComment, editComment } from "../controllers/comment.js";
import { requireSignIn } from "../middlewares/index.js";

import { rateLimit } from "express-rate-limit";


const router = express.Router();

// const authLimiter = rateLimit({
// 	windowMs: 5 * 60 * 1000, 
// 	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     statusCode: 404,
// 	message: 'Too many request, try again later'
// })
// router.use(authLimiter)
router.post('/comment/add',  requireSignIn, addComment);
router.post('/comment/edit', requireSignIn, editComment);

export default router;
