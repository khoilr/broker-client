import axios from 'axios'

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Specify the base URL for your API
    timeout: 5000, // Set a timeout value if desired
    headers: {
        'Content-Type': 'application/json' // Add any default headers
    }
})

export default api
