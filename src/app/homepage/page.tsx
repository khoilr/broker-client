'use client'

// import Nav from '@/components/Navigation/Navigation'
// import TopCards from '@/components/TopCards/TopCards'
import { useState } from 'react'
import Chart from '@/components/Chart/Chart'
import FormField from '@/components/Form/FormField'
import StockModel from '@/model/Stock'
import FormData from '@/model/Form'
import { Form } from 'antd'
import BottomTable from '@/components/BottomTable/BottomTable'
import Nav from '@/components/Navigation/Navigation'
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

    // States
    const [lines, setLines] = useState<any[]>([])
    const [tableData, setTableData] = useState<any>()

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
                    <BottomTable
                        data={tableData}
                        setLines={setLines}
                        lines={lines}
                    />
                </div>
            </div>
        </>
    )
}
