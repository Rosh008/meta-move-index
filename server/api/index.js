import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from "../config/db.js";
import projectRoutes from "./projectRoutes.js";
import mindshareRoutes from './mindShareRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();
const app = express();
app.use(bodyParser.json());
const allowedOrigins = ["https://aptindexai.netlify.app", "http://localhost:5173"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// ✅ Add CORS middleware separately
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

connectDB();

app.use("/api/projects", projectRoutes);
app.use("/api/mindshare", mindshareRoutes);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;
