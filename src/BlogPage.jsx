// BlogPage.jsx - Static Version
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Static blog posts data - you can add/edit posts here
const blogPosts = [
  {
    id: 1,
    title: "The Journey Behind 'On Her Skin Written'",
    date: "December 15, 2024",
    excerpt: "Exploring the creative process behind my debut novel and the challenges of writing in rhyming verse about difficult subjects.",
    slug: "journey-behind-on-her-skin-written",
    content: `# The Journey Behind 'On Her Skin Written'

Writing "On Her Skin Written" was both the most challenging and rewarding experience of my creative life. The decision to tackle such difficult subject matter through the lens of rhyming verse wasn't made lightly...

[Add full content here]`
  },
  {
    id: 2,
    title: "Why Rhyming Verse for Dark Fiction?",
    date: "December 10, 2024",
    excerpt: "The unique choice to tell Hannah's story through poetry, and how rhythm and rhyme can enhance rather than diminish the impact of serious themes.",
    slug: "why-rhyming-verse-dark-fiction",
    content: `# Why Rhyming Verse for Dark Fiction?

Many readers have asked why I chose to tell such a serious story through rhyming verse. Doesn't poetry make light of heavy subjects?

The answer is quite the opposite...

[Add full content here]`
  },
  {
    id: 3,
    title: "The Reality Behind the Fiction",
    date: "December 5, 2024",
    excerpt: "How real-world experiences and observations shaped the narrative, while maintaining the boundary between fiction and autobiography.",
    slug: "reality-behind-fiction",
    content: `# The Reality Behind the Fiction

While "On Her Skin Written" is a work of fiction, it draws from the harsh realities that many people face every day...

[Add full content here]`
  }
];

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

export default BlogPage;