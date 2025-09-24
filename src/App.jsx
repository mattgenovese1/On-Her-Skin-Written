// src/App.jsx - Corrected Version with Fixed Footer and No Strapi Dependencies
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import bookCover from './assets/book_cover_concept.png';
import Authorpic from './assets/autherpic.jpg'
import { Analytics } from "@vercel/analytics/react"

// Import new checkout components
import CheckoutPage from './CheckoutPage';
import CheckoutSuccessPage from './CheckoutSuccessPage';
import CheckoutCancelPage from './CheckoutCancelPage';
import BuyNowPage from './BuyNowPage';


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
    title: "Inspiration In The Abstract",
    date: "August 19, 2025",
    excerpt: "Exploring parts of what inspired me.",
    slug: "journey-behind-on-her-skin-written",
    content: `# Abstract Inspiration

## One morning, a couple of months into the pandemic,
 my roommate,Justin, reminds me that I committed to going to lunch with him today. He tells me we spoke about it the day before. This isn’t something I would typically volunteer myself for, so I am, at first, skeptical...


I have to admit, I don’t remember anything about the conversation he is referring to, so i can’t argue. And anyway, whether or not I agreed to it isn’t really the issue – what’s on my mind are the several milligrams of 5MEO PCP I insufflated just before he knocked on my door to remind me about lunch. I have very little experience with this rare chemical, but what I do know is that, when I took it a few days ago, it was a very intense dissociative anesthetic, and I am willing to bet that it is going to be a very intense dissociative anesthetic again today.

In other words, while I committed to lunch with Justin, 5MEO is a commitment, in and of itself, of a different sort - more than it is a “let’s do lunch” thing, it’s a “let’s see if we can astral project into another dimension” type of experience. So... Justin’s lunch plans may involve a little too much public exposure for my impending state of mind.

Oh well, I suppose there is nothing to do about it now. I just shrug, and then from my desk drawer, I pull out  a small vial with ketamine, unscrew the cap, spoon out a line with the handle. I figure I may as well go for broke, since I know Justin won’t want to take it before driving, which is certainly sensible and warranted. By the time we get to the restaurant I am well on my way to planet motherfuckerWe can’t eat in the dining room at the restaurant (thank God) due to social distancing guidelines, of course, so we drive to a small, nearby park instead. The park is all ours, other than one woman running on a path that encircles a large pond at the park’s west side, and a large group of ducks sitting on the lake at the far end.

We sit down on a bench at the lake’s sandy shore, and as we eat, Justin laughs at the unenthusiastic way I am holding my burger and fries, understandably distracted by the three year old kid’s coloring book that is now my subjective reality; the sky is color-blocked indigo by a handful of turquoise clouds, and the lake is a dark shade of emerald green. The Styrofoam-like tactile hallucinations of the ketamine have all but abated, but the more visual hallucinogenic effects of the 5MEO are still going strong, and then emerges this incredible buzzing beneath -the surface of everything, something that is ordinarily imperceptible, filtered out by the veil of sober       perception , and not at all English-able... it’s a truth that is fundamental to even a rudimentary understanding of our universe, that is at all times emitting from the core of the Earth on a specific frequency that I am tuned into now fir the first time.

Then we see the ducks making their way to our side of the lake, across the green water’s great expanse. They are coming fast, for some reason, and they are making a fair amount of characteristic duck noises along the way. It’s not long before the impetus that is driving them across the water becomes evident... I haven’t taken the time to count them , but if there are fifty ducks on the water, then forty-nine of them have green heads, and only one of them, the duck swimming in front of the others, does not. We soon realize she is trying to evade the rest of the pack, as when she slows down, the other ducks – more, or less all of them - pile on top of her, forcing her, head-first underwater. She escapes them, still heading for our end of the pond, but when she comes near to our shore, they catch up to her and pile on top again, with her head back under the surface.

Some of you may recognize this as being part of their natural mating behavior, but I’m not  sure that there are typically nearly fifty males pursuing  just one female; it seems like a bit too many, both to my roommate and I, and as well, to the desperate hen. It would be very obvious to any observer that she is fighting for her life.

She escapes the malachite wave of male ducks, which is pursuing her like a gang of rowdy Hell’s Angels, and on this final desperate attempt, she makes it to the shore that we are now standing on, rather than as before, sitting on the bench in front of. And as she does, beneath her, little webbed feet are running in a blur, as they would look in an old cartoon or comic book, and they are powered by everything she has left in her. But the male ducks, some of them even taking flight briefly, are fast on her tail feathers, and they pile upon her, fighting for a chance to catch and release.

Her head is now planted firmly in the sand, under about two inches of water. My roommate tries kicking at the ducks, but it’s no use, as soon as one of them jumps off her, four or five more ducks pile on. These ducks aren’t budging.   Now the woman running on the path comes around, and as she gets a good look at the scene, she says “Oh how nice”, in an impossible-to-miss sarcastic tone. Then a seconds later, she shouts, “The bastards! They’re fucking killing her!” as she starts jogging away from the pond, across another part of the park, with a horrified look on her face. At this point we leave too – there’s nothing to do about it, and even if there is, we are too humble to interfere with nature. But this doesn’t feel right.

This is nature in the raw, and for this particular purpose, among others,  it can be brutally efficient. The need to reproduce can supersede the value of an individual life, that is, perhaps reluctantly, understood. But I’ll be goddamned if the mothers of any species deserve no better than this. Even if this is their normal mating behavior, that is perhaps more to my point. This isn’t about efficient procreation - at some point, libido overrides what’s necessary for reproduction, and in especially extreme cases, such as in the scene we just witnessed, reproduction becomes moot. A mother must survive to later give birth, or like when overcooking steak, the act defeats it’s own purpose.

As we make it to the car, still tripping nuts and bolts, I am thinking of how one half of almost every species is at the mercy of the other half, and of how it seems that above all else, on every beast’s hierarchy of needs, is the insatiable urge to get off. This scene is not nearly 100% allegorical – humans are not perfectly analogous to ducks. But humans aren’t so different, and have in fact done far worse in the name of sexual dominance, desire, or fetish. 

Throughout the rest of my trip, the image of the female duck plays out on the back of my eyelids every time I close them. With my mind in the state that it is in, I can’t help but ask myself, how could anyone think our natural world was intelligently designed? And if something intelligent did design the natural world, I’d like to meet him, so I can shake his hand, and then kick him in the balls.`
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
        <img src={bookCover} alt="On Her Skin Written Book Cover" className="w-120 h-auto mx-auto mb-8 rounded-lg shadow-lg shadow-white border-wide border-red-auto" />
        <h1 className="text-5xl font-serif font-bold mb-4">On Her Skin Written</h1>
        <h2 className="text-2xl font-sans text-gray-300 mb-6">by Matthew Genovese</h2>
        <p className="text-lg leading-relaxed mb-8">
        In the gritty underbelly of human existence, where darkness meets desperation, Hannah's story unfolds in haunting verse. "On Her Skin Written" is a raw, unflinching exploration of humanity's most disturbing tendencies—rape, addiction, domestic abuse, homicide, incest, and bloodthirsty revenge—all told through the unique lens of rhyming narrative poetry.</p>
        <p className="text-lg leading-relaxed mb-8">
        Narrated by someone who knew Hannah intimately, this fictional tale weaves together themes of poverty, child abuse, drug addiction, mental illness, and the failures of our criminal justice system. With gritty realism tempered by unexpected empathy and dark humor, Matthew Genovese delivers a literary experience unlike any other.</p>
        <p className="text-lg leading-relaxed mb-8">
        This is not just a story—it's a visceral journey through the shadows of society, presented in a format that transforms brutal reality into haunting art. For readers who appreciate challenging literature that doesn't shy away from life's darkest corners, "On Her Skin Written" offers a unique and unforgettable reading experience.
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
      <div className="text-center max-w-3xl mx-auto">
        <img src={Authorpic} alt="picture of Author" className="w-64 h-auto mx-auto mb-8 rounded-lg shadow-lg border border- #39FF14.-900/50" />
        
       </div>
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
            <a href="https://a.co/d/aslk7MV" target="_blank" rel="noopener noreferrer sponsored" className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md text-center transition-colors">
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

