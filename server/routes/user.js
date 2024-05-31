import express from 'express'
import { getSelfProfile } from '../controllers/user.js'
import { requireSignIn } from '../middlewares/index.js'
const router = express.Router()

router.post('/user', requireSignIn, getSelfProfile)
// router.post('/user', requireSignIn)
export default router