'use client'

import Login from '@/components/Login Form/Login'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './homepage/page'

export default function LoginPage() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<Login />}
                    />
                    <Route
                        path='/homepage'
                        element={<HomePage />}
                    />
                    {/* <Route
                        path='/prediction'
                        element={<HomePage />}
                    /> */}
                </Routes>
            </BrowserRouter>
            {/* <div className='flex flex-col items-center min-h-screen py-2 bg-gray-200'>
                <main className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center'>
                    <Login />
                </main>
            </div> */}
        </>
    )
}
