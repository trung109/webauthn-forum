import express from 'express'
import { register, login, resetPassword} from '../controllers/auth.js';
const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
// router.post('/auth/verify-account', verifyAccount);
router.post('/auth/reset-password', resetPassword);

export default router