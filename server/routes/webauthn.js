import express from "express";
import {
  getLoginChallenge,
  getRegisterChallenge,
  registerWebAuthn,
  loginWebAuthn,
} from "../controllers/webauthn.js";
import { requireSignIn } from "../middlewares/index.js";
import { rateLimit } from "express-rate-limit";

const webAuthnLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  statusCode: 404,
  message: "Too many request, try again later",
});
const router = express.Router();
// router.use(webAuthnLimiter);

router.post(
  "/webauthn/getChallenge/register",
  requireSignIn,
  getRegisterChallenge
);
router.post("/webauthn/getChallenge/login", getLoginChallenge);
router.post("/webauthn/register", requireSignIn, registerWebAuthn);
router.post("/webauthn/login", loginWebAuthn);
export default router;
