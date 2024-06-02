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


const router = express.Router();

<<<<<<< HEAD
// const authLimiter = rateLimit({
// 	windowMs: 1 * 60 * 1000, // 15 minutes
// 	limit: 200, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     statusCode: 404,
// 	message: 'Too many request, try again later'
// })
// router.use(authLimiter)
=======
router.use(authLimiter);
>>>>>>> 99003ce8f7251e58a232c992d54862d23859f133

router.post("/user", requireSignIn, getSelfProfile);
router.post("/user/activate", verifyActivation);
router.get("/user", getFullUserInfoByUserId);
router.post("/user/changeInfo", requireSignIn, changeUserInfo);
router.get("/user/allUsers", getAllUsers);
router.post("/user/updatePassword", requireSignIn, updatePassword);

router.post("/user/updateRole", requireAdmin, updateRole);

export default router;
