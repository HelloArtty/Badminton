import axios from 'axios'

export const AxiosLib = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5000',
    withCredentials: true,
})