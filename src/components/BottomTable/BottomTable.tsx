/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import FormData from '@/model/Form'
// import Indicator from '@/model/Indicator'
import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

type props = {
    data: any
}

// const { Column } = Table

export default function BottomTable(props: props) {
    const { data } = props

    const [tableData, setTableData] = useState<FormData[][]>([])

    const dataSource: FormData[] = [
        {
            // id: data.id,
            key: data.key,
            telegram_user: data.telegram_user,
            whatsapp_number: data.whatsapp_number,
            indicator: data.indicator
        }
    ]

    useEffect(() => {
        tableData.push(dataSource)
        setTableData(tableData)
    })

    console.log('datasource', dataSource)
    console.log('tabledata', tableData)

    const columns: ColumnsType<any> = [
        {
            title: 'Strategy',
            dataIndex: 'key',
            key: 'key',
            render: text => <a>{text}</a>
        },
        {
            title: 'Telegram User',
            dataIndex: 'telegram_user',
            key: 'telegram_user'
        },
        {
            title: 'Whatsapp Number',
            dataIndex: 'whatsapp_number',
            key: 'whatsapp_number'
        },
        // {
        //     title: 'Indicators',
        //     key: 'indicators',
        //     dataIndex: 'indicators',
        //     render: {(indicator: any[]) => (
        //         <>
        //         {indicator.map((item: any) => (
        //             <Tag color="blue" key={item}>
        //                 {item}
        //             </Tag>
        //     ))}
        // </>

        //     )}
        // }
    ]

    return (
        <div className='overflow-x-auto w-full col-span-1 relative lg:h-[40vh] h-[20vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <div className='p-1.5 w-full inline-block align-middle'>
                <div className='overflow-hidden border rounded-lg'>
                    <Table
                        dataSource={tableData[1]}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}
