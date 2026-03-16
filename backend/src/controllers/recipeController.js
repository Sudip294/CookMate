import axios from 'axios';

const SPOONACULAR_URL = 'https://api.spoonacular.com/recipes';

// @desc    Search recipes
// @route   GET /api/recipes/search
// @access  Public
export const searchRecipes = async (req, res) => {
  try {
    const { query, offset = 0, number = 12 } = req.query;

    const response = await axios.get(`${SPOONACULAR_URL}/complexSearch`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        query,
        offset,
        number,
        addRecipeInformation: true,
        fillIngredients: true,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch recipes from external API.' });
  }
};

// @desc    Get single recipe details
// @route   GET /api/recipes/:id
// @access  Public
export const getRecipeDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axios.get(`${SPOONACULAR_URL}/${id}/information`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Spoonacular API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch recipe details.' });
  }
};

// @desc    Get popular/random recipes (for home page initial load)
// @route   GET /api/recipes/popular
// @access  Public
export const getPopularRecipes = async (req, res) => {
  try {
    const response = await axios.get(`${SPOONACULAR_URL}/random`, {
      params: {
        apiKey: process.env.SPOONACULAR_API_KEY,
        number: 12,
      },
    });

    // Match output format to complexSearch for frontend consistency
    res.json({ results: response.data.recipes });
  } catch (error) {
    console.error('Spoonacular API Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to fetch popular recipes.' });
  }
};
