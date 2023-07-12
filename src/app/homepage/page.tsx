'use client'

import Nav from '@/components/Navigation'
// import TopCards from '@/components/TopCards/TopCards'
import { useEffect, useState } from 'react'
import Chart from '@/components/Chart'
import FormField from '@/components/Form/FormField'
import StockModel from '@/model/Stock'
import { Form } from 'antd'
import { clientApi } from '@/lib/axios'
import Indicator from '@/components/side/Indicator'

export default function HomePage() {
    const [stock, setStock] = useState<StockModel>({
        id: '',
        symbol: '',
        market: '',
        name: '',
        enName: ''
    })
    const [form] = Form.useForm()

    // Watchers
    const indicatorsWatcher = Form.useWatch('indicators', form)
    const stockWatcher = Form.useWatch('stock', form)

    // On stock or indicators change
    useEffect(() => {
        if (!(stockWatcher && indicatorsWatcher)) return

        const stock = stockWatcher.split('-')[0].trim()
        const indicators = indicatorsWatcher

        console.log(indicators)
        console.log(typeof indicators)

        indicators.map((indicator: any) => {
            console.log(indicator)
            return Indicator
        })

        console.log(indicators)
        clientApi
            .get('/indicator', {
                params: {
                    stock,
                    indicator: indicators
                }
            })
            .then(res => {
                console.log(res.data)
            })
    }, [indicatorsWatcher, stockWatcher])

    return (
        <>
            <Nav />
            <div className='min-h-full bg-gray-200'>
                {/* <TopCards /> */}
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <Chart stock={stock} />
                    <FormField
                        setStock={setStock}
                        form={form}
                    />
                </div>
            </div>
        </>
    )
}
