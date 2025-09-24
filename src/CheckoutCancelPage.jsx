// CheckoutCancelPage.jsx - Page shown when checkout is cancelled
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CheckoutCancelPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Cancel Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-yellow-500 text-8xl mb-6"
        >
          ⚠️
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            Checkout Cancelled
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your payment was cancelled and no charges were made to your account.
          </p>
        </motion.div>

        {/* Information Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6">What Happened?</h2>
          
          <div className="text-left max-w-2xl mx-auto">
            <p className="text-gray-300 mb-4">
              Your checkout session was cancelled before payment could be processed. This could have happened for several reasons:
            </p>
            
            <ul className="text-gray-300 space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                You clicked the back button or closed the payment window
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                The payment session expired (sessions are valid for 24 hours)
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                There was a technical issue with the payment processor
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-2">•</span>
                You decided not to complete the purchase at this time
              </li>
            </ul>

            <div className="bg-blue-900/30 border border-blue-500 rounded p-4">
              <p className="text-blue-200">
                <strong>Don't worry!</strong> No payment was processed and your information is secure. 
                You can try again at any time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6">What Would You Like to Do?</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🛒</div>
              <h3 className="text-white font-semibold mb-2">Try Again</h3>
              <p className="text-gray-300 text-sm mb-4">
                Ready to complete your purchase? Start the checkout process again.
              </p>
              <Link 
                to="/checkout" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
              >
                Checkout Again
              </Link>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-white font-semibold mb-2">Browse More</h3>
              <p className="text-gray-300 text-sm mb-4">
                Learn more about the book or explore other content on the site.
              </p>
              <Link 
                to="/" 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
              >
                Return Home
              </Link>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-white font-semibold mb-2">Get Help</h3>
              <p className="text-gray-300 text-sm mb-4">
                Having trouble with checkout? Contact us for assistance.
              </p>
              <Link 
                to="/contact" 
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Alternative Purchase Options */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Alternative Purchase Options</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="text-white font-semibold mb-3">Amazon</h3>
              <p className="text-gray-300 text-sm mb-4">
                Purchase through Amazon for familiar checkout and fast delivery options.
              </p>
              <a 
                href="https://a.co/d/aslk7MV" 
                target="_blank" 
                rel="noopener noreferrer sponsored"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
              >
                Buy on Amazon
              </a>
            </div>
            
            <div className="text-center">
              <h3 className="text-white font-semibold mb-3">Contact Direct</h3>
              <p className="text-gray-300 text-sm mb-4">
                Prefer to arrange payment directly? Contact the author for alternative payment methods.
              </p>
              <Link 
                to="/contact" 
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 inline-block"
              >
                Contact Author
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Support Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">
            Need help or have questions about purchasing? Email us at{' '}
            <a href="mailto:mattgenovese@proton.me" className="text-red-400 hover:text-red-300">
              mattgenovese@proton.me
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutCancelPage;
