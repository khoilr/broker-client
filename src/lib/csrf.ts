import { cookies } from 'next/headers'
import { useState } from 'react'

export default function useCsrfToken() {
    const [csrfToken, setCsrfToken] = useState<string>()
    const cookieStore = cookies()
    const token = cookieStore.get('csrftoken')

    setCsrfToken(token?.toString())

    return csrfToken
}
