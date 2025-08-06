//```ReadSample.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ReadSamplePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto bg-black/40 p-8 rounded-lg border border-gray-800">
        <h1 className="text-4xl font-serif font-bold mb-6 text-center">Read a Sample of "On Her Skin Written"</h1>
        <div className="prose prose-invert max-w-none leading-relaxed text-lg">
          {/* Replace this content with your actual book excerpt */}
          <p>
            Here begins a journey, dark and deep,
            Where secrets fester, promises to keep.
            A tale of shadows, whispered in the night,
            Of souls entwined, in endless, bitter fight.
          </p>
          <p>
            She walked through fire, felt the searing pain,
            A canvas marked, by sun and bitter rain.
            Each scar a story, etched upon her soul,
            A broken spirit, striving to be whole.
          </p>
          <p>
            The world around her, cruel and unforgiving,
            A constant battle, just to keep on living.
            But in her eyes, a flicker, fierce and bright,
            A burning ember, in the darkest night.
          </p>
          <p>
            This is just a small taste of the unique rhyming verse and intense narrative you'll find in "On Her Skin Written." The full story delves into themes of revenge, resilience, and the human spirit's capacity to endure.
          </p>
          {/* You can add more paragraphs, or even use Markdown here if you install react-markdown */}
        </div>
      </div>
    </motion.div>
  );
};

export default ReadSamplePage;