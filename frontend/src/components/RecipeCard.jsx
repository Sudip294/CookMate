import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Clock } from 'lucide-react';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const RecipeCard = ({ recipe }) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user) return;
      try {
        const { data } = await api.get('/user/favorites');
        setIsFavorite(data.some(fav => fav.recipeId === String(recipe.id)));
      } catch (error) {
        console.error('Error checking favorite:', error);
      }
    };
    checkFavorite();
  }, [user, recipe.id]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to favorite recipes');
      return;
    }

    try {
      if (isFavorite) {
        await api.delete(`/user/favorites/${recipe.id}`);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await api.post('/user/favorites', {
          recipeId: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes
        });
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorite');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col h-full"
    >
      <Link to={`/recipe/${recipe.id}`} className="relative block h-48 overflow-hidden group">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
          alt={recipe.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-medium bg-primary px-4 py-2 rounded-full shadow-md">View Recipe</span>
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/recipe/${recipe.id}`}>
            <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-2 hover:text-primary transition-colors">
            {recipe.title}
            </h3>
        </Link>
        
        <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-1 border border-gray-200 dark:border-gray-600 px-2 py-1 rounded-md">
            <Clock size={16} />
            <span>{recipe.readyInMinutes || 30} mins</span>
          </div>
          
          <button 
            onClick={toggleFavorite}
            className={`transition-colors focus:outline-none p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 ${isFavorite ? 'text-primary' : 'text-gray-400 hover:text-primary'}`}
          >
            <Heart size={20} className={isFavorite ? 'fill-primary' : 'hover:fill-primary'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
