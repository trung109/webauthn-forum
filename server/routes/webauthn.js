import express from 'express'
import { getChallenge } from '../controllers/webauthn.js';
import { requireSignIn } from '../middlewares/index.js';
const router = express.Router()

router.post('/webauthn/getChallenge', requireSignIn, getChallenge);

export default router;