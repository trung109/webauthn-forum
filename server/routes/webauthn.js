import express from 'express'
import { getLoginChallenge, getRegisterChallenge, registerWebAuthn, loginWebAuthn } from '../controllers/webauthn.js';
import { requireSignIn } from '../middlewares/index.js';
const router = express.Router()

router.post('/webauthn/getChallenge/register', requireSignIn, getRegisterChallenge);
router.post('/webauthn/getChallenge/login', getLoginChallenge);
router.post('/webauthn/register', requireSignIn, registerWebAuthn)
router.post('/webauthn/login', loginWebAuthn)
export default router;