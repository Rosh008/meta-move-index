import { API_BASE_URL } from "@/lib/constant";
import axios from 'axios';


export async function fetchProjectListing() {
    return axios.get(`${API_BASE_URL}/api/projects/projects`)
}


export async function fetchProjectData(tokenAddresses: String) {
    return axios.get(`https://api.dexscreener.com/tokens/v1/aptos/${tokenAddresses}`)
}

export async function fetchProjectDetails(tokenAddress: String) {
    return axios.get(`${API_BASE_URL}/api/projects/project/${tokenAddress}`)
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