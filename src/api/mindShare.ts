import { API_BASE_URL } from '@/lib/constant';
import axios from 'axios';

export async function fetchMindshareData(contractAddress: String){
    return axios.get(`${API_BASE_URL}/api/mindshare/mindshares/${contractAddress}`)
}


export async function fetchTopMindShareData(){
    return axios.get(`${API_BASE_URL}/api/mindshare/mindshares/top`);
}

export async function fetchTwitterFollowerCount(twitterHandle: String){
    return axios.get(`${API_BASE_URL}/api/mindshare/mindshare/${twitterHandle}`)
}