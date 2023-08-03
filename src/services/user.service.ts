import axios from 'axios'
import authHeader from './auth-header'

export const getPublicContent = () => {
    return axios.get('http://localhost:8000/api/auth')
}

export const getStrategy = () => {
    return axios.get('http://localhost:8000/api/strategy/', { headers: authHeader() })
}
