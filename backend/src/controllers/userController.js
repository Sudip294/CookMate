import User from '../models/User.js';

// @desc    Get user's favorites
// @route   GET /api/user/favorites
// @access  Private
export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Add a recipe to favorites
// @route   POST /api/user/favorites
// @access  Private
export const addFavorite = async (req, res) => {
  try {
    const { recipeId, title, image, readyInMinutes } = req.body;
    if (!recipeId || !title) {
      return res.status(400).json({ message: 'Recipe ID and title are required.' });
    }

    const user = await User.findById(req.user.id);
    const alreadySaved = user.favorites.some((f) => f.recipeId === String(recipeId));
    if (alreadySaved) {
      return res.status(409).json({ message: 'Recipe already in favorites.' });
    }

    user.favorites.unshift({ recipeId: String(recipeId), title, image, readyInMinutes });
    await user.save();

    res.status(201).json({ message: 'Recipe added to favorites.', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Remove a recipe from favorites
// @route   DELETE /api/user/favorites/:recipeId
// @access  Private
export const removeFavorite = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.favorites = user.favorites.filter((f) => f.recipeId !== req.params.recipeId);
    await user.save();
    res.json({ message: 'Recipe removed from favorites.', favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Get user's search/view history
// @route   GET /api/user/history
// @access  Private
export const getHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.history);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Add a recipe to view history
// @route   POST /api/user/history
// @access  Private
export const addHistory = async (req, res) => {
  try {
    const { recipeId, title, image } = req.body;
    if (!recipeId || !title) {
      return res.status(400).json({ message: 'Recipe ID and title are required.' });
    }

    const user = await User.findById(req.user.id);

    // Remove duplicate entry if it already exists & re-add at top
    user.history = user.history.filter((h) => h.recipeId !== String(recipeId));
    user.history.unshift({ recipeId: String(recipeId), title, image });

    // Keep only last 50 entries
    if (user.history.length > 50) user.history = user.history.slice(0, 50);

    await user.save();
    res.status(201).json({ message: 'Recipe added to history.', history: user.history });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// @desc    Clear full history
// @route   DELETE /api/user/history
// @access  Private
export const clearHistory = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, { history: [] });
    res.json({ message: 'History cleared.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};
