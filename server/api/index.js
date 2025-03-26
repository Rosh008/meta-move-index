import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import connectDB from "../config/db.js";
import projectRoutes from "./projectRoutes.js";
import mindshareRoutes from './mindShareRoutes.js';
// import dotenv from 'dotenv';

// dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/projects", projectRoutes);
app.use("/api/mindshare", mindshareRoutes);

// const PORT = process.env.PORT;
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
export default app;
