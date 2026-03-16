import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import Pagination from '../components/Pagination';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  }
};

const Home = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const RECIPES_PER_PAGE = 12;

  const fetchRecipes = async (searchQuery, pageNum) => {
    setLoading(true);
    try {
      if (!searchQuery) {
        // Fetch popular recipes if no query
        const { data } = await api.get('/recipes/popular');
        setRecipes(data.results || []);
        setTotalPages(1); // Random returns a fixed set, usually 1 page
      } else {
        // Fetch specific search query
        const offset = (pageNum - 1) * RECIPES_PER_PAGE;
        const { data } = await api.get('/recipes/search', {
          params: { query: searchQuery, offset, number: RECIPES_PER_PAGE }
        });
        setRecipes(data.results || []);
        setTotalPages(Math.ceil((data.totalResults || 0) / RECIPES_PER_PAGE));
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to load recipes. Is your Spoonacular API key set?');
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]); // Only re-fetch automatically when page changes

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 for new search
    fetchRecipes(query, 1);
  };

  return (
    <div className="py-8">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="max-w-3xl mx-auto text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
          Find your next <span className="text-primary">culinary masterpiece</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          Search through thousands of recipes from around the world. Whether you crave sweet, savory, or something in between, we have you covered.
        </p>
        
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search recipes, ingredients, categories..."
              className="w-full py-4 pl-12 pr-32 rounded-full border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-lg"
            />
            <Search className="absolute left-4 text-gray-400" size={24} />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-red-600 text-white px-6 rounded-full font-medium transition-colors shadow-md"
            >
              Search
            </button>
          </div>
        </form>
      </motion.div>

      <div className="mb-6 flex justify-between items-end">
        <h2 className="text-2xl font-bold border-b-4 border-primary inline-block pb-1">
          {query ? `Results for "${query}"` : 'Popular Recipes'}
        </h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonLoader key={i} type="card" />
          ))}
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {recipes.map((recipe) => (
            <motion.div key={recipe.id} variants={itemVariants}>
              <RecipeCard recipe={recipe} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {recipes.length === 0 && !loading && (
        <div className="text-center py-20">
          <h3 className="text-2xl font-medium text-gray-500">No recipes found.</h3>
          <p className="text-gray-400 mt-2">Try adjusting your search terms.</p>
        </div>
      )}

      {!loading && recipes.length > 0 && totalPages > 1 && (
        <Pagination 
          currentPage={page} 
          totalPages={totalPages} 
          onPageChange={setPage} 
        />
      )}
    </div>
  );
};

export default Home;

