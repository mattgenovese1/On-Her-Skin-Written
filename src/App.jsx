

// src/App.jsx - Corrected Version with Fixed Footer and No Strapi Dependencies

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import bookCover from './assets/book_cover_concept.jpg';

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

// Static blog posts data
const blogPosts = [
  {
    id: 1,
    title: "The Journey Behind 'On Her Skin Written'",
    date: "December 15, 2024",
    excerpt: "Exploring the creative process behind my debut novel and the challenges of writing in rhyming verse about difficult subjects.",
    slug: "journey-behind-on-her-skin-written",
    content: `# The Journey Behind 'On Her Skin Written'

Writing "On Her Skin Written" was both the most challenging and rewarding experience of my creative life. The decision to tackle such difficult subject matter through the lens of rhyming verse wasn't made lightly.

## The Beginning

The story of Hannah came to me not as a complete narrative, but as fragments—images, emotions, and rhythms that demanded to be written. I found myself drawn to the musicality of language as a way to process and present experiences that are often too raw for conventional prose.

## The Challenge of Form

Many people ask why I chose rhyming verse for such serious subject matter. The answer lies in the power of rhythm and rhyme to create emotional distance while simultaneously drawing the reader deeper into the experience. The formal constraints of verse forced me to find precise, powerful language for each moment in Hannah's story.

## Research and Reality

While this is a work of fiction, it required extensive research into trauma, addiction, the criminal justice system, and the social services that are meant to help people like Hannah. Every aspect of her world needed to feel authentic, even when filtered through the lens of poetry.

## The Writing Process

Each chapter went through dozens of revisions. Finding the right rhythm, the perfect rhyme that didn't feel forced, the balance between beauty and brutality—it was like solving a complex puzzle where every piece had to fit perfectly.

## Why This Story Matters

Hannah's story is one that society often prefers to ignore. By telling it through verse, I hoped to create something that would stay with readers, that would make them think about the people we overlook and the systems that fail them.

The journey of writing this book changed me as a person and as a writer. I hope it will resonate with readers who understand that sometimes the most important stories are the hardest ones to tell.`
  },
  {
    id: 2,
    title: "Why Rhyming Verse for Dark Fiction?",
    date: "December 10, 2024",
    excerpt: "The unique choice to tell Hannah's story through poetry, and how rhythm and rhyme can enhance rather than diminish the impact of serious themes.",
    slug: "why-rhyming-verse-dark-fiction",
    content: `# Why Rhyming Verse for Dark Fiction?

Many readers have asked why I chose to tell such a serious story through rhyming verse. Doesn't poetry make light of heavy subjects?

The answer is quite the opposite.

## The Power of Constraint

Working within the constraints of rhyme and meter forces a writer to find the most essential, most powerful words. Every syllable must earn its place. This compression can actually intensify the emotional impact rather than diminish it.

## Historical Precedent

Some of literature's most powerful works have used verse to tackle difficult subjects. From Homer's depictions of war and suffering to more contemporary poets who've addressed trauma and social injustice, poetry has always been a vehicle for confronting hard truths.

## Rhythm and Memory

There's something about rhythm that makes words stick in our minds. The formal structure of verse can make difficult content more memorable, ensuring that the story stays with readers long after they've finished reading.

## Creating Distance and Intimacy

The formal structure of poetry creates a kind of aesthetic distance that can make unbearable subjects bearable to read, while simultaneously creating an intimacy through the musicality of language that draws readers deeper into the emotional core of the story.

## The Challenge

The real challenge was ensuring that the rhyme never felt forced or artificial, that it served the story rather than dominating it. Every line had to feel natural while maintaining the formal structure.

This approach isn't for every story, but for Hannah's story, it felt like the only way to tell it with the dignity and power it deserved.`
  },
  {
    id: 3,
    title: "The Reality Behind the Fiction",
    date: "December 5, 2024",
    excerpt: "How real-world experiences and observations shaped the narrative, while maintaining the boundary between fiction and autobiography.",
    slug: "reality-behind-fiction",
    content: `# The Reality Behind the Fiction

While "On Her Skin Written" is a work of fiction, it draws from the harsh realities that many people face every day. This post explores how real-world observations shaped Hannah's story while maintaining the crucial boundary between fiction and autobiography.

## Observation, Not Experience

It's important to clarify that this is not my story. Hannah's experiences are not mine. But they are informed by years of observation, research, and listening to the stories of others who have faced similar challenges.

## The Invisible Population

In every community, there are people like Hannah—individuals struggling with addiction, abuse, poverty, and mental illness. They're often invisible to those of us who haven't walked in their shoes. This book is an attempt to make their experiences visible.

## Research and Responsibility

Writing about trauma and social issues comes with enormous responsibility. I spent months researching the realities of addiction, domestic violence, the criminal justice system, and social services. Every detail needed to be authentic and respectful.

## The Role of Empathy

Fiction allows us to step into someone else's shoes, to experience life from a different perspective. My goal was to create a character whose struggles would generate empathy rather than judgment, understanding rather than dismissal.

## Why Fiction Matters

Sometimes fiction can reveal truths that non-fiction cannot. By creating Hannah as a fully realized character rather than a case study, I hoped to humanize experiences that are often reduced to statistics or stereotypes.

## The Broader Context

Hannah's story is set against the backdrop of larger social issues—poverty, inadequate mental health services, a punitive rather than rehabilitative justice system. These aren't just personal problems; they're societal ones that require collective solutions.

## Moving Forward

My hope is that readers will see Hannah not as an exception but as representative of countless individuals who deserve our compassion and support. Fiction can be a bridge to understanding, and understanding is the first step toward meaningful change.`
  }
];

