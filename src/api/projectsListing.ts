import { API_BASE_URL } from "@/lib/constant";
import { projectsDetails, projectsListing } from "@/mocks";
import axios from 'axios';


export async function fetchProjectListing() {

    // return axios.get('http://localhost:5001/api/projects')

    return Promise.resolve(projectsListing)
}


export async function fetchProjectData(tokenAddresses: String) {
    return axios.get(`https://api.dexscreener.com/tokens/v1/solana/${tokenAddresses}`)
}

export async function fetchProjectDetails() {
    // return axios.get(`http://localhost:5001/api/project/${tokenAddresses}`)
    return Promise.resolve(projectsDetails)
}

export async function fetchProjectsCount() {
    return axios.get(`${API_BASE_URL}/api/projects/projects/count`)
}

export async function fetchProjectsWithTokenCount() {
    return axios.get(`${API_BASE_URL}/api/projects/projects/countWithTokens`)
}

export async function fetchProjectsSumMarketCapAndVolumeForAllContracts() {
    return axios.get(`${API_BASE_URL}/api/projects/pro/sum-all-contracts`)
}