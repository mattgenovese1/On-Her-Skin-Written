# Lulu API Research Findings

## Overview
The Lulu Print API is a RESTful API that allows integration with Lulu's print-on-demand and fulfillment network. It uses JSON-encoded messages and is secured with OpenID Connect and HTTPS.

## Key Points for Integration

### Authentication
- Uses OpenID Connect authentication layer built on OAuth 2.0
- Requires client_key and client_secret
- Uses JSON Web Tokens (JWT) for authorization
- Must generate access tokens using POST request to token endpoint

### API Endpoints
- Production: https://api.lulu.com/
- Sandbox: https://api.sandbox.lulu.com/

### Core Functionality
1. **Print-Job Creation**: Create print jobs with line items, shipping address, contact email
2. **Cost Calculations**: Calculate printing and shipping costs
3. **Status Tracking**: Monitor print job status through various stages
4. **Shipping Options**: Multiple shipping levels (MAIL, PRIORITY_MAIL, GROUND, EXPEDITED, EXPRESS)
5. **Webhooks**: Subscribe to status change notifications

### Print-Job Requirements
- `line_items` (required): List of books to be printed
- `shipping_address` (required): Customer address with phone number
- `contact_email` (required): Email for questions
- `shipping_level` (required): Shipping method selection
- `external_id` (optional): Reference number for linking to external systems

### Print-Job Status Flow
1. CREATED → UNPAID → PAYMENT_IN_PROGRESS → PRODUCTION_DELAYED → PRODUCTION_READY → IN_PRODUCTION → SHIPPED
2. Error states: REJECTED, CANCELED

### Important Notes
- Sandbox environment available for testing
- Phone number required in shipping address
- API requires intermediate programming skills
- Webhooks available for real-time status updates
- Files must be validated before creating print jobs

## Integration Considerations
- Need to handle OAuth token generation and refresh
- Must implement proper error handling for rejected/canceled orders
- Should use webhooks for status updates rather than polling
- Requires file validation before submitting print jobs
- Need to handle different shipping options and cost calculations
