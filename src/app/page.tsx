'use client'

import Chart from '@/components/Chart'
import FormField from '@/components/Form/FormField'
import Nav from '@/components/Navigation'
import TopCards from '@/components/TopCards/TopCards'
import StockModel from '@/model/Stock'
import { useState } from 'react'

export default function NotifyPage() {
    const [stock, setStock] = useState<StockModel>({
        id: '',
        symbol: '',
        market: '',
        name: '',
        enName: ''
    })

    return (
        <>
            <Nav />
            <main className='bg-gray-100 min-h-screen'>
                <TopCards />
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <Chart stock={stock} />
                    <FormField setStock={setStock} />
                </div>
            </main>
        </>
    )
}
