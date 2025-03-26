import dotenv from 'dotenv';

dotenv.config()

import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import mindshareRoutes from './routes/mindShareRoutes.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api", projectRoutes);
app.use("/api/mindshare", mindshareRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
