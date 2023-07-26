/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import FormData from '@/model/Form'
// import Indicator from '@/model/Indicator'
import { Popconfirm, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
// import { index } from '@material-tailwind/react/types/components/select'

interface props {
    data: FormData
}

export default function BottomTable(props: props) {
    const { data } = props
    const [dataArray, setDataArray] = useState<FormData[]>([])

    useEffect(() => {
        // Push new data into the array
        setDataArray(prevDataArray => [...prevDataArray, data])
    }, [data])

    // Function to delete a row
    const handleDeleteRow = (index: number) => {
        const updatedData = [...dataArray]
        updatedData.splice(index, 1)
        setDataArray(updatedData)
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Strategy',
            dataIndex: 'index',
            key: 'index',
            render: (text: string, record: FormData, index: number) => {
                return <a>{index + 1}</a>
            }
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
                <>
                    {indicators?.map(
                        (indicator: {
                            id: React.Key | null | undefined
                            name:
                                | string
                                | number
                                | boolean
                                | React.ReactElement<any, string | React.JSXElementConstructor<any>>
                                | React.ReactFragment
                                | React.ReactPortal
                                | null
                                | undefined
                        }) => {
                            return <Tag key={indicator.id}>{indicator.name}</Tag>
                        }
                    )}
                </>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record, index: number) =>
                dataArray.length >= 1 ? (
                    <Space size='middle'>
                        <a className='font-bold text-blue-500'>Apply</a>
                        <Popconfirm
                            okButtonProps={{
                                className: 'rounded-md bg-blue-500 hover:bg-blue-300 text-white'
                            }}
                            title='Sure to delete?'
                            onConfirm={() => handleDeleteRow(index)}
                        >
                            <a className='font-bold text-red-500 hover:text-red-300'>Delete</a>
                        </Popconfirm>
                    </Space>
                ) : null
        }
    ]

    return (
        <div className='overflow-x-auto w-full col-span-1 relative lg:h-[40vh] h-[20vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <div className='p-1.5 w-full inline-block align-middle'>
                <h1 className='font-bold p-2 pb-4 text-xl text-cyan-700'>Stratery Table</h1>
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
