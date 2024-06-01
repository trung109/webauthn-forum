import express from 'express'
import { getSelfProfile, getFullUserInfoByUserId, changeUserInfo, verifyActivation, getAllUsers } from '../controllers/user.js'
import { requireSignIn } from '../middlewares/index.js'
const router = express.Router()

router.post('/user', requireSignIn, getSelfProfile);
router.post('/activate', verifyActivation);
router.get('/user', getFullUserInfoByUserId);
router.post('/changeInfo', changeUserInfo);
router.get('/user/allUsers', getAllUsers )

export default router