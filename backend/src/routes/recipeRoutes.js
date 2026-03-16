import express from 'express';
import { searchRecipes, getRecipeDetails, getPopularRecipes } from '../controllers/recipeController.js';

const router = express.Router();

router.get('/search', searchRecipes);
router.get('/popular', getPopularRecipes);
router.get('/:id', getRecipeDetails);

export default router;
