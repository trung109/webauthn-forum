import express from 'express'
import { getSelfProfile, getFullUserInfoByUserId, changeUserInfo, verifyActivation, updatePassword, getAllUsers, updateRole} from '../controllers/user.js'
import { requireAdmin, requireSignIn } from '../middlewares/index.js'
const router = express.Router()

router.post('/user', requireSignIn, getSelfProfile);
router.post('/user/activate', verifyActivation);
router.get('/user', getFullUserInfoByUserId);
router.post('/user/changeInfo', requireSignIn, changeUserInfo);
router.get('/user/allUsers', getAllUsers );
router.post('/user/updatePassword', requireSignIn, updatePassword);

router.post('/user/updateRole', requireAdmin, updateRole);

export default router