import { API_BASE_URL } from "@/lib/constant"
import { FormData } from "@/pages/Request"
import axios from "axios"




export async function postProjectForm(data: FormData) {
    return axios.post(`${API_BASE_URL}/api/projects/projects`, data)
}