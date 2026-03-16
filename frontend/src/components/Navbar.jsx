import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { Sun, Moon, Menu, X, ChefHat, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    ...(user ? [
      { name: 'Favorites', path: '/favorites' },
      { name: 'History', path: '/history' }
    ] : [])
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary p-2 rounded-lg text-white group-hover:rotate-12 transition-transform duration-300">
              <ChefHat size={24} />
            </div>
            <span className="font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
              Cook<span className="text-primary">Mate</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-primary relative ${
                    isActive(link.path) ? 'text-primary' : 'text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4 border-l border-gray-200 dark:border-gray-700 pl-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Toggle Theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Hi, {user.name}
                  </span>
                  <button
                    onClick={logout}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-primary hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
                  >
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
             <button
                onClick={toggleTheme}
                className="p-2 text-gray-500 dark:text-gray-400"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-dark"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                   <div className="space-y-3">
                      <div className="px-3 text-sm text-gray-500">Logged in as {user.email}</div>
                      <button
                        onClick={() => { logout(); setIsOpen(false); }}
                        className="w-full flex items-center text-left px-3 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md font-medium"
                      >
                        <LogOut size={20} className="mr-2" /> Logout
                      </button>
                   </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 px-3">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 font-medium"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-2 bg-primary text-white rounded-lg font-medium"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
