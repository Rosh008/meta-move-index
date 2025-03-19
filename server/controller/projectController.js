// controllers/projectController.js

import Project from "../models/project.js";

// POST request to create a new project
export const createProject = async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).send({ message: "Project saved successfully!", data: newProject });
    } catch (err) {
        res.status(400).send({ message: "Error saving project", error: err });
    }
};

// GET request to fetch all projects
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).send({ message: "Projects fetched successfully", data: projects });
    } catch (err) {
        res.status(500).send({ message: "Error fetching projects", error: err });
    }
};
