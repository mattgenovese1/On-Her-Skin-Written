// api/stripe.js - Backend API routes for Stripe payment processing
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Webhook endpoint secret for verifying Stripe webhooks
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * Create a Stripe Checkout Session
 * POST /api/stripe/create-checkout-session
 */
router.post('/create-checkout-session', async (req, res) => {
  try {
    const { line_items, mode = 'payment', success_url, cancel_url, metadata = {} } = req.body;

    // Validate required fields
    if (!line_items || !success_url || !cancel_url) {
      return res.status(400).json({
        error: 'Missing required fields: line_items, success_url, cancel_url'
      });
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode,
      success_url,
      cancel_url,
      metadata,
      // Enable shipping address collection
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE']
      },
      // Collect customer information
      customer_creation: 'always',
      // Set session expiration (24 hours)
      expires_at: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
      // Enable automatic tax calculation (optional)
      automatic_tax: {
        enabled: true // Set to true if you want Stripe to calculate taxes
      }
    });

    res.json({
      id: session.id,
      url: session.url
    });
  } catch (error) {
    console.error('Stripe checkout session creation error:', error);
    res.status(500).json({
      error: 'Failed to create checkout session',
      details: error.message
    });
  }
});

/**
 * Retrieve a Stripe Checkout Session
 * GET /api/stripe/checkout-session/:sessionId
 */
router.get('/checkout-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Retrieve the session with expanded data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent']
    });

    res.json(session);
  } catch (error) {
    console.error('Stripe session retrieval error:', error);
    res.status(404).json({
      error: 'Checkout session not found',
      details: error.message
    });
  }
});

/**
 * Create a Payment Intent (for custom checkout flows)
 * POST /api/stripe/create-payment-intent
 */
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'usd', metadata = {} } = req.body;

    if (!amount) {
      return res.status(400).json({
        error: 'Amount is required'
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata,
      automatic_payment_methods: {
        enabled: true
      }
    });

    res.json({
      client_secret: paymentIntent.client_secret,
      id: paymentIntent.id
    });
  } catch (error) {
    console.error('Payment Intent creation error:', error);
    res.status(500).json({
      error: 'Failed to create payment intent',
      details: error.message
    });
  }
});

/**
 * Confirm a Payment Intent
 * POST /api/stripe/confirm-payment-intent/:paymentIntentId
 */
router.post('/confirm-payment-intent/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    const { payment_method } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method
    });

    res.json(paymentIntent);
  } catch (error) {
    console.error('Payment Intent confirmation error:', error);
    res.status(500).json({
      error: 'Failed to confirm payment intent',
      details: error.message
    });
  }
});

/**
 * Create a refund
 * POST /api/stripe/create-refund
 */
router.post('/create-refund', async (req, res) => {
  try {
    const { payment_intent_id, amount, reason = 'requested_by_customer' } = req.body;

    if (!payment_intent_id) {
      return res.status(400).json({
        error: 'Payment Intent ID is required'
      });
    }

    const refundData = {
      payment_intent: payment_intent_id,
      reason
    };

    // If amount is specified, add it (otherwise refunds the full amount)
    if (amount) {
      refundData.amount = Math.round(amount * 100); // Convert to cents
    }

    const refund = await stripe.refunds.create(refundData);

    res.json(refund);
  } catch (error) {
    console.error('Refund creation error:', error);
    res.status(500).json({
      error: 'Failed to create refund',
      details: error.message
    });
  }
});

/**
 * Get customer information
 * GET /api/stripe/customer/:customerId
 */
router.get('/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await stripe.customers.retrieve(customerId);

    res.json(customer);
  } catch (error) {
    console.error('Customer retrieval error:', error);
    res.status(404).json({
      error: 'Customer not found',
      details: error.message
    });
  }
});

/**
 * Stripe webhook endpoint
 * POST /api/stripe/webhook
 */
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        
        // Handle successful payment
        await handleSuccessfulPayment(session);
        break;

      case 'checkout.session.expired':
        const expiredSession = event.data.object;
        console.log('Checkout session expired:', expiredSession.id);
        
        // Handle expired session (cleanup, notifications, etc.)
        await handleExpiredSession(expiredSession);
        break;

      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        console.log('Payment succeeded:', paymentIntent.id);
        
        // Handle successful payment intent
        await handlePaymentSuccess(paymentIntent);
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        console.log('Payment failed:', failedPayment.id);
        
        // Handle failed payment
        await handlePaymentFailure(failedPayment);
        break;

      case 'charge.dispute.created':
        const dispute = event.data.object;
        console.log('Dispute created:', dispute.id);
        
        // Handle dispute creation
        await handleDispute(dispute);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Handle successful payment
 */
async function handleSuccessfulPayment(session) {
  try {
    console.log('Processing successful payment for session:', session.id);
    
    // Extract metadata
    const { lulu_print_job_id, customer_email, book_sku } = session.metadata || {};
    
    // Update print job status in Lulu (if needed)
    if (lulu_print_job_id) {
      // You might want to update the print job status or add payment confirmation
      console.log('Payment confirmed for Lulu print job:', lulu_print_job_id);
    }
    
    // Send confirmation email to customer
    if (customer_email) {
      // Implement email sending logic here
      console.log('Sending confirmation email to:', customer_email);
    }
    
    // Update your database with order information
    // Store order details, customer information, etc.
    
    // Log successful processing
    console.log('Successfully processed payment for session:', session.id);
  } catch (error) {
    console.error('Error handling successful payment:', error);
  }
}

/**
 * Handle expired session
 */
async function handleExpiredSession(session) {
  try {
    console.log('Processing expired session:', session.id);
    
    // Cancel associated Lulu print job if it exists and is still unpaid
    const { lulu_print_job_id } = session.metadata || {};
    if (lulu_print_job_id) {
      // Make API call to cancel Lulu print job
      console.log('Cancelling Lulu print job due to expired session:', lulu_print_job_id);
    }
    
    // Clean up any temporary data
    // Send abandonment email (optional)
    
  } catch (error) {
    console.error('Error handling expired session:', error);
  }
}

/**
 * Handle payment success
 */
async function handlePaymentSuccess(paymentIntent) {
  try {
    console.log('Processing successful payment intent:', paymentIntent.id);
    
    // Similar to handleSuccessfulPayment but for Payment Intents
    // Update order status, send confirmations, etc.
    
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
}

/**
 * Handle payment failure
 */
async function handlePaymentFailure(paymentIntent) {
  try {
    console.log('Processing failed payment intent:', paymentIntent.id);
    
    // Log failure reason
    console.log('Failure reason:', paymentIntent.last_payment_error?.message);
    
    // Send failure notification
    // Update order status
    // Cancel associated services if needed
    
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
}

/**
 * Handle dispute
 */
async function handleDispute(dispute) {
  try {
    console.log('Processing dispute:', dispute.id);
    
    // Log dispute details
    console.log('Dispute reason:', dispute.reason);
    console.log('Dispute amount:', dispute.amount);
    
    // Send notification to admin
    // Update order status
    // Prepare dispute response if needed
    
  } catch (error) {
    console.error('Error handling dispute:', error);
  }
}

/**
 * Health check endpoint
 * GET /api/stripe/health
 */
router.get('/health', async (req, res) => {
  try {
    // Test Stripe connection by retrieving account info
    const account = await stripe.accounts.retrieve();
    
    res.json({
      status: 'healthy',
      account_id: account.id,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;
