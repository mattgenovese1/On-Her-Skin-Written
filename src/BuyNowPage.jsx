//```BuyNowPage.jsx
import React from 'react';
import { motion } from 'framer-motion';

const BuyNowPage = () => {
  // Replace this with your actual direct purchase link
  const directPurchaseLink = "https://a.co/d/ebYXfAd"; // Example: PayPal.Me link
  // Or a Stripe Checkout link, or Gumroad product link

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4"
    >
      <div className="text-center max-w-2xl mx-auto bg-black/40 p-8 rounded-lg border border-gray-800">
        <h1 className="text-4xl font-serif font-bold mb-6">Buy Directly from the Author</h1>
        <p className="text-lg leading-relaxed mb-8">
          Support Matthew Genovese directly by purchasing "On Her Skin Written" through this secure link.
          Your purchase helps independent authors continue to create powerful and thought-provoking stories.
        </p>
        <a
          href={directPurchaseLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg text-xl"
        >
          Purchase Now
        </a>
        <p className="text-sm text-gray-500 mt-4">
          (You will be redirected to a secure payment page.)
        </p>
      </div>
    </motion.div>
  );
};

export default BuyNowPage;