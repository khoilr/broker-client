'use client'

import SignUp from '@/components/Login Form/SignUp'

export default function SignUpPage() {
    return (
        <div className='flex flex-col items-center min-h-screen py-2 bg-gray-200'>
            <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                <SignUp />
            </main>
        </div>
    )
}
