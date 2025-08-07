import express from 'express';
import { createPost, getAllPosts, getUserPosts } from '../controllers/postControllers.js';
import { isAuth } from '../middlewares/isAuth.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post("/create", isAuth, createPost);
router.get("/feed", isAuth, getAllPosts);
router.get("/user/:userId", isAuth, getUserPosts);

export default router;
