import express from 'express'
import { createPost, getPosts, getPostById, getPendingPosts } from '../controllers/post.js'
import { requireSignIn } from '../middlewares/index.js'

const router = express.Router()

router.post('/post', requireSignIn,createPost)
router.get('/post', getPostById)
router.get('/post/:start', getPosts)
router.get('/post/pending', getPendingPosts)

export default router
