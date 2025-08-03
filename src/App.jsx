import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Book, User, MessageSquare, Star, Menu, X, ExternalLink, Mail, Facebook, Instagram } from 'lucide-react'
import './App.css'
import bookCover from './assets/book_cover_concept.jpg'

// Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Home', icon: Book },
    { path: '/about', label: 'About the Author', icon: User },
    { path: '/reviews', label: 'Reviews', icon: Star },
    { path: '/blog', label: 'Blog', icon: MessageSquare }
  ]

  return (
    <nav className="bg-black/95 backdrop-blur-sm border-b border-red-900/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white font-serif text-xl font-bold">
            On Her Skin Written
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-red-400 bg-red-900/20'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 border-t border-gray-800"
            >
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-colors ${
                    location.pathname === path
                      ? 'text-red-400 bg-red-900/20'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

// Home Page Component
const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
                On Her Skin
                <span className="block text-red-400">Written</span>
              </h1>
              <p className="text-xl text-gray-300 mb-4 font-serif italic">
                by Matthew Genovese
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                A haunting tale of survival and revenge told entirely in rhyming verse. 
                This debut novel explores humanity's darkest impulses through Hannah's story—raw, 
                unflinching, and unlike anything you've read before.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center space-x-2">
                  <ExternalLink size={20} />
                  <span>Buy Now</span>
                </button>
                <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Read Sample
                </button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative">
                <img
                  src={bookCover}
                  alt="On Her Skin Written book cover"
                  className="w-80 h-auto shadow-2xl rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              Poetry Born from Pain
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Where darkness meets verse, where poetry meets transgressive fiction. 
              A literary experiment that transforms brutal reality into haunting art.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Unique Format",
                description: "The only contemporary novel tackling these themes entirely in rhyming verse",
                icon: "📖"
              },
              {
                title: "Authentic Voice",
                description: "Written by someone willing to explore society's most uncomfortable truths",
                icon: "🎭"
              },
              {
                title: "Literary Courage",
                description: "Addresses subjects most fiction avoids with artistic integrity",
                icon: "⚡"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-black/40 p-8 rounded-lg border border-gray-800 hover:border-red-900/50 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Warning Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-red-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Content Advisory</h3>
            <p className="text-gray-300 mb-4">
              "On Her Skin Written" contains explicit depictions of sexual violence, domestic abuse, 
              drug addiction, mental illness, and other mature themes. This book is intended for adult 
              readers who appreciate challenging literature that doesn't shy away from difficult subjects.
            </p>
            <p className="text-red-400 font-medium">Reader discretion is strongly advised.</p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

// About Page Component
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">About the Author</h1>
          
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Matthew Genovese</h2>
            <div className="prose prose-invert max-w-none">
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
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-serif font-bold text-white mb-4">Connect with Matthew</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Reviews Page Component
const ReviewsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
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
              <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
                Amazon
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
                Goodreads
              </a>
              <a href="#" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
                BookBub
              </a>
            </div>
          </div>

          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">For Reviewers</h2>
            <p className="text-gray-300 mb-4">
              Are you a book blogger, reviewer, or literary critic interested in reviewing "On Her Skin Written"? 
              We'd be happy to provide you with a review copy.
            </p>
            <p className="text-gray-300 mb-6">
              Please note: This book contains mature themes and explicit content. 
              It's intended for reviewers comfortable with transgressive fiction and dark literary themes.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors">
              Request Review Copy
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Blog Page Component
const BlogPage = () => {
  const blogPosts = [
    {
      title: "The Art of Writing in Verse: Why I Chose Rhyme",
      date: "Coming Soon",
      excerpt: "An exploration of the decision to write an entire novel in rhyming verse and the unique challenges it presented.",
      slug: "art-of-writing-in-verse"
    },
    {
      title: "Confronting Darkness: The Responsibility of Transgressive Fiction",
      date: "Coming Soon",
      excerpt: "A discussion on the ethical considerations of writing about difficult subjects and the importance of treating traumatic themes with respect.",
      slug: "confronting-darkness"
    },
    {
      title: "From Inspiration to Publication: The Journey of 'On Her Skin Written'",
      date: "Coming Soon",
      excerpt: "The story behind the story—how this novel came to be and what it means to finally share it with the world.",
      slug: "inspiration-to-publication"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">Blog</h1>
          
          <div className="text-center mb-12">
            <p className="text-xl text-gray-400">
              Insights, reflections, and behind-the-scenes thoughts from Matthew Genovese
            </p>
          </div>

          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/40 p-8 rounded-lg border border-gray-800 hover:border-red-900/50 transition-colors"
              >
                <h2 className="text-2xl font-serif font-bold text-white mb-3">
                  <a href={`#${post.slug}`} className="hover:text-red-400 transition-colors">
                    {post.title}
                  </a>
                </h2>
                <p className="text-red-400 text-sm mb-4">{post.date}</p>
                <p className="text-gray-300 leading-relaxed">{post.excerpt}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">
              More blog posts coming soon. Subscribe to stay updated on new content.
            </p>
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md transition-colors">
              Subscribe to Updates
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">On Her Skin Written</h3>
            <p className="text-gray-400">
              A novel in verse by Matthew Genovese. Poetry born from pain, 
              where darkness meets verse.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/reviews" className="text-gray-400 hover:text-white transition-colors">Reviews</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Matthew Genovese. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

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
          </Routes>
        </AnimatePresence>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App

