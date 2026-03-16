import express from 'express';
import protect from '../middleware/protect.js';
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getHistory,
  addHistory,
  clearHistory,
} from '../controllers/userController.js';

const router = express.Router();

// All routes below are protected
router.use(protect);

router.get('/favorites', getFavorites);
router.post('/favorites', addFavorite);
router.delete('/favorites/:recipeId', removeFavorite);

router.get('/history', getHistory);
router.post('/history', addHistory);
router.delete('/history', clearHistory);

export default router;
