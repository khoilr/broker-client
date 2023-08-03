import axios from 'axios'

export const register = (username: string, password: string) => {
    return axios.post('http://localhost:8000/api/auth/signup', {
        username,
        password
    })
}

export const login = (data:any) => {
    return axios
        .post('http://localhost:8000/api/auth/signin', data: {
            username,
            password
        })
        .then(response => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }

            return response.data
        })
}

export const logout = () => {
    localStorage.removeItem('user')
}

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user')
    if (userStr) return JSON.parse(userStr)

    return null
}
