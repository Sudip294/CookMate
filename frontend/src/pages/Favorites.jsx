import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const Favorites = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFavorites = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await api.get('/user/favorites');
                // Normalize recipeId to id for RecipeCard
                const normalizedData = (data || []).map(recipe => ({
                    ...recipe,
                    id: recipe.recipeId
                }));
                setRecipes(normalizedData);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load favorites');
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [user]);

    const removeFavorite = async (id) => {
        try {
            await api.delete(`/user/favorites/${id}`);
            setRecipes(recipes.filter(recipe => recipe.id !== id));
            toast.success('Removed from favorites');
        } catch (error) {
            toast.error('Failed to remove favorite');
        }
    };

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="py-8">
            <h1 className="text-3xl font-extrabold mb-8 border-b-4 border-primary inline-block pb-2">My Favorites</h1>
            
            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => <SkeletonLoader key={i} type="card" />)}
                </div>
            ) : recipes.length > 0 ? (
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {recipes.map(recipe => (
                            <motion.div
                                key={recipe.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                className="relative group"
                            >
                                <RecipeCard recipe={recipe} />
                                <button
                                    onClick={() => removeFavorite(recipe.id)}
                                    className="absolute top-4 left-4 bg-white/90 dark:bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50 dark:hover:bg-gray-800"
                                >
                                    Remove
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">You haven't saved any recipes yet.</p>
                </div>
            )}
        </div>
    );
};

export default Favorites;
