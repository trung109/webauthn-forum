import express from 'express';
import { activateAccount , resetPassword } from "../controllers/resend.js";
import { requireSignIn } from '../middlewares/index.js';



const router = express.Router()

router.post('/user/get-activate-link', requireSignIn, activateAccount)
// router.get('/reset-password', resetPassword)


export default router;