//```BlogPostPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // Make sure you have axios installed
import ReactMarkdown from 'react-markdown'; // For rendering Markdown content
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown

// Install react-markdown and remark-gfm: pnpm install react-markdown remark-gfm

const BlogPostPage = () => {
  const { slug } = useParams(); // Get the slug from the URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        let strapiApiUrl = import.meta.env.VITE_STRAPI_API_URL;
        
        // Ensure no trailing slash to prevent double slashes in URL
        if (strapiApiUrl.endsWith('/')) {
          strapiApiUrl = strapiApiUrl.slice(0, -1);
        }

        if (!strapiApiUrl) {
          throw new Error("Strapi API URL is not defined in environment variables.");
        }

        // Fetch a single post by its slug. Using filters for exact match.
        const response = await axios.get(`${strapiApiUrl}/posts?filters[slug][$eq]=${slug}&populate=*`);
        
        if (response.data.data && response.data.data.length > 0) {
          setPost(response.data.data[0].attributes);
        } else {
          setError("Blog post not found.");
        }
      } catch (err) {
        console.error("Failed to fetch blog post:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-white text-center flex items-center justify-center">
        <p>Loading post...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-red-500 text-center flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-gray-400 text-center flex items-center justify-center">
        <p>Post not found.</p>
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
          <p className="text-red-400 text-sm mb-4 text-center">
            Published: {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8 prose prose-invert max-w-none">
            {/* Render Markdown content from Strapi */}
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
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

export default BlogPostPage;
