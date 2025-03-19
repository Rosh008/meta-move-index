// routes/mindshareRoutes.js
import express from 'express';
import MindshareController from '../controller/mindshareController.js';

const router = express.Router();

// Route for calculating Solana token mindshare
router.get('/calculate', MindshareController.calculateMindshare);

export default router;
