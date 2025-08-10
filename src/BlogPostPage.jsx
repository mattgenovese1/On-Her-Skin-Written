// BlogPostPage.jsx - Static Version
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Static blog posts data (same as in BlogPage.jsx)
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
              {/* Render the content with proper formatting */}
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

export default BlogPostPage;



live
