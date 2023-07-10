'use client'

import Nav from '@/components/Navigation'
// import TopCards from '@/components/TopCards/TopCards'
import { useState } from 'react'
import Chart from '@/components/Chart'
import FormField from '@/components/Form/FormField'
import StockModel from '@/model/Stock'

export default function HomePage() {
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
            <div className='min-h-full bg-gray-200'>
                {/* <TopCards /> */}
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <Chart stock={stock} />
                    <FormField setStock={setStock} />
                </div>
            </div>
        </>
    )
}
