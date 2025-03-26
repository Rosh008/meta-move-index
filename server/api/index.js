import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from "../config/db.js";
import projectRoutes from "./projectRoutes.js";
import mindshareRoutes from './mindShareRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();
const app = express();

const allowedOrigins = [
  "https://aptindexai.netlify.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: (origin, callback) => {
    console.log("🛠 Checking origin:", origin);  // ✅ Log incoming origin
    if (!origin || allowedOrigins.includes(origin)) {
      console.log("✅ CORS allowed for:", origin);
      callback(null, true);
    } else {
      console.error("❌ CORS blocked:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
  allowedHeaders: "Content-Type, Authorization"
}));
app.use(bodyParser.json());

connectDB();

app.use("/api/projects", projectRoutes);
app.use("/api/mindshare", mindshareRoutes);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;
