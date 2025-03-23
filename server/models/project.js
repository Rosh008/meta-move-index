// models/project.js

import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    twitterHandle: { type: String, required: true },
    description: { type: String, required: true },
    websiteLink: { type: String, required: true },
    telegramLink: { type: String, required: true },
    githubLink: { type: String, required: true },
    category: { type: String, required: true },
    framework: { type: String, required: true },
    doxxed: { type: String, required: true },
    token: { type: String, required: false },
    isOnTeam: { type: String, required: true },
    contractAddress: { type: String, required: true}
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
