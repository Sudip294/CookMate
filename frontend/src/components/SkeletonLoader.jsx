import React from 'react';
import { motion } from 'framer-motion';

const SkeletonLoader = ({ type }) => {
  if (type === 'card') {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md animate-pulse">
        <div className="h-48 bg-gray-300 dark:bg-gray-600 w-full mb-4"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
          <div className="flex justify-between items-center">
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="animate-pulse">
         <div className="h-64 sm:h-96 bg-gray-300 dark:bg-gray-600 rounded-xl mb-8 w-full"></div>
         <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
         <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-8"></div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
               <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
               <div className="space-y-2">
                 {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                 ))}
               </div>
            </div>
            <div>
               <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4"></div>
               <div className="space-y-2">
                 {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
                 ))}
               </div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
  );
};

export default SkeletonLoader;
