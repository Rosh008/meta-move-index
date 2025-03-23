// routes/projectRoutes.js

import express from "express";
import { createProject, getProjects, getProjectByCA, getProjectCount, countProjectsWithTokens, getSolanaTokenData, getSumOfMarketCapAndVolumeForAllContracts } from "../controller/projectController.js";

const router = express.Router();

// POST request to create a new project
router.post("/projects", createProject);

// GET request to fetch all projects
router.get("/projects", getProjects);

// GET request to fetch a specific project by its name
router.get("/project/:contractAddress", getProjectByCA);

// GET request to fetch the count of projects
router.get("/projects/count", getProjectCount);

// GET request to count projects with tokens
router.get("/projects/countWithTokens", countProjectsWithTokens);

// Define a GET route to fetch the market cap and 24h volume for a Solana token
router.get('/projects/:contractAddress', getSolanaTokenData);

// Define a GET route to fetch the market cap and 24h volume for a Solana token
router.get('/pro/sum-all-contracts', getSumOfMarketCapAndVolumeForAllContracts);

export default router;