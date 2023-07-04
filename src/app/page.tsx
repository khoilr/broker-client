'use client'

import Login from '@/components/Login Form/Login'
import background from '@/image/background.jpeg'

export default function LoginPage() {
    return (
        <div className='flex flex-col items-center min-h-screen py-2 bg-gray-100' style={{ backgroundImage: `url(${background})` }}>
                <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                    <Login />
                </main>
        </div>
    )
}
