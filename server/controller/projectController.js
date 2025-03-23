// controllers/projectController.js

import Project from "../models/project.js";
import axios from 'axios';
import moment from 'moment';

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

export const getProjectByCA = async (req, res) => {
    const { contractAddress } = req.params; // Assuming the contract address is passed in the URL parameter

    try {
        // Query the project by contract address
        const project = await Project.findOne({ contractAddress }); 

        if (!project) {
            return res.status(404).send({ message: "Project not found" });
        }

        res.status(200).send({ message: "Project fetched successfully", data: project });
    } catch (err) {
        res.status(500).send({ message: "Error fetching project", error: err });
    }
};


export const getProjectCount = async (req, res) => {
    try {
        const count = await Project.countDocuments();  // Count the number of documents in the Project collection
        res.status(200).send({ message: "Project count fetched successfully", count });
    } catch (err) {
        res.status(500).send({ message: "Error fetching project count", error: err });
    }
};

export const countProjectsWithTokens = async (req, res) => {
    try {
        // Query to find projects where the 'token' field exists and is not an empty string
        const count = await Project.countDocuments({
            token: { $exists: true, $ne: "", $ne: null } // Ensure 'token' is not an empty string or null
        });

        res.status(200).send({ message: "Projects with tokens counted successfully", count });
    } catch (err) {
        console.error('Error counting projects with tokens:', err); // Log the error for debugging
        res.status(500).send({ message: "Error counting projects with tokens", error: err.message });
    }
};

export const getSolanaTokenData = async (req, res) => {
    const { contractAddress } = req.params; // Extract the contract address from route parameters

    try {
        // Construct the API URL for DEXScreener using the contract address
        const url = `https://api.dexscreener.com/latest/dex/pairs/solana/${contractAddress}`;

        // Make the GET request to DEXScreener API
        const response = await axios.get(url);

        // Extract the market cap and 24h trading volume from the response
        const data = response.data;
        console.log(data);
        const marketCap = data?.pair?.marketCap || 'Market cap data not available';
        const tradingVolume24h = data?.pair?.volume24h || 'Trading volume data not available';

        // Send the response to the client
        res.status(200).json({
            marketCap,
            tradingVolume24h
        });
    } catch (error) {
        // If there's an error, send an error message
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: 'Error fetching data from DEXScreener API' });
    }
};


// Function to fetch market cap and trading volume for a given contract address
const fetchMarketDataForContract = async (contractAddress) => {
    try {
        // API URL with the dynamic contract address
        const url = `https://api.dexscreener.com/latest/dex/pairs/solana/${contractAddress}`;
        
        // Fetch market data for the contract address
        const response = await axios.get(url);
        
        // Assuming the API response structure contains the market cap and trading volume under 'pair' object
        const marketCap = response.data?.pair?.marketCap || 0;
        const tradingVolume = response.data?.pair?.volume?.h24 || 0;

        // Return market cap and trading volume
        return { marketCap, tradingVolume };
    } catch (error) {
        console.error(`Error fetching market data for contract ${contractAddress}:`, error);
        return { marketCap: 0, tradingVolume: 0 }; // Return 0 if there is an error
    }
};

// Controller to get the summed market cap and trading volume for the past 10 days for all contract addresses
export const getSumOfMarketCapAndVolumeForAllContracts = async (req, res) => {
    try {
        // Fetch all contract addresses from the Project model
        const projects = await Project.find({ contractAddress: { $exists: true } });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ message: 'No projects with contract addresses found.' });
        }

        // Initialize an array to store the result data
        const result = [];

        // Get today's date and loop through the past 10 days
        const today = moment();
        for (let i = 0; i < 10; i++) {
            const formattedDate = today.subtract(i, 'days').format('DD-MM-YYYY');
            let totalMarketCapForDay = 0;
            let totalTradingVolumeForDay = 0;

            // Loop through each project and fetch the market data for each contract address
            for (const project of projects) {
                const contractAddress = project.contractAddress;
                console.log(contractAddress)

                // Fetch market data (market cap and trading volume) for this contract address
                const { marketCap, tradingVolume } = await fetchMarketDataForContract(contractAddress);
                

                // Add this contract's market cap and trading volume to the totals for the day
                totalMarketCapForDay += marketCap;
                totalTradingVolumeForDay += tradingVolume;
            }

            // Convert the total market cap and trading volume to human-readable format (Billions and Millions)
            const formattedMarketCap = (totalMarketCapForDay / 1e9).toFixed(2) + 'B';
            const formattedTradingVolume = (totalTradingVolumeForDay / 1e6).toFixed(2) + 'M';

            // Push the formatted data into the result array
            result.push({
                date: formattedDate,
                totalMarketCap: formattedMarketCap,
                totalTradingVolume: formattedTradingVolume,
            });
        }

        // Return the result in the required format
        res.status(200).json({ marketCapAndVolumeData: result });
    } catch (error) {
        console.error('Error fetching sum of market cap and trading volume for all contract addresses:', error);
        res.status(500).json({
            message: 'Error fetching market cap and trading volume data for all contract addresses.',
        });
    }
};
