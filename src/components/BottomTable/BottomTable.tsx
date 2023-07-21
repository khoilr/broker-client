/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import FormData from '@/model/Form'
// import Indicator from '@/model/Indicator'
import { Popconfirm, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

type props = {
    data: any
}

export default function BottomTable(props: props) {
    const { data } = props
    const [dataArray, setDataArray] = useState<FormData[]>([])

    useEffect(() => {
        // Push new data into the array
            setDataArray(prevDataArray => [...prevDataArray, data])
    }, [data])

    // Delete data from the array

    const columns: ColumnsType<any> = [
        {
            title: 'Strategy',
            dataIndex: 'id',
            // key: 'id',
            render: () => <a>{key}</a>
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
        {
            title: 'Indicators',
            key: 'indicators',
            dataIndex: 'indicators',
            render: (_, { indicators }) => (
                // indicators >= 1 ? (
                <>
                    {indicators.map(
                        (indicator) => {
                            return <Tag key={indicator.id}>{indicator.name}</Tag>
                        }
                    )}
                </>
            )
            // ) : null
        },
        {
            title: 'Action',
            key: 'action',
            // render: (_, record) =>
            //     dataArray.length >= 1 ? (
            //         <Space size='middle'>
            //             <a className='font-bold'>Apply</a>
            //             {/* <Popconfirm
            //                 title='Sure to delete?'
            //                 onConfirm={() => handleDelete(record.key)}
            //             >
            //                 <a className='font-bold'>Delete</a>
            //             </Popconfirm> */}
            //         </Space>
            //     ) : null
        }
    ]

    return (
        <div className='overflow-x-auto w-full col-span-1 relative lg:h-[40vh] h-[20vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <div className='p-1.5 w-full inline-block align-middle'>
                <div className='overflow-hidden border rounded-lg'>
                    <Table
                        dataSource={dataArray.slice(1)}
                        columns={columns}
                        scroll={{ x: 1500, y: 300 }}
                    />
                </div>
            </div>
        </div>
    )
}
