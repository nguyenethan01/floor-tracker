import dotenv from 'dotenv';

dotenv.config();

export const config = {
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/nft-alerts',
  port: process.env.PORT || 3000
}; 