import express from 'express';
import { login, getCurrentUser } from '../controllers/authController';
import { verifyAuth } from '../middleware/authMiddleware';

const router = express.Router();

// Login
router.post('/login', login);

// Get current user
router.get('/me', verifyAuth, getCurrentUser);

export default router;
