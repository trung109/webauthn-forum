import express from 'express'
import { getSelfProfile, getFullUserInfoByUserId, changeUserInfo, verifyActivation, updatePassword, getAllUsers } from '../controllers/user.js'
import { requireSignIn } from '../middlewares/index.js'
const router = express.Router()

router.post('/user', requireSignIn, getSelfProfile);
router.post('/user/activate', verifyActivation);
router.get('/user', getFullUserInfoByUserId);
router.post('/user/changeInfo', requireSignIn, changeUserInfo);
router.get('/user/allUsers', getAllUsers );
router.post('/user/updatePassword', requireSignIn, updatePassword);

export default router