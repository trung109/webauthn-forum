import express from "express";
import { activateAccount, resetPassword } from "../controllers/resend.js";
import { requireSignIn } from "../middlewares/index.js";
import { rateLimit } from "express-rate-limit";

const router = express.Router();

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  limit: 1, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  statusCode: 404,
  message: "Too many request, try again later",
});

// router.use(limiter);

router.post("/user/get-activate-link", requireSignIn, activateAccount);
// router.get('/reset-password', resetPassword)

export default router;
