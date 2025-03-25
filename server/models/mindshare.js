import mongoose from 'mongoose';

const mindshareSchema = new mongoose.Schema({
    contractAddress: {
        type: String,
        required: true,
        unique: true, // Ensure each contract address is unique
    },
    mindshareValue: {
        type: Number,
        required: true,
    },
    sentiment: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Mindshare = mongoose.model('Mindshare', mindshareSchema);

export default Mindshare;
