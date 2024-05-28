import express from 'express'


const router = express.Router()

router.post('/post', createPost)
router.get('/post/:postId', getPost)

export default router
