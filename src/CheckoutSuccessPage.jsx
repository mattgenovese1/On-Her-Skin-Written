// CheckoutSuccessPage.jsx - Success page after completed purchase
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';

const CheckoutSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/stripe/checkout-session/${sessionId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }

        const data = await response.json();
        setOrderDetails(data);
      } catch (err) {
        setError(err.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading order details...</p>
        </div>
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center"
      >
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-3xl font-serif font-bold text-white mb-4">Error Loading Order</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <Link 
            to="/" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Return Home
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-green-500 text-8xl mb-6"
        >
          ✓
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-4xl font-serif font-bold text-white mb-4">
            Thank You for Your Purchase!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Your order has been successfully processed and your book is being prepared for printing.
          </p>
        </motion.div>

        {/* Order Details */}
        {orderDetails && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8"
          >
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Order Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="text-white font-semibold mb-3">Order Information</h3>
                <div className="space-y-2 text-gray-300">
                  <p><span className="text-white">Order ID:</span> {orderDetails.id}</p>
                  <p><span className="text-white">Payment Status:</span> 
                    <span className="text-green-400 ml-2 capitalize">{orderDetails.payment_status}</span>
                  </p>
                  <p><span className="text-white">Amount Paid:</span> ${(orderDetails.amount_total / 100).toFixed(2)}</p>
                  <p><span className="text-white">Email:</span> {orderDetails.customer_details?.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Shipping Information</h3>
                <div className="space-y-2 text-gray-300">
                  {orderDetails.shipping_details && (
                    <>
                      <p><span className="text-white">Name:</span> {orderDetails.shipping_details.name}</p>
                      <p><span className="text-white">Address:</span></p>
                      <div className="ml-4">
                        <p>{orderDetails.shipping_details.address.line1}</p>
                        {orderDetails.shipping_details.address.line2 && (
                          <p>{orderDetails.shipping_details.address.line2}</p>
                        )}
                        <p>
                          {orderDetails.shipping_details.address.city}, {orderDetails.shipping_details.address.state} {orderDetails.shipping_details.address.postal_code}
                        </p>
                        <p>{orderDetails.shipping_details.address.country}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Print Job Status */}
            {orderDetails.metadata?.lulu_print_job_id && (
              <div className="mt-6 pt-6 border-t border-gray-700">
                <h3 className="text-white font-semibold mb-3">Print Job Status</h3>
                <div className="bg-blue-900/30 border border-blue-500 rounded p-4">
                  <p className="text-blue-200">
                    <span className="text-white">Print Job ID:</span> {orderDetails.metadata.lulu_print_job_id}
                  </p>
                  <p className="text-blue-200 mt-2">
                    Your book is now in the production queue. You will receive email updates as your order progresses through printing and shipping.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* What Happens Next */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8"
        >
          <h2 className="text-2xl font-serif font-bold text-white mb-6">What Happens Next?</h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-4">📖</div>
              <h3 className="text-white font-semibold mb-2">Printing</h3>
              <p className="text-gray-300 text-sm">
                Your book will be professionally printed on high-quality paper with a durable binding.
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-white font-semibold mb-2">Packaging</h3>
              <p className="text-gray-300 text-sm">
                Once printed, your book will be carefully packaged to ensure it arrives in perfect condition.
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-white font-semibold mb-2">Shipping</h3>
              <p className="text-gray-300 text-sm">
                You'll receive tracking information once your book ships. Delivery times vary by shipping method selected.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Special Note for Signed Copies */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="bg-red-900/20 border border-red-500 rounded-lg p-6 mb-8"
        >
          <h3 className="text-white font-semibold mb-3">Want a Signed Copy?</h3>
          <p className="text-gray-300 mb-4">
            If you'd like your copy personally signed by Matthew Genovese, please reply to your order confirmation email 
            with your request. Signed copies may take an additional 2-3 business days to process.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Link 
            to="/" 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Return Home
          </Link>
          
          <Link 
            to="/contact" 
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Contact Author
          </Link>
          
          <Link 
            to="/blog" 
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
          >
            Read the Blog
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-400 text-sm">
            Questions about your order? Contact us at{' '}
            <a href="mailto:mattgenovese@proton.me" className="text-red-400 hover:text-red-300">
              mattgenovese@proton.me
            </a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CheckoutSuccessPage;
