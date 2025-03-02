import mongoose, { Schema, Document } from 'mongoose';

export interface IAlertConfig extends Document {
  userId: string;
  phoneNumber: string;
  chain: string;
  contractAddress: string;
  collectionName: string;
  percentageThreshold: number;
  lastKnownPrice: number;
  lastAlertTime: Date;
}

const AlertConfigSchema: Schema = new Schema({
  userId: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  chain: { type: String, required: true },
  contractAddress: { type: String, required: true },
  collectionName: { type: String, required: true },
  percentageThreshold: { type: Number, required: true },
  lastKnownPrice: { type: Number, required: true },
  lastAlertTime: { type: Date, default: Date.now }
});

export const AlertConfig = mongoose.model<IAlertConfig>('AlertConfig', AlertConfigSchema); 