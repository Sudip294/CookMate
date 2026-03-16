import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { forgotPassword, resetPassword } from '../controllers/otpController.js';
import protect from '../middleware/protect.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

export default router;
