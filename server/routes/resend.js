import express from 'express';
import { activateAccount , resetPassword } from "../controllers/resend.js";


const router = express.Router()

router.post('/get-activate-link', activateAccount)
// router.get('/post', getPostById)


export default router;