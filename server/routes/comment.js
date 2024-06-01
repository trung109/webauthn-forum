import express from 'express'
import { addCommment, editComment } from '../controllers/comment.js';
import { requireSignIn } from '../middlewares/index.js';

const router = express.Router();

router.post('/comment/add',  requireSignIn, addCommment);
router.post('/comment/edit', requireSignIn, editComment);

export default router;