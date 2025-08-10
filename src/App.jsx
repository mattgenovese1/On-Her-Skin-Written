// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import bookCover from './assets/book_cover_concept.jpg';
import BuyNowPage from './BuyNowPage';
import ReadSamplePage from './ReadSamplePage';
import BlogPostPage from './BlogPostPage';
import BlogPage from './BlogPage'; 
import ContactForm from './ContactForm'; 

// Simple SVG icons as components to replace the problematic imports
const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const MailIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

// Placeholder components (you will replace these with actual content later)
const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"
    >
      <div className="text-center max-w-3xl mx-auto">
        <img src={bookCover} alt="On Her Skin Written Book Cover" className="w-64 h-auto mx-auto mb-8 rounded-lg shadow-lg border border-red-900/50" />
        <h1 className="text-5xl font-serif font-bold mb-4">On Her Skin Written</h1>
        <h2 className="text-2xl font-sans text-gray-300 mb-6">by Matthew Genovese</h2>
        <p className="text-lg leading-relaxed mb-8">
          A gripping narrative in rhyming verse, exploring humanity's darkest tendencies with unflinching realism, empathy, and dark humor.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/buy-now" className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg">
            Buy Now
          </Link>
          <Link to="/read-sample" className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg">
            Read Sample
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"
    >
      <h1 className="text-4xl font-serif font-bold mb-4">About Matthew Genovese</h1>
      <p className="text-gray-300 mb-6 leading-relaxed">
                Matthew Genovese is a debut novelist whose work explores the intersection of poetry and prose, 
                beauty and brutality. Born from a desire to give voice to society's most marginalized stories, 
                his writing doesn't shy away from difficult truths or challenging themes.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "On Her Skin Written," his first novel, represents years of careful craftsmanship—a work that 
                transforms the darkest aspects of human experience into something approaching art. Written entirely 
                in rhyming verse, the novel tackles subjects that most fiction avoids, doing so with a combination 
                of unflinching honesty and unexpected empathy.
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Genovese believes that literature's highest calling is to illuminate the shadows where society 
                prefers not to look. His work is influenced by the transgressive fiction tradition, the confessional 
                poetry movement, and a deep belief that every story—no matter how dark—deserves to be told with 
                dignity and artistic integrity.
              </p>
              <p className="text-gray-300 leading-relaxed">
                When not writing, Genovese can be found contemplating the failures of 90s television and the 
                decline of baseball—subjects that, perhaps surprisingly, find their way into his literary work.
              </p>
    </motion.div>
  );
};

const ReviewsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"
    >
     <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">Reviews</h1>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-400">
              "On Her Skin Written" is just beginning its journey. 
              Reviews and testimonials will be featured here as they become available.
            </p>
          </div>

          <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Leave a Review</h2>
            <p className="text-gray-300 mb-6">
              Have you read "On Her Skin Written"? We'd love to hear your thoughts. 
              Please consider leaving a review on:
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <a href="https://a.co/d/giDgp2B" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
                Amazon
              </a>
              <a href="https://www.goodreads.com/book/show/239557654-on-her-skin-written" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
                Goodreads
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
                BookBub
              </a>
            </div>
            </div>
    </motion.div>
  );
};

// Fixed Footer component with working SVG icons
const Footer = () => {
  return (
    <footer className="bg-black/95 text-gray-400 py-8 px-4 sm:px-6 lg:px-8 border-t border-red-900/20 text-center">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <FacebookIcon size={24} />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
          <InstagramIcon size={24} />
        </a>
        <a href="mailto:mattgenovese@proton.me" className="text-gray-400 hover:text-white transition-colors">
          <MailIcon size={24} />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Matthew Genovese. All rights reserved.</p>
    </footer>
  );
};

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-black/95 p-4 border-b border-red-900/20 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-serif font-bold">
          On Her Skin Written
        </Link>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-gray-300 hover:text-white transition-colors ${location.pathname === item.path ? 'text-white border-b-2 border-red-700' : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-black/90 mt-4 rounded-lg shadow-lg"
        >
          <div className="flex flex-col space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block text-gray-300 hover:text-white transition-colors py-2 px-3 rounded ${location.pathname === item.path ? 'bg-red-900/30 text-white' : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/buy-now" element={<BuyNowPage />} />
            <Route path="/read-sample" element={<ReadSamplePage />} />
          </Routes>
        </AnimatePresence>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App