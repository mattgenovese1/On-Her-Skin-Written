# Complete Checkout System Setup Instructions

This guide provides detailed step-by-step instructions for setting up a complete checkout system that integrates Lulu API for book printing and Stripe for payment processing.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Environment Configuration](#environment-configuration)
6. [API Keys Setup](#api-keys-setup)
7. [Testing the System](#testing-the-system)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, ensure you have the following installed on your system:

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)
- **Git** (for version control)
- **Visual Studio Code** (recommended code editor)

### Verify Prerequisites

Open your terminal/command prompt and run these commands to verify installations:

```bash
# Check Node.js version (should be 16+)
node --version

# Check npm version
npm --version

# Check Git version
git --version
```

## Project Structure

Your project should have the following structure:

```
book-checkout-system/
├── backend/                    # Backend API server
│   ├── api/
│   │   ├── lulu.js            # Lulu API routes
│   │   └── stripe.js          # Stripe API routes
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   ├── .env.example           # Environment variables template
│   ├── Dockerfile             # Docker configuration
│   └── healthcheck.js         # Health check script
├── frontend/                   # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── CheckoutSuccessPage.jsx
│   │   │   └── CheckoutCancelPage.jsx
│   │   ├── App.jsx            # Updated main app component
│   │   └── index.js
│   └── package.json           # Frontend dependencies
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # Project documentation
```

## Backend Setup

### Step 1: Create Backend Directory and Initialize

```bash
# Create the main project directory
mkdir book-checkout-system
cd book-checkout-system

# Create backend directory
mkdir backend
cd backend

# Initialize npm project
npm init -y
```

**Explanation**: This creates a new directory for your project and initializes a Node.js project with a `package.json` file.

### Step 2: Install Backend Dependencies

```bash
# Install production dependencies
npm install express stripe axios cors helmet express-rate-limit morgan dotenv

# Install development dependencies
npm install --save-dev nodemon jest supertest eslint
```

**Explanation of Dependencies**:
- **express**: Web framework for Node.js
- **stripe**: Official Stripe SDK for payment processing
- **axios**: HTTP client for making API requests to Lulu
- **cors**: Enables Cross-Origin Resource Sharing
- **helmet**: Security middleware for Express
- **express-rate-limit**: Rate limiting middleware
- **morgan**: HTTP request logger
- **dotenv**: Loads environment variables from .env file
- **nodemon**: Development tool that restarts server on file changes
- **jest**: Testing framework
- **supertest**: HTTP testing library
- **eslint**: Code linting tool

### Step 3: Create Backend Files

Copy the following files to your backend directory:
- `server.js` (main server file)
- `api/lulu.js` (Lulu API routes)
- `api/stripe.js` (Stripe API routes)
- `package.json` (backend dependencies)
- `.env.example` (environment variables template)
- `healthcheck.js` (Docker health check)

### Step 4: Update Package.json Scripts

Edit your `backend/package.json` to include these scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "lint": "eslint ."
  }
}
```

**Explanation**: These scripts allow you to:
- `npm start`: Run the production server
- `npm run dev`: Run the development server with auto-restart
- `npm test`: Run tests
- `npm run lint`: Check code quality

## Frontend Setup

### Step 1: Create React Application

```bash
# Navigate back to project root
cd ..

# Create React app
npx create-react-app frontend
cd frontend
```

**Explanation**: This creates a new React application with all the necessary build tools and dependencies pre-configured.

### Step 2: Install Additional Frontend Dependencies

```bash
# Install additional dependencies for the checkout system
npm install axios framer-motion react-router-dom
```

**Explanation of Dependencies**:
- **axios**: For making HTTP requests to your backend API
- **framer-motion**: For smooth animations and transitions
- **react-router-dom**: For client-side routing

### Step 3: Update Frontend Files

Replace or create the following files in your `frontend/src` directory:
- `App.jsx` (updated with checkout routes)
- `components/CheckoutPage.jsx`
- `components/CheckoutSuccessPage.jsx`
- `components/CheckoutCancelPage.jsx`

### Step 4: Configure Proxy for Development

Add this line to your `frontend/package.json`:

```json
{
  "proxy": "http://localhost:3001"
}
```

**Explanation**: This tells the React development server to proxy API requests to your backend server, avoiding CORS issues during development.

## Environment Configuration

### Step 1: Create Environment File

In your backend directory, copy `.env.example` to `.env`:

```bash
cd backend
cp .env.example .env
```

### Step 2: Fill in Environment Variables

Edit the `.env` file with your actual values:

```env
# Server Configuration
NODE_ENV=development
PORT=3001

# Lulu API Configuration
LULU_CLIENT_KEY=your_actual_lulu_client_key
LULU_CLIENT_SECRET=your_actual_lulu_client_secret

# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_actual_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_actual_webhook_secret

# Book Configuration
BOOK_SKU=your_actual_book_sku

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

**Important**: Never commit the `.env` file to version control. It contains sensitive information.

## API Keys Setup

### Step 1: Get Lulu API Keys

