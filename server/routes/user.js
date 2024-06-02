import express from "express";
import {
  getSelfProfile,
  getFullUserInfoByUserId,
  changeUserInfo,
  verifyActivation,
  updatePassword,
  getAllUsers,
  updateRole,
} from "../controllers/user.js";
import { requireAdmin, requireSignIn } from "../middlewares/index.js";

import { rateLimit } from "express-rate-limit";

const authLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 minutes
  limit: 20, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  statusCode: 404,
  message: "Too many request, try again later",
});

const router = express.Router();

// router.use(authLimiter);

router.post("/user", requireSignIn, getSelfProfile);
router.post("/user/activate", verifyActivation);
router.get("/user", getFullUserInfoByUserId);
router.post("/user/changeInfo", requireSignIn, changeUserInfo);
router.get("/user/allUsers", getAllUsers);
router.post("/user/updatePassword", requireSignIn, updatePassword);

router.post("/user/updateRole", requireAdmin, updateRole);

export default router;
