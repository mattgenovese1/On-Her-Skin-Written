//```BlogPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // Make sure you have axios installed: pnpm install axios

const BlogPage = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Access the environment variable for Strapi API URL
        const strapiApiUrl = import.meta.env.VITE_STRAPI_API_URL;
        ;
        if (!strapiApiUrl) {
          throw new Error("Strapi API URL is not defined in environment variables. Check your .env file.");
        }

        // Fetch posts from Strapi. populate=* fetches all related fields (like images if you add them)
        const response = await axios.get(`${strapiApiUrl}/posts?populate=*`);
        
        // Strapi returns data in a 'data' array, with attributes inside each item
        const formattedPosts = response.data.data.map(item => ({
          id: item.id,
          title: item.attributes.title,
          date: new Date(item.attributes.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          excerpt: item.attributes.excerpt,
          slug: item.attributes.slug,
          // Add other fields you might have, e.g., coverImage: item.attributes.coverImage.data.attributes.url
        }));
        setBlogPosts(formattedPosts);
      } catch (err) {
        console.error("Failed to fetch blog posts:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-white text-center flex items-center justify-center">
        <p>Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8 text-red-500 text-center flex items-center justify-center">
        <p>Error: {error}. Please check your Strapi API URL and ensure the server is running and permissions are set.</p>
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
              <p className="text-gray-400 text-center">No blog posts found. Start adding content in Strapi!</p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;