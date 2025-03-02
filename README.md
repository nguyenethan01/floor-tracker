# NFT Floor Price Alert System

A Node.js application that monitors NFT floor prices across different chains and sends SMS alerts when significant price movements occur.

## Features

- Monitor NFT floor prices across different blockchain networks
- Configure price movement thresholds for alerts
- SMS notifications via Twilio
- RESTful API for managing alert configurations
- MongoDB for persistent storage

## Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/nft-floor-price-alert.git
cd nft-floor-price-alert
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_twilio_phone_number
MONGO_URI=your_mongodb_uri
PORT=3000
```

4. Start the application:
```bash
npm start
```

## API Endpoints

### Create Alert Configuration
```
POST /api/alerts
```

Example request body:
```json
{
  "userId": "user123",
  "phoneNumber": "+1234567890",
  "chain": "hyperliquid",
  "contractAddress": "0x123...",
  "collectionName": "Wealthy Hypio Babies",
  "percentageThreshold": 10,
  "lastKnownPrice": 100
}
```

### Get All Alert Configurations
```
GET /api/alerts
```

### Delete Alert Configuration
```
DELETE /api/alerts/:id
```

## License

MIT