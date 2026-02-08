import express from 'express';
import { body } from 'express-validator';
import {
  getAllPosts,
  getPostBySlug,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  getLatestPosts
} from '../controllers/blogController';
import { verifyAuth, verifyAdmin } from '../middleware/authMiddleware';

const router = express.Router();

// Validation rules
const postValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('slug').trim().notEmpty().withMessage('Slug is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('thumbnail').trim().notEmpty().withMessage('Thumbnail is required'),
  body('category').isIn(['SEO', 'Link Building', 'Content Strategy', 'Case Study', 'Tips & Tricks']).withMessage('Invalid category'),
  body('author.name').trim().notEmpty().withMessage('Author name is required'),
  body('author.avatar').trim().notEmpty().withMessage('Valid author avatar is required'),
  body('author.bio').trim().notEmpty().withMessage('Author bio is required'),
  body('readTime').notEmpty().withMessage('Read time is required'),
  body('tags').isArray().withMessage('Tags must be an array')
];

// Public routes
router.get('/blogs/latest', getLatestPosts);
router.get('/blogs/slug/:slug', getPostBySlug);
router.get('/blogs/category/:category', getPostsByCategory);
router.get('/blogs', getAllPosts);
router.get('/blogs/:id', getPostById);

// Protected routes (admin only)
router.post('/blogs', verifyAuth, verifyAdmin, postValidation, createPost);
router.put('/blogs/:id', verifyAuth, verifyAdmin, postValidation, updatePost);
router.delete('/blogs/:id', verifyAuth, verifyAdmin, deletePost);

export default router;
