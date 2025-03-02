import { Twilio } from 'twilio';
import axios from 'axios';
import { config } from '../config';
import { AlertConfig } from '../models/AlertConfig';

export class PriceAlertService {
  private twilio: Twilio;

  constructor() {
    this.twilio = new Twilio(config.twilioAccountSid!, config.twilioAuthToken!);
  }

  async checkPrices() {
    const alerts = await AlertConfig.find({});
    
    for (const alert of alerts) {
      try {
        const currentPrice = await this.getFloorPrice(alert.chain, alert.contractAddress);
        const priceDiff = ((currentPrice - alert.lastKnownPrice) / alert.lastKnownPrice) * 100;

        if (Math.abs(priceDiff) >= alert.percentageThreshold) {
          await this.sendAlert(alert, currentPrice, priceDiff);
          alert.lastKnownPrice = currentPrice;
          alert.lastAlertTime = new Date();
          await alert.save();
        }
      } catch (error) {
        console.error(`Error checking price for ${alert.collectionName}:`, error);
      }
    }
  }

  private async getFloorPrice(chain: string, contractAddress: string): Promise<number> {
    // This is a placeholder - you'll need to implement different API calls based on the chain
    if (chain === 'hyperliquid') {
      const response = await axios.get(`https://api.hyperliquid.xyz/nft/${contractAddress}/floor`);
      return response.data.floorPrice;
    }
    throw new Error('Unsupported chain');
  }

  private async sendAlert(alert: IAlertConfig, currentPrice: number, priceDiff: number) {
    const message = `
      Alert for ${alert.collectionName}!
      Floor price has moved ${priceDiff.toFixed(2)}%
      Current price: ${currentPrice}
      Previous price: ${alert.lastKnownPrice}
    `;

    await this.twilio.messages.create({
      body: message,
      to: alert.phoneNumber,
      from: config.twilioPhoneNumber
    });
  }
} 