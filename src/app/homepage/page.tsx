'use client'

import Nav from '@/components/Navigation/Navigation'
// import TopCards from '@/components/TopCards/TopCards'
import { useEffect, useState } from 'react'
import Chart from '@/components/Chart/Chart'
import FormField from '@/components/Form/FormField'
import StockModel from '@/model/Stock'
import FormData from '@/model/Form'
import { Form } from 'antd'
import { clientApi } from '@/lib/axios'
import BottomTable from '@/components/BottomTable/BottomTable'
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
    const [tableData, setTableData] = useState<any>()
    // On stock or indicators change
    useEffect(() => {
        if (!(stockWatcher && indicatorsWatcher)) return
        if (indicatorsWatcher.some((indicator: any) => !indicator)) return

        const stock = stockWatcher.split('-')[0].trim()
        const indicators = indicatorsWatcher

        for (let i = 0; i < indicators.length; i += 1) {
            const indicator = indicators[i]

            clientApi
                .get('/indicator/', {
                    params: {
                        name: indicator.name,
                        symbol: stock,
                        ...indicator.parameters
                    }
                })
                .then(res => {
                    const { data } = res
                    // append data to lines
                    // thisLines.push
                    const thisLines = [...lines, data]
                    setLines(thisLines)
                })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [indicatorsWatcher, stockWatcher])

    const updateTableData = (newData: FormData[]) => {
        setTableData(newData)
    }

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
                        onSubmit={updateTableData}
                    />
                </div>
                <div className='px-4 pb-8'>
                    <BottomTable data={tableData} />
                </div>
            </div>
        </>
    )
}
