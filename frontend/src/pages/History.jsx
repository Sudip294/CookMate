import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from '../components/RecipeCard';
import SkeletonLoader from '../components/SkeletonLoader';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import api from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const History = () => {
    const { user } = useAuth();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!user) {
                setLoading(false);
                return;
            }
            try {
                const { data } = await api.get('/user/history');
                // Normalize recipeId to id for RecipeCard
                const normalizedData = (data || []).map(recipe => ({
                    ...recipe,
                    id: recipe.recipeId
                }));
                setRecipes(normalizedData);
            } catch (error) {
                console.error(error);
                toast.error('Failed to load history');
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [user]);

    const clearHistory = async () => {
        try {
            await api.delete('/user/history');
            setRecipes([]);
            toast.success('History cleared successfully');
        } catch (error) {
            toast.error('Failed to clear history');
        }
    };

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b-4 border-primary/20 pb-2">
                <h1 className="text-3xl font-extrabold border-b-4 border-primary -mb-[6px]">Recently Viewed</h1>
                
                {recipes.length > 0 && (
                    <button 
                        onClick={clearHistory}
                        className="mt-4 sm:mt-0 flex items-center text-sm font-medium text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <Trash2 size={16} className="mr-1" /> Clear History
                    </button>
                )}
            </div>
            
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
                            >
                                <RecipeCard recipe={recipe} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">You have no recently viewed recipes.</p>
                </div>
            )}
        </div>
    );
};

export default History;
