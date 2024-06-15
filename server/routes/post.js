import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  getPendingPosts,
  approvePost,
  declinePost,
  getPostComments,
  searchPosts,
} from "../controllers/post.js";
import { requireSignIn, requireAdmin } from "../middlewares/index.js";

import { rateLimit } from "express-rate-limit";


router.post("/post", requireSignIn, createPost);

router.get("/post", getPostById);
router.get("/post/comments", getPostComments);
router.get("/post/:start", getPosts);
router.post("/post/search", searchPosts);

router.post("/post/pending", requireAdmin, getPendingPosts);
router.post("/post/approvePost", requireAdmin, approvePost);
router.post("/post/declinePost", requireAdmin, declinePost);
export default router;
