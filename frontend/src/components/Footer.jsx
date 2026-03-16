import React from 'react';
import { ChefHat, Github, Twitter, Instagram, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8 transition-colors duration-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 group mb-6 inline-flex">
              <div className="bg-primary p-2 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
                <ChefHat size={24} />
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                Cook<span className="text-primary">Mate</span>
              </span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm leading-relaxed">
              Your ultimate destination for finding, saving, and cooking the world's most delicious recipes. Powered by Spoonacular.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 text-gray-400 hover:text-primary dark:hover:text-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-primary dark:hover:text-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Instagram size={20} />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-primary dark:hover:text-primary transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Explore</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link to="/favorites" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">My Favorites</Link></li>
              <li><Link to="/history" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Recently Viewed</Link></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Popular Diets</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-wider text-sm">Legal</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-sm">Contact Us</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} CookMate. All rights reserved. | Designed By Sudip bag.</p>
          <p className="mt-4 md:mt-0 flex items-center">
            Made with <Heart size={14} className="mx-1 text-primary fill-primary" /> for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
