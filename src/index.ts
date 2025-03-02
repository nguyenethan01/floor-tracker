import express from 'express';
import mongoose from 'mongoose';
import { config } from './config';
import { AlertConfig } from './models/AlertConfig';
import { PriceAlertService } from './services/PriceAlertService';

const app = express();
app.use(express.json());

const priceAlertService = new PriceAlertService();

// Create new alert configuration
app.post('/api/alerts', async (req, res) => {
  try {
    const alertConfig = new AlertConfig(req.body);
    await alertConfig.save();
    res.status(201).json(alertConfig);
  } catch (error) {
    res.status(400).json({ error: 'Invalid alert configuration' });
  }
});

// Get all alert configurations
app.get('/api/alerts', async (req, res) => {
  const alerts = await AlertConfig.find({});
  res.json(alerts);
});

// Delete alert configuration
app.delete('/api/alerts/:id', async (req, res) => {
  await AlertConfig.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Start price checking service
setInterval(() => {
  priceAlertService.checkPrices();
}, 5 * 60 * 1000); // Check every 5 minutes

mongoose.connect(config.mongoUri)
  .then(() => {
    app.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
    });
  })
  .catch(console.error); 