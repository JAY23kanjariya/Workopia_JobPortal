import axios from "axios";

// Create axios instance
const api = axios.create({
    baseURL: "http://localhost:8000/api",
});

// Add request interceptor
api.interceptors.request.use((config) => {
    // Get token from local storage
    const token = localStorage.getItem("token");
    // If token exists, add it to the request headers
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
 