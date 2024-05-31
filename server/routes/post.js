import express from 'express'
import { createPost, getPosts, getPostById } from '../controllers/post.js'
import { requireSignIn } from '../middlewares/index.js'

const router = express.Router()

router.post('/post', requireSignIn,createPost)
router.get('/post',requireSignIn, getPostById)
router.get('/post/:start', getPosts)

export default router
