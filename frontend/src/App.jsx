import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Favorites from './pages/Favorites';
import History from './pages/History';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import OtpReset from './pages/auth/OtpReset';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Toaster position="top-center" toastOptions={{ className: 'dark:bg-gray-800 dark:text-white' }} />
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<OtpReset />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