// Updated BuyNowPage Component with new checkout option
const BuyNowPageInternal = () => {
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
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Direct Checkout Option - NEW */}
          <div className="bg-black/40 p-8 rounded-lg border border-red-600 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                RECOMMENDED
              </span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white mb-4 mt-4">Direct Checkout</h2>
            <p className="text-gray-300 mb-6">
              Secure checkout with instant processing. Signed copies available upon request.
            </p>
            <div className="space-y-4 mb-6">
              <p className="text-white font-semibold">Price: $24.99 + shipping</p>
              <div className="text-sm text-gray-400">
                <p>✓ Secure payment via Stripe</p>
                <p>✓ Multiple shipping options</p>
                <p>✓ Direct from author</p>
                <p>✓ Order tracking included</p>
              </div>
            </div>
            <Link 
              to="/checkout" 
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block w-full"
            >
              Buy Now - Secure Checkout
            </Link>
          </div>

          {/* Amazon Option */}
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Buy from Amazon</h2>
            <p className="text-gray-300 mb-6">
              Purchase through Amazon for familiar checkout and Prime delivery.
            </p>
            <div className="space-y-4 mb-6">
              <p className="text-white font-semibold">Amazon pricing</p>
              <div className="text-sm text-gray-400">
                <p>✓ Amazon Prime eligible</p>
                <p>✓ Fast delivery options</p>
                <p>✓ Easy returns</p>
                <p>✓ Amazon customer service</p>
              </div>
            </div>
            <a 
              href="https://a.co/d/aslk7MV" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block w-full"
            >
              Buy on Amazon
            </a>
          </div>
          
          {/* Contact for Purchase Option */}
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-4">Contact for Purchase</h2>
            <p className="text-gray-300 mb-6">
              Prefer to arrange payment directly? Contact for alternative payment methods.
            </p>
            <div className="space-y-4 mb-6">
              <p className="text-white font-semibold">Custom arrangements</p>
              <div className="text-sm text-gray-400">
                <p>✓ Alternative payment methods</p>
                <p>✓ Bulk order discounts</p>
                <p>✓ Special requests</p>
                <p>✓ Personal consultation</p>
              </div>
            </div>
            <Link 
              to="/contact" 
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 inline-block w-full"
            >
              Contact Author
            </Link>
          </div>
        </div>
        
        {/* Book Information */}
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
              rel="noopener noreferrer sponsored"
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

// Updated Navigation Component
const Navigation = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const navItems = [
    { name: 'About The Book', path: '/' },
    { name: 'About The Author', path: '/about' },
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
// Animated routes wrapper to enable exit animations with React Router v6
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/buy-now" element={<BuyNowPage />} />
        <Route path="/read-sample" element={<ReadSamplePage />} />
        {/* New checkout routes */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
        <Route path="/checkout/cancel" element={<CheckoutCancelPage />} />
      </Routes>
    </AnimatePresence>
  );
};

// Main App Component with updated routes
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        
        <AnimatedRoutes />
        
        <Footer />
        <Analytics />
      </div>
    </Router>
  );
}

export default App;
