// config/db.js

import mongoose from "mongoose";

const connectDB = async () => {
    const dbURI = process.env.DBURI;
    try {
        await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected successfully!");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit the app in case of an error
    }
};

export default connectDB;
