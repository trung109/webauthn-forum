import express from 'express'
import { getUserInfo } from '../controllers/user.js'
import { requireSignIn } from '../middlewares/index.js'
const router = express.Router()

router.get('/user', requireSignIn, getUserInfo)

export default router