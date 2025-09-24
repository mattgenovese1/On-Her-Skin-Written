// CheckoutPage.jsx - Local card payment using Stripe Elements + Lulu print job
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import bookCover from './assets/book_cover_concept.png';

// Load Stripe with your publishable key from Vite env
// Add VITE_STRIPE_PUBLISHABLE_KEY to your frontend .env (e.g. .env.local)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');
const BOOK_SKU = import.meta.env.VITE_LULU_BOOK_SKU || '';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ffffff',
      fontSize: '16px',
      '::placeholder': { color: '#a0aec0' },
      fontSmoothing: 'antialiased',
    },
    invalid: {
      color: '#f87171',
      iconColor: '#f87171',
    },
  },
  hidePostalCode: true,
};

function LocalCardCheckoutForm({
  subtotal,
  shippingCost,
  tax,
  total,
  shippingInfo,
  selectedShipping,
  selectedShippingOption,
  bookInfo,
  setError,
  setSuccess,
  loading,
  setLoading,
}) {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayNow = async () => {
    setError('');

    // Basic form validation
    const required = ['firstName', 'lastName', 'email', 'phone', 'address1', 'city', 'state', 'zipCode'];
    for (let field of required) {
      if (!shippingInfo[field]?.trim()) {
        setError(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(shippingInfo.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(shippingInfo.phone)) {
      setError('Please enter a valid phone number');
      return;
    }

    
    if (!stripe || !elements) {
      setError('Payment system not ready. Please wait a moment and try again.');
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError('Card field is not ready');
      return;
    }

    setLoading(true);

    try {
      // 1) Create a Payment Intent for the total amount
      const piRes = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'usd',
          metadata: {
            order_id: `order_${Date.now()}`,
            customer_email: shippingInfo.email,
            book_sku: bookInfo.sku,
            shipping_level: selectedShipping,
          },
        }),
      });

      if (!piRes.ok) {
        let details = '';
        try {
          const data = await piRes.json();
          details = data?.error || data?.details || JSON.stringify(data);
        } catch (e) {
          details = piRes.statusText || 'Unknown error';
        }
        throw new Error(`Failed to create payment intent: ${details}`);
      }

      const { client_secret } = await piRes.json();

      // 2) Confirm the card payment on-page
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card,
          billing_details: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            email: shippingInfo.email,
            phone: shippingInfo.phone,
            address: {
              line1: shippingInfo.address1,
              line2: shippingInfo.address2 || undefined,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.zipCode,
              country: shippingInfo.country,
            },
          },
        },
        receipt_email: shippingInfo.email,
      });

      if (confirmError) {
        throw new Error(confirmError.message || 'Payment confirmation failed');
      }

      if (paymentIntent.status !== 'succeeded') {
        throw new Error(`Payment not completed. Status: ${paymentIntent.status}`);
      }

      // 3) Create Lulu print job after successful payment
      const luluResponse = await fetch('/api/lulu/create-print-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          line_items: [{
            sku: bookInfo.sku,
            quantity: 1,
          }],
          shipping_address: {
            name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
            street1: shippingInfo.address1,
            street2: shippingInfo.address2,
            city: shippingInfo.city,
            state_code: shippingInfo.state,
            postcode: shippingInfo.zipCode,
            country_code: shippingInfo.country,
            phone_number: shippingInfo.phone,
          },
          contact_email: shippingInfo.email,
          shipping_level: selectedShipping,
          external_id: `order_${Date.now()}`,
        }),
      });

      if (!luluResponse.ok) {
        let details = '';
        try {
          const data = await luluResponse.json();
          details = data?.error || data?.details || JSON.stringify(data);
        } catch (e) {
          details = luluResponse.statusText || 'Unknown error';
        }
        throw new Error(`Payment succeeded but failed to create print job: ${details}`);
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message || 'An error occurred during checkout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-2">
        <label className="block text-white mb-2"> Card Details *</label>
        
        <div className="p-5 bg-gray-800 rounded border border-gray-600">
        <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        <p className="text-gray-400 text-xs mt-2">We accept major debit/credit cards. Your information is encrypted and processed securely.</p>
      </div>

      <button
        onClick={handlePayNow}
        disabled={loading}
        className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 text-white font-bold py-4 px-6 rounded-lg transition duration-300 text-lg"
      >
        {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </div>
  );
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // Form state for shipping information
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });

  // Book information - SKU must be provided by the user
  const [bookInfo, setBookInfo] = useState({
    title: 'On Her Skin Written',
    author: 'Matthew Genovese',
    price: 24.99,
    sku: BOOK_SKU,
    coverImage: bookCover,
  });

  // Shipping options
  const [shippingOptions] = useState([
    { id: 'MAIL', name: 'Standard Mail', price: 3.99, description: '7-10 business days' },
    { id: 'PRIORITY_MAIL', name: 'Priority Mail', price: 7.99, description: '3-5 business days' },
    { id: 'GROUND', name: 'Ground Shipping', price: 5.99, description: '5-7 business days' },
    { id: 'EXPEDITED', name: 'Expedited', price: 12.99, description: '2-3 business days' },
    { id: 'EXPRESS', name: 'Express Overnight', price: 24.99, description: '1 business day' },
  ]);

  const [selectedShipping, setSelectedShipping] = useState('PRIORITY_MAIL');

  // Calculate totals
  const selectedShippingOption = useMemo(
    () => shippingOptions.find((option) => option.id === selectedShipping),
    [shippingOptions, selectedShipping]
  );
  const subtotal = bookInfo.price;
  const shippingCost = selectedShippingOption?.price || 0;
  const tax = subtotal * 0.08; // 8% tax (example)
  const total = subtotal + shippingCost + tax;

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Complete Your Purchase</h1>
          <p className="text-gray-300">Direct from the author - signed copies available upon request</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Order Summary</h2>
            
            <div className="flex items-center mb-6">
              <img 
                src={bookInfo.coverImage} 
                alt={bookInfo.title}
                className="w-20 h-28 object-cover rounded mr-4"
              />
              <div>
                <h3 className="text-white font-semibold">{bookInfo.title}</h3>
                <p className="text-gray-300">by {bookInfo.author}</p>
                <p className="text-white font-bold">${bookInfo.price.toFixed(2)}</p>
              </div>
            </div>

            
            {/* Shipping Options */}
            <div className="mb-6">
              <h3 className="text-white font-semibold mb-4">Shipping Method</h3>
              <div className="space-y-2">
                {shippingOptions.map((option) => (
                  <label key={option.id} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="shipping"
                      value={option.id}
                      checked={selectedShipping === option.id}
                      onChange={(e) => setSelectedShipping(e.target.value)}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-white">{option.name}</span>
                        <span className="text-white">${option.price.toFixed(2)}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Shipping:</span>
                <span className="text-white">${shippingCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Tax:</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-gray-700 pt-2">
                <span className="text-white">Total:</span>
                <span className="text-white">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Shipping + Payment Form */}
          <div className="bg-black/40 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Shipping Information</h2>
            
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white mb-2">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={shippingInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={shippingInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Address Line 1 *</label>
                <input
                  type="text"
                  name="address1"
                  value={shippingInfo.address1}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2">Address Line 2</label>
                <input
                  type="text"
                  name="address2"
                  value={shippingInfo.address2}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-white mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={shippingInfo.state}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white mb-2">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingInfo.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2">Country</label>
                <select
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-800 text-white rounded border border-gray-600 focus:border-red-500 focus:outline-none"
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
            </form>

            {error && (
              <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200">
                {error}
              </div>
            )}

            {success ? (
              <div className="mt-8 p-4 bg-green-900/40 border border-green-600 rounded text-green-200">
                Payment successful! Your print job has been created. A confirmation email will be sent to you.
              </div>
            ) : (
              <div className="mt-8">
                <Elements stripe={stripePromise}>
                  <LocalCardCheckoutForm
                    subtotal={subtotal}
                    shippingCost={shippingCost}
                    tax={tax}
                    total={total}
                    shippingInfo={shippingInfo}
                    selectedShipping={selectedShipping}
                    selectedShippingOption={selectedShippingOption}
                    bookInfo={bookInfo}
                    setError={setError}
                    setSuccess={setSuccess}
                    loading={loading}
                    setLoading={setLoading}
                  />
                </Elements>
                <div className="mt-4 text-center">
                  <p className="text-gray-400 text-sm">
                    Secure payment is processed on-page with Stripe. Your card details never touch our servers.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
