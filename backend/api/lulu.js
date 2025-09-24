// api/lulu.js - Backend API routes for Lulu Print API integration
const express = require('express');
const axios = require('axios');
const router = express.Router();

// Lulu API configuration
const LULU_API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.lulu.com' 
  : 'https://api.sandbox.lulu.com';

const LULU_CLIENT_KEY = process.env.LULU_CLIENT_KEY;
const LULU_CLIENT_SECRET = process.env.LULU_CLIENT_SECRET;

// Store access tokens in memory (in production, use Redis or database)
let accessToken = null;
let tokenExpiry = null;

/**
 * Get OAuth access token for Lulu API
 */
async function getLuluAccessToken() {
  // Check if we have a valid token
  if (accessToken && tokenExpiry && Date.now() < tokenExpiry) {
    return accessToken;
  }

  try {
    const response = await axios.post(`${LULU_API_BASE_URL}/auth/realms/glasstree/protocol/openid-connect/token`, 
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: LULU_CLIENT_KEY,
        client_secret: LULU_CLIENT_SECRET
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    accessToken = response.data.access_token;
    // Set expiry to 5 minutes before actual expiry for safety
    tokenExpiry = Date.now() + (response.data.expires_in - 300) * 1000;
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Lulu access token:', error.response?.data || error.message);
    throw new Error('Failed to authenticate with Lulu API');
  }
}

/**
 * Make authenticated request to Lulu API
 */
async function luluApiRequest(method, endpoint, data = null) {
  const token = await getLuluAccessToken();
  
  const config = {
    method,
    url: `${LULU_API_BASE_URL}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  if (data) {
    config.data = data;
  }

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Lulu API ${method} ${endpoint} error:`, error.response?.data || error.message);
    throw error;
  }
}

/**
 * Calculate print job cost
 * POST /api/lulu/calculate-cost
 */
router.post('/calculate-cost', async (req, res) => {
  try {
    const { line_items, shipping_address, shipping_level } = req.body;

    // Validate required fields
    if (!line_items || !shipping_address || !shipping_level) {
      return res.status(400).json({
        error: 'Missing required fields: line_items, shipping_address, shipping_level'
      });
    }

    const costData = await luluApiRequest('POST', '/print-job-cost-calculations/', {
      line_items,
      shipping_address,
      shipping_level
    });

    res.json(costData);
  } catch (error) {
    console.error('Cost calculation error:', error);
    res.status(500).json({
      error: 'Failed to calculate print job cost',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Create a print job
 * POST /api/lulu/create-print-job
 */
router.post('/create-print-job', async (req, res) => {
  try {
    const { line_items, shipping_address, contact_email, shipping_level, external_id } = req.body;

    // Validate required fields
    if (!line_items || !shipping_address || !contact_email || !shipping_level) {
      return res.status(400).json({
        error: 'Missing required fields: line_items, shipping_address, contact_email, shipping_level'
      });
    }

    // Ensure phone number is present in shipping address
    if (!shipping_address.phone_number) {
      return res.status(400).json({
        error: 'Phone number is required in shipping address'
      });
    }

    const printJobData = {
      line_items,
      shipping_address,
      contact_email,
      shipping_level,
      external_id: external_id || `order_${Date.now()}`
    };

    const printJob = await luluApiRequest('POST', '/print-jobs/', printJobData);

    res.json(printJob);
  } catch (error) {
    console.error('Print job creation error:', error);
    res.status(500).json({
      error: 'Failed to create print job',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Get print job status
 * GET /api/lulu/print-job/:id
 */
router.get('/print-job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const printJob = await luluApiRequest('GET', `/print-jobs/${id}/`);
    
    res.json(printJob);
  } catch (error) {
    console.error('Print job retrieval error:', error);
    res.status(404).json({
      error: 'Print job not found',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Get print job status by external ID
 * GET /api/lulu/print-job-by-external-id/:externalId
 */
router.get('/print-job-by-external-id/:externalId', async (req, res) => {
  try {
    const { externalId } = req.params;
    
    // List print jobs and filter by external_id
    const printJobs = await luluApiRequest('GET', '/print-jobs/');
    const matchingJob = printJobs.results?.find(job => job.external_id === externalId);
    
    if (!matchingJob) {
      return res.status(404).json({
        error: 'Print job not found with the specified external ID'
      });
    }
    
    res.json(matchingJob);
  } catch (error) {
    console.error('Print job retrieval by external ID error:', error);
    res.status(500).json({
      error: 'Failed to retrieve print job',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Cancel a print job (only works if status is UNPAID)
 * POST /api/lulu/cancel-print-job/:id
 */
router.post('/cancel-print-job/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await luluApiRequest('POST', `/print-jobs/${id}/status/`, {
      status: 'CANCELED'
    });
    
    res.json(result);
  } catch (error) {
    console.error('Print job cancellation error:', error);
    res.status(500).json({
      error: 'Failed to cancel print job',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Get shipping options for a specific destination
 * POST /api/lulu/shipping-options
 */
router.post('/shipping-options', async (req, res) => {
  try {
    const { line_items, shipping_address } = req.body;

    if (!line_items || !shipping_address) {
      return res.status(400).json({
        error: 'Missing required fields: line_items, shipping_address'
      });
    }

    const shippingOptions = await luluApiRequest('POST', '/shipping-options/', {
      line_items,
      shipping_address
    });

    res.json(shippingOptions);
  } catch (error) {
    console.error('Shipping options error:', error);
    res.status(500).json({
      error: 'Failed to get shipping options',
      details: error.response?.data || error.message
    });
  }
});

/**
 * Webhook endpoint for Lulu status updates
 * POST /api/lulu/webhook
 */
router.post('/webhook', async (req, res) => {
  try {
    const { topic, data } = req.body;
    
    console.log('Lulu webhook received:', { topic, data });
    
    // Handle different webhook topics
    switch (topic) {
      case 'PRINT_JOB_STATUS_CHANGED':
        // Update your database with the new status
        // Send email notifications to customers
        // Update any external systems
        console.log(`Print job ${data.id} status changed to ${data.status.name}`);
        break;
      
      default:
        console.log('Unknown webhook topic:', topic);
    }
    
    // Always respond with 200 to acknowledge receipt
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

/**
 * Health check endpoint
 * GET /api/lulu/health
 */
router.get('/health', async (req, res) => {
  try {
    // Test authentication
    await getLuluAccessToken();
    
    res.json({
      status: 'healthy',
      api_url: LULU_API_BASE_URL,
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
