import mongoose from 'mongoose';

// Market Data schema for storing contract data
const marketDataSchema = new mongoose.Schema({
    contractAddress: { type: String, required: true },
    date: { type: String, required: true }, // Format: DD-MM-YYYY
    marketCap: { type: Number, required: true },
    tradingVolume: { type: Number, required: true },
}, {
    timestamps: true,
});

const MarketData = mongoose.model('MarketData', marketDataSchema);

export default MarketData;
