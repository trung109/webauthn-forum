import express from 'express'
import { createPost, getPosts, getPostById } from '../controllers/post.js'

const router = express.Router()

router.post('/post', createPost)
router.get('/post', getPostById)
router.get('/post/:start', getPosts)

export default router