1. **Create Lulu Account**:
   - Go to [https://developers.lulu.com/](https://developers.lulu.com/)
   - Sign up for a developer account
   - Verify your email address

2. **Access Developer Portal**:
   - Log in to your Lulu account
   - Navigate to the Developer Portal
   - Go to "API Keys" section

3. **Generate API Keys**:
   - Click "Generate new API Key"
   - Copy the Client Key and Client Secret
   - Paste them into your `.env` file

4. **Get Your Book SKU**:
   - Create your book in Lulu's system
   - Note down the SKU (Stock Keeping Unit)
   - Add it to your `.env` file

### Step 2: Get Stripe API Keys

1. **Create Stripe Account**:
   - Go to [https://stripe.com](https://stripe.com)
   - Sign up for an account
   - Complete account verification

2. **Access Dashboard**:
   - Log in to Stripe Dashboard
   - Go to "Developers" → "API keys"

3. **Copy API Keys**:
   - Copy the "Publishable key" (starts with `pk_test_`)
   - Copy the "Secret key" (starts with `sk_test_`)
   - Paste them into your `.env` file

4. **Set Up Webhooks**:
   - Go to "Developers" → "Webhooks"
   - Click "Add endpoint"
   - Enter URL: `http://localhost:3001/api/stripe/webhook`
   - Select events: `checkout.session.completed`, `checkout.session.expired`
   - Copy the webhook secret and add to `.env`

## Testing the System

### Step 1: Start the Backend Server

```bash
# Navigate to backend directory
cd backend

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Expected Output**:
```
Server running on port 3001
Environment: development
Health check: http://localhost:3001/health
✅ All required environment variables are set
```

### Step 2: Test Backend Health

Open a new terminal and test the health endpoint:

```bash
# Test health endpoint
curl http://localhost:3001/health

# Expected response:
# {"status":"healthy","timestamp":"2024-01-01T12:00:00.000Z","uptime":10.5,"environment":"development"}
```

### Step 3: Start the Frontend

```bash
# Navigate to frontend directory (new terminal)
cd frontend

# Install dependencies (if not already done)
npm install

# Start React development server
npm start
```

**Expected Output**:
```
Compiled successfully!

You can now view frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000
```

### Step 4: Test the Complete Flow

1. **Open Browser**: Navigate to `http://localhost:3000`
2. **Navigate to Buy Now**: Click the "Buy Now" button
3. **Select Direct Checkout**: Click "Buy Now - Secure Checkout"
4. **Fill Form**: Complete the shipping information form
5. **Test Checkout**: Click "Complete Purchase" (this will redirect to Stripe)

**Note**: In test mode, use Stripe's test card numbers:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Deployment

### Option 1: Manual Deployment

1. **Build Frontend**:
```bash
cd frontend
npm run build
```

2. **Deploy Backend**:
```bash
cd backend
# Set production environment variables
export NODE_ENV=production
# Start server
npm start
```

### Option 2: Docker Deployment

1. **Build Docker Image**:
```bash
cd backend
docker build -t book-checkout-backend .
```

2. **Run with Docker Compose**:
```bash
# From project root
docker-compose up -d
```

### Option 3: Cloud Deployment

**Backend (Heroku)**:
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set LULU_CLIENT_KEY=your_key
heroku config:set LULU_CLIENT_SECRET=your_secret
heroku config:set STRIPE_SECRET_KEY=your_key
heroku config:set STRIPE_WEBHOOK_SECRET=your_secret

# Deploy
git push heroku main
```

**Frontend (Vercel)**:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel --prod
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "Module not found" errors
**Problem**: Missing dependencies
**Solution**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### 2. CORS errors in browser
**Problem**: Frontend can't connect to backend
**Solution**: Ensure proxy is set in `frontend/package.json`:
```json
"proxy": "http://localhost:3001"
```

#### 3. Stripe webhook verification fails
**Problem**: Webhook secret is incorrect
**Solution**: 
1. Check webhook secret in Stripe Dashboard
2. Update `.env` file with correct secret
3. Restart backend server

#### 4. Lulu API authentication fails
**Problem**: Invalid client credentials
**Solution**:
1. Verify credentials in Lulu Developer Portal
2. Ensure no extra spaces in `.env` file
3. Check if using sandbox vs production URLs

#### 5. Port already in use
**Problem**: Port 3001 or 3000 is occupied
**Solution**:
```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
PORT=3002 npm run dev
```

### Debug Mode

Enable debug logging by setting:
```env
LOG_LEVEL=debug
```

### Testing API Endpoints

Use these curl commands to test your API:

```bash
# Test Lulu health
curl http://localhost:3001/api/lulu/health

# Test Stripe health
curl http://localhost:3001/api/stripe/health

# Test cost calculation
curl -X POST http://localhost:3001/api/lulu/calculate-cost \
  -H "Content-Type: application/json" \
  -d '{
    "line_items": [{"sku": "your_sku", "quantity": 1}],
    "shipping_address": {
      "name": "Test User",
      "street1": "123 Test St",
      "city": "Test City",
      "state_code": "CA",
      "postcode": "12345",
      "country_code": "US",
      "phone_number": "555-123-4567"
    },
    "shipping_level": "PRIORITY_MAIL"
  }'
```

## Security Considerations

1. **Never commit `.env` files** to version control
2. **Use HTTPS in production** for all API endpoints
3. **Validate webhook signatures** from Stripe
4. **Implement rate limiting** on all endpoints
5. **Use environment-specific API keys** (test vs production)
6. **Regularly rotate API keys** and secrets
7. **Monitor API usage** and set up alerts

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review server logs for error messages
3. Test API endpoints individually
4. Verify environment variables are set correctly
5. Ensure all dependencies are installed

For additional help, refer to the official documentation:
- [Lulu API Documentation](https://api.lulu.com/docs/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [React Documentation](https://reactjs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)

## Next Steps

After successful setup:

1. **Customize the design** to match your brand
2. **Add email notifications** for order confirmations
3. **Implement order tracking** and status updates
4. **Add analytics** to track conversion rates
5. **Set up monitoring** and error reporting
6. **Create admin dashboard** for order management
7. **Add more payment methods** if needed
8. **Implement inventory management** if selling multiple books

Remember to test thoroughly before going live with real payments!
