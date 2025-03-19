// routes/projectRoutes.js

import express from "express";
import { createProject, getProjects } from "../controller/projectController.js";

const router = express.Router();

// POST request to create a new project
router.post("/projects", createProject);

// GET request to fetch all projects
router.get("/projects", getProjects);

export default router;