import express from 'express'
import { createPost, getPosts, getPostById, getPendingPosts, approvePost, declinePost, getPostComments, searchPosts } from '../controllers/post.js'
import { requireSignIn , requireAdmin} from '../middlewares/index.js'

import { rateLimit } from 'express-rate-limit'



const router = express.Router()

// const authLimiter = rateLimit({
// 	windowMs: 5 * 60 * 1000, // 15 minutes
// 	limit: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
// 	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
//     statusCode: 404,
// 	message: 'Too many request, try again later'
// })

// router.use(authLimiter)

router.post('/post', requireSignIn,createPost)

router.get('/post', getPostById)
router.get('/post/comments', getPostComments)
router.get('/post/:start', getPosts)
router.post('/post/search', searchPosts)

router.post('/post/pending', requireAdmin, getPendingPosts)
router.post('/post/approvePost', requireAdmin, approvePost)
router.post('/post/declinePost', requireAdmin, declinePost)
export default router
