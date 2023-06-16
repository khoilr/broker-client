import axios from 'axios'

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // Specify the base URL for your API
    timeout: 5000, // Set a timeout value if desired
    headers: {
        'Content-Type': 'application/json' // Add any default headers
    }
})

const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL // Specify the base URL for your API
})

export { clientApi, serverApi }