// HomePage Component
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

// AboutPage Component
const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold mb-8">About Matthew Genovese</h1>
        <div className="text-left space-y-6">
          <p className="text-gray-300 leading-relaxed">
            Matthew Genovese is a debut novelist whose work explores the intersection of poetry and prose, 
            beauty and brutality. Born from a desire to give voice to society's most marginalized stories, 
            his writing doesn't shy away from difficult truths or challenging themes.
          </p>
          <p className="text-gray-300 leading-relaxed">
            "On Her Skin Written," his first novel, represents years of careful craftsmanship—a work that 
            transforms the darkest aspects of human experience into something approaching art. Written entirely 
            in rhyming verse, the novel tackles subjects that most fiction avoids, doing so with a combination 
            of unflinching honesty and unexpected empathy.
          </p>
          <p className="text-gray-300 leading-relaxed">
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
    </motion.div>
  );
};

// ReviewsPage Component
const ReviewsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"
    >
      <div className="max-w-4xl mx-auto">
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
            <a href="https://a.co/d/aslk7MV" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
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
      </div>
    </motion.div>
  );
};

// BlogPage Component - Static Version
const BlogPage = () => {
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
            {blogPosts.length > 0 ? (
              blogPosts.map((post) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/40 p-8 rounded-lg border border-gray-800 hover:border-red-900/50 transition-colors"
                >
                  <h2 className="text-2xl font-serif font-bold text-white mb-3">
                    <Link to={`/blog/${post.slug}`} className="hover:text-red-400 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-red-400 text-sm mb-4">{post.date}</p>
                  <p className="text-gray-300 leading-relaxed mb-4">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center">
                    Read More →
                  </Link>
                </motion.article>
              ))
            ) : (
              <p className="text-gray-400 text-center">No blog posts available at this time.</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// BlogPostPage Component - Static Version
const BlogPostPage = () => {
  const { slug } = useParams();
  
  // Find the post by slug
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-gray-400 text-center flex items-center justify-center">
        <div>
          <p className="text-xl mb-4">Post not found.</p>
          <Link to="/blog" className="text-red-400 hover:text-red-300 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">{post.title}</h1>
          <p className="text-red-400 text-sm mb-8 text-center">
            Published: {post.date}
          </p>
          
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8">
            <div className="prose prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content.split('\n').map((line, index) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-serif font-bold text-white mb-6 mt-8">{line.substring(2)}</h1>;
                  } else if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-serif font-bold text-white mb-4 mt-6">{line.substring(3)}</h2>;
                  } else if (line.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-4">{line}</p>;
                  }
                })}
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/blog" className="text-red-400 hover:text-red-300 transition-colors inline-flex items-center">
              ← Back to Blog
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// ContactForm Component
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create mailto link
    const mailtoLink = `mailto:mattgenovese@proton.me?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">Contact Matthew</h1>
        
        <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300"
            >
              Send Message
            </button>
          </form>
          
          <p className="text-gray-400 text-sm mt-4 text-center">
            This will open your default email client to send the message.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// BuyNowPage Component
const BuyNowPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold text-white mb-8">Buy "On Her Skin Written"</h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Buy from Amazon</h2>
            <p className="text-gray-300 mb-6">
              Purchase the book through Amazon for fast delivery and easy returns.
            </p>
            <a 
              href="https://a.co/d/aslk7MV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block"
            >
              Buy on Amazon
            </a>
          </div>
          
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Buy Directly from Author</h2>
            <p className="text-gray-300 mb-6">
              Support the author directly. Signed copies available upon request.
            </p>
            <div className="space-y-4">
              <p className="text-white font-semibold">Price: $24.99 + shipping</p>
              <Link 
                to="/contact" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block"
              >
                Contact for Direct Purchase
              </Link>
            </div>
          </div>
        </div>
        
        <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-serif font-bold text-white mb-4">About the Book</h2>
          <p className="text-gray-300 leading-relaxed">
            "On Her Skin Written" is a powerful work of fiction told entirely in rhyming verse. 
            This debut novel explores difficult themes with unflinching honesty, empathy, and 
            unexpected moments of dark humor. It's a story that stays with you long after 
            you've turned the final page.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ReadSamplePage Component
const ReadSamplePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif font-bold text-white mb-8 text-center">Read a Sample</h1>
        
        <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8">
          <h1 className="text-center text-lg italic font-serif font-bold text-white mb-6"> A TRAINWRECK IN BFJ</h1>
          <div className="text-gray-300 leading-relaxed space-y-4 font-serif text-lg">
            <p className="text-center font-bold italic">
            chapter VI<br />
            13
            </p>
            <p className="text-center">
              A paved expanse,<br />
              a man made plain,<br />
              asphalt plane --<br />
              surface: plain,<br />
              oil-stained;<br />
              concrete, crushed up in pitch/tar;<br />
              black as obsidian, pitch dark --<br />
              except where, in yellow, marked:<br />
              HHHHH HHHHH<br />
              HHHHH HHHHH<br />
            </p>
            <p className="text-center">
              A long, white cargo van,<br />
              windowless in the back,<br />
              is there, parked;<br />
              behind its windshield<br />
              a flint briefly sparks,<br />
              illuminates a familiar face,<br />
              here, in an unfamiliar place,<br />
              in another time,<br />
              is where we find<br />
              Hannah<br />
              and her man<br />
              in the front seat of his van,<br />
              drinking cheap beer with a ribbon on the can<br />
              like it's a prize.<br />
            </p>
            <p className="text-center">
              After<br />
              a hash brown dinner scattered,<br />
              smothered in cheese, covered in onions, and chunked with ham,<br />
              they wound up here, in Bumfuck, Japan,<br />
              to her surprise.<br />
              Tonight, it’s hot outside --<br />
              the seat’s vinyl sticks to Hannah’s thighs;<br />
              in the moonlight, sweat on her skin shines<br />
              like silver, anodized.<br />
              And now Hannah tries<br />
              the radio...<br />
              She’s reminded emphatically that the year is 1981 --<br />
              nothing good, tonight, on the radio, hon;<br />
              and there won’t be anywhere under the sun<br />
              until roughly 1991 -- no kidding, not one.<br />
              </p>
              <p className="text-center">
              They’ve been here since eight;<br />
              now it’s late<br />
              because they had to wait<br />
              to be found by a lucky Penny...<br />
              as golden as she is copper,<br />
              as what Penny has to offer<br />
              is a literal heart stopper.<br />
              To most folks,<br />
              it’s worth at least its weight in gold,<br />
              and in 1981, about twice that, is for what it’s sold.<br />
              Seth tells Hannah not to worry,<br />
              yet again.<br />
              </p>
            <p className="text-center">
              How many times now?<br />
              Five? Ten?<br />
              This time he clues her in<br />
              that his friend,<br />
              Penny Sinn,<br />
              happens to be an RN<br />
              so it’s “totally safe”.<br />
              Seth explains,<br />
              “We’ll be in the qualified hands<br />
              of a registered nurse...<br />
              it doesn’t even hurt<br />
              when administered by an expert.”<br />
            </p>
            <p className="text-center">
              14<br />
              Penny Sinn<br />
              is in<br />
              the back of the van, just behind them;<br />
              Seth called earlier from a pay phone,<br />
              and gave directions so she could find them.<br />
              Penny is sitting on a five-gallon bucket --<br />
              fuck it,<br />
              it’s a “bucket seat” --<br />
              she doesn't mind<br />
              that it’s all she could find<br />
              among the power tools,<br />
              sheet rock, and chunks of concrete.<br />
              Penny is a busty redhead --<br />
              voluptuous, it’s been said,<br />
              though she’s not as pretty as Hannah.<br />
              “T & A”<br />
              for days and days,<br />
              and in the back,<br />
              "A" crack<br />
              flossed with pink thong panties<br />
              that split<br />
              into a “Y” above<br />
              Daisy Duke shorts that fit<br />
              like a glove,<br />
              they rise low but are high cut<br />
              so that plenty<br />
              of Penny’s<br />
              butt<br />
              sticks out the bottom.<br />
              Penny shakes<br />
              that “A” to make<br />
              dollars leave pockets<br />
              as sure as leaves fall in autumn...<br />
              To be clear,<br />
              Penny is an exotic dancer, i.e., a stripper...<br />
              and also an escort, and a drug dealer,<br />
              among many other things<br />
              (hell, in the shower, she’s been known to sing).<br />
              But a nurse, Penny certainly is not --<br />
              this is something Seth, on the spot,<br />
              just now, thought<br />
              up,<br />
              hoping Hannah would be<br />
              down<br />
              to move<br />
              forward<br />
              instead of holding<br />
              back<br />
              with trepidation<br />
              in<br />
              hesitation<br />
              about trying<br />
              out<br />
              this risky route<br />
              of administration,<br />
              on this obviously not-so-special occasion.<br />

            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-400 mb-6">
            Want to read more? Get your copy today.
          </p>
          <div className="space-x-4">
            <Link 
              to="/buy-now" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block"
            >
              Buy Now
            </Link>
            <a 
              href="https://a.co/d/aslk7MV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block"
            >
              Buy on Amazon
            </a>
          </div>
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

export default App;
