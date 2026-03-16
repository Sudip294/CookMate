import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Clock, Users, ArrowLeft, CheckCircle } from 'lucide-react';
import SkeletonLoader from '../components/SkeletonLoader';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/recipes/${id}`);
        setRecipe(data);
        
        // Add to history
        await api.post('/user/history', {
          recipeId: id,
          title: data.title,
          image: data.image
        });

        // Check if favorite
        const favResponse = await api.get('/user/favorites');
        const favorites = favResponse.data || [];
        setIsFavorite(favorites.some(fav => fav.recipeId === id));
      } catch (error) {
        console.error(error);
        toast.error('Failed to load recipe details.');
      } finally {
        setLoading(false);
      }
    };
    fetchRecipeDetails();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await api.delete(`/user/favorites/${id}`);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await api.post('/user/favorites', {
          recipeId: id,
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

  if (loading) return <div className="py-8"><SkeletonLoader type="details" /></div>;
  if (!recipe) return <div className="text-center py-20 text-xl font-medium">Recipe not found.</div>;

  // Extract instructions handling Spoonacular's varied format
  const instructions = recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-8"
    >
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors font-medium">
        <ArrowLeft className="mr-2" size={20} /> Back to recipes
      </Link>

      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="relative h-64 sm:h-96 w-full">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <button 
              onClick={toggleFavorite}
              className={`bg-white/80 dark:bg-black/50 backdrop-blur-md p-3 rounded-full transition-colors hover:scale-110 shadow-lg ${isFavorite ? 'text-primary' : 'hover:text-primary'}`}
            >
              <Heart size={24} className={isFavorite ? 'fill-primary' : 'hover:fill-primary'} />
            </button>
          </div>
        </div>

        <div className="p-8">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white leading-tight">
            {recipe.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base text-gray-600 dark:text-gray-300 font-medium">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <Clock className="mr-2 text-primary" size={20} /> 
              {recipe.readyInMinutes} Minutes
            </div>
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
              <Users className="mr-2 text-primary" size={20} /> 
              {recipe.servings} Servings
            </div>
          </div>

          <p dangerouslySetInnerHTML={{ __html: recipe.summary }} className="text-lg text-gray-700 dark:text-gray-300 mb-10 leading-relaxed [a]:text-primary [a]:underline" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold mb-6 border-b-2 border-primary inline-block pb-2">Ingredients</h3>
              <ul className="space-y-4">
                {recipe.extendedIngredients?.map((ing) => (
                  <li key={ing.id || Math.random()} className="flex items-start text-gray-700 dark:text-gray-300">
                    <CheckCircle className="mr-3 text-primary shrink-0 mt-0.5" size={18} />
                    <span className="leading-tight">{ing.original}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-6 border-b-2 border-primary inline-block pb-2">Instructions</h3>
              {instructions.length > 0 ? (
                <div className="space-y-8">
                  {instructions.map((step) => (
                    <div key={step.number} className="flex">
                      <div className="flex-shrink-0 mr-6">
                        <div className="w-10 h-10 bg-primary/10 text-primary font-bold rounded-full flex items-center justify-center text-lg border border-primary/20">
                          {step.number}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed pt-1">
                        {step.step}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Detailed instructions are not available for this recipe.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetails;
