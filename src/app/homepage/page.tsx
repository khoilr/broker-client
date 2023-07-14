'use client'

import Nav from '@/components/Navigation/Navigation'
// import TopCards from '@/components/TopCards/TopCards'
import { SetStateAction, useEffect, useState } from 'react'
import Chart from '@/components/Chart/Chart'
import FormField from '@/components/Form/FormField'
import StockModel from '@/model/Stock'
import { Form } from 'antd'
import { clientApi } from '@/lib/axios'
// import Indicator from '@/components/Select indicator/Indicator'

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
    const [lines, setLines] = useState<any[]>([])

    // On stock or indicators change
    useEffect(() => {
        if (!(stockWatcher && indicatorsWatcher)) return
        if (indicatorsWatcher.some((indicator: any) => !indicator)) return

        const stock = stockWatcher.split('-')[0].trim()
        const indicators = indicatorsWatcher

        const thisLines: SetStateAction<any[]> = []

        for (let i = 0; i < indicators.length; i += 1) {
            const indicator = indicators[i]

            clientApi
                .get('/indicator/', {
                    params: {
                        symbol: stock,
                        indicator: indicator.name,
                        ...indicator.parameters
                    }
                })
                .then(res => {
                    const { data } = res
                    thisLines.push(data)
                })
        }

        setLines(thisLines)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indicatorsWatcher, stockWatcher])

    return (
        <>
            <Nav />
            <div className='min-h-full bg-gray-200'>
                {/* <TopCards /> */}
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
                    <Chart
                        stock={stock}
                        lines={lines}
                    />
                    <FormField
                        setStock={setStock}
                        form={form}
                    />
                </div>
            </div>
        </>
    )
}
