import axios from 'axios'

const clientApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL // Specify the base URL for your API
})

const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL // Specify the base URL for your API
})

export { clientApi, serverApi }
