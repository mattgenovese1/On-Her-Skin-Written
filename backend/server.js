// server.js - Main Express server for handling Lulu and Stripe integrations
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Import route handlers
const luluRoutes = require('./api/lulu');
const stripeRoutes = require('./api/stripe');

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const devOrigins = ['http://localhost:3000', 'http://0.0.0.0:3000'];
    const prodOrigins = [
      'https://onherskinwritten.com',
      'https://www.onherskinwritten.com',
      'https://onher.vercel.app'
    ];
    const allowed = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins;
    // Allow server-to-server or curl with no origin
    if (!origin) return callback(null, true);
    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked for origin: ${origin}`), false);
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.'
  }
});
app.use('/api/', limiter);

// Webhook rate limiting (more restrictive)
const webhookLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 50 webhook requests per windowMs
  message: {
    error: 'Too many webhook requests from this IP.'
  }
});
app.use('/api/*/webhook', webhookLimiter);

// Logging
app.use(morgan('combined'));

// Body parsing middleware
// Note: Stripe webhooks need raw body, so we handle that specifically in the stripe routes
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/lulu', luluRoutes);
app.use('/api/stripe', stripeRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Book Purchase API Server',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      lulu: '/api/lulu',
      stripe: '/api/stripe'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  res.status(error.status || 500).json({
    error: 'Internal server error',
    message: isDevelopment ? error.message : 'Something went wrong',
    ...(isDevelopment && { stack: error.stack })
  });
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  
  // Validate required environment variables
  const requiredEnvVars = [
    'LULU_CLIENT_KEY',
    'LULU_CLIENT_SECRET',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET'
  ];
  
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:');
    missingEnvVars.forEach(varName => {
      console.error(` - ${varName}`);
    });
    console.error('Set these in your environment or a .env file and restart the server.');
    process.exit(1);
  } else {
    console.log('✅ All required environment variables are set');
  }
});

module.exports = app;
