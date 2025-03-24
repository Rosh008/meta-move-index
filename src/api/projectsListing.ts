import { projectsDetails, projectsListing } from "@/mocks";
import axios from 'axios';


export async function fetchProjectListing() {

    // return axios.get('http://localhost:5001/api/projects')

    return Promise.resolve(projectsListing)
}


export async function fetchProjectData(tokenAddresses: String) {
    return axios.get(`https://api.dexscreener.com/tokens/v1/solana/${tokenAddresses}`)
}

export async function fetchProjectDetails(tokenAddresses: String) {
    // return axios.get(`http://localhost:5001/api/project/${tokenAddresses}`)
    return Promise.resolve(projectsDetails)
}