/* eslint-disable no-loop-func */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import FormData from '@/model/Form'
// import Indicator from '@/model/Indicator'
import { Button, Popconfirm, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { clientApi } from '@/lib/axios'

interface props {
    data: FormData
    setLines: (lines: any[]) => void
    lines: any[]
}

export default function BottomTable(props: props) {
    const { data, setLines, lines } = props
    const [dataArray, setDataArray] = useState<FormData[]>([])
    const [chartData, setChartData] = useState<any[]>([])

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

    const handleApply = (index: number) => {
        const applyData = [...dataArray]
        const data1 = applyData.find((data, i) => i === index + 1)
        setChartData(prevDataArray => [...prevDataArray, data1])
    }

    useEffect(() => {
        const indicators = chartData

        for (let i = 0; i < indicators.length; i += 1) {
            const indicator = indicators[i].indicators[0]
            const symbol = indicators[i]

            // console.log('ssssssssssssss', indicator)
            // console.log('aaaaaaaa', symbol)

            clientApi
                .get('/indicator/', {
                    params: {
                        name: indicator.name,
                        symbol: symbol.stock,
                        ...indicator.parameters
                    }
                })
                .then(res => {
                    const { data } = res
                    // append data to lines
                    // thisLines.push
                    const thisLines = [...lines, data]

                    setLines(thisLines.find((line: any) => line.name === indicator.name))

                    console.log('thisLinesssss', thisLines)
                })
        }
    }, [chartData])

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
                        <Button
                            className='font-bold text-blue-500'
                            onClick={() => handleApply(index)}
                        >
                            Apply
                        </Button>
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
                <h1 className='font-bold p-2 pb-4 text-xl text-cyan-700'>Strategies Table</h1>
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
