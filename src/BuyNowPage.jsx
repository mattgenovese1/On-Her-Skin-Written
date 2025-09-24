// BuyNowPageUpdated.jsx - Updated buy now page with direct checkout option
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import bookCover from './assets/book_cover_concept.png';

// Display data extracted as constants for maintainability
const DIRECT_FEATURES = [
  'Secure payment via Stripe',
  'Multiple shipping options',
  'Direct from author',
  'Order tracking included',
];

const AMAZON_FEATURES = [
  'Amazon Prime eligible',
  'Fast delivery options',
  'Easy returns',
  'Amazon customer service',
];

const CONTACT_FEATURES = [
  'Alternative payment methods',
  'Bulk order discounts',
  'Special requests',
  'Personal consultation',
];

const SHIPPING_OPTIONS = [
  { label: 'Standard Mail (7-10 days)', price: '$3.99' },
  { label: 'Priority Mail (3-5 days)', price: '$7.99' },
  { label: 'Ground Shipping (5-7 days)', price: '$5.99' },
  { label: 'Expedited (2-3 days)', price: '$12.99' },
  { label: 'Express Overnight', price: '$24.99' },
];

const SHIPPING_REGIONS = [
  'United States (all 50 states)',
  'Canada',
  'United Kingdom',
  'Australia',
  'European Union',
];

const BuyNowPageUpdated = () => {
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
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
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
              <ul className="text-sm text-gray-400 text-left space-y-1 list-none">
                {DIRECT_FEATURES.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
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
              <ul className="text-sm text-gray-400 text-left space-y-1 list-none">
                {AMAZON_FEATURES.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <a 
              href="https://a.co/d/aslk7MV" 
              target="_blank" 
              rel="noopener noreferrer sponsored"
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
              <ul className="text-sm text-gray-400 text-left space-y-1 list-none">
                {CONTACT_FEATURES.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
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
        <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8">
          <h2 className="text-2xl font-serif font-bold text-white mb-4">About the Book</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <p className="text-gray-300 leading-relaxed mb-4">
                "On Her Skin Written" is a powerful work of fiction told entirely in rhyming verse. 
                This debut novel explores difficult themes with unflinching honesty, empathy, and 
                unexpected moments of dark humor.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Set in the gritty underbelly of human existence, Hannah's story unfolds through 
                haunting narrative poetry that transforms brutal reality into compelling art.
              </p>
              <div className="space-y-2 text-sm">
                <p><span className="text-white font-semibold">Format:</span> <span className="text-gray-300">Paperback</span></p>
                <p><span className="text-white font-semibold">Pages:</span> <span className="text-gray-300">Approximately 200 pages</span></p>
                <p><span className="text-white font-semibold">Genre:</span> <span className="text-gray-300">Literary Fiction, Poetry</span></p>
                <p><span className="text-white font-semibold">Language:</span> <span className="text-gray-300">English</span></p>
              </div>
            </div>
            <div className="text-center">
              <img 
                src={bookCover} 
                alt="On Her Skin Written Book Cover" 
                className="w-64 h-auto mx-auto rounded-lg shadow-lg border border-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="bg-black/40 p-8 rounded-lg border border-gray-800 mb-8">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Shipping Information</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-white font-semibold mb-4">Shipping Options</h3>
              <ul className="space-y-3 text-left">
                {SHIPPING_OPTIONS.map((opt) => (
                  <li key={opt.label} className="flex justify-between">
                    <span className="text-gray-300">{opt.label}</span>
                    <span className="text-white">{opt.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Shipping Regions</h3>
              <div className="text-left text-gray-300">
                <ul className="space-y-2">
                  {SHIPPING_REGIONS.map((region) => (
                    <li key={region}>✓ {region}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-400 mt-4">
                  International shipping rates calculated at checkout. 
                  Delivery times may vary by destination.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Security and Trust */}
        <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-serif font-bold text-white mb-6">Secure & Trusted</h2>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-white font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-300 text-sm">
                All payments processed securely through Stripe with industry-standard encryption.
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">📦</div>
              <h3 className="text-white font-semibold mb-2">Quality Printing</h3>
              <p className="text-gray-300 text-sm">
                Professional print-on-demand through Lulu ensures high-quality books every time.
              </p>
            </div>
            
            <div>
              <div className="text-4xl mb-3">✉️</div>
              <h3 className="text-white font-semibold mb-2">Order Updates</h3>
              <p className="text-gray-300 text-sm">
                Receive email notifications throughout the printing and shipping process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BuyNowPageUpdated;

