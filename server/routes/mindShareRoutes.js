// routes/mindshareRoutes.js
import express from 'express';
import MindshareController from '../controller/mindshareController.js';
import {getTopMindshares, storeMindshare, getMindshareByCA} from '../controller/mindshareController.js'

const router = express.Router();

// Route for calculating Solana token mindshare
router.get('/calculate', MindshareController.calculateMindshare);

// POST API to store the mindshare value
router.post('/mindshare', storeMindshare);

// GET API to get the top 6 contracts with the highest mindshare
router.get('/mindshares/top', getTopMindshares);

router.get("/mindshares/:contractAddress", getMindshareByCA);

export default router;
