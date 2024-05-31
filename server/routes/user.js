import express from 'express'
import { getSelfProfile, getFullUserInfoByUserId } from '../controllers/user.js'
import { requireSignIn } from '../middlewares/index.js'
const router = express.Router()

router.post('/user', requireSignIn, getSelfProfile)
router.get('/user', getFullUserInfoByUserId)
export default router