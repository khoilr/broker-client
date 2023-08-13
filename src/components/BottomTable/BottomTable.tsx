/* eslint-disable no-loop-func */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'
import FormData from '@/model/Form'
// import Indicator from '@/model/Indicator'
import { Button, Checkbox, Popconfirm, Space, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { clientApi } from '@/lib/axios'
import { Tooltip } from '@material-tailwind/react'

interface props {
    data: FormData
    setLines: (lines: any[]) => void
    lines: any[]
}

export default function BottomTable(props: props) {
    const { data, setLines, lines } = props
    const [dataArray, setDataArray] = useState<FormData[]>([])
    const [chartData, setChartData] = useState<any[]>([])
    const [checked, setChecked] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([])

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

    const handleCheckboxChange = (e: any, index: number) => {
        if (e.target.checked) {
            setSelectedRowKeys([...selectedRowKeys, index])
        } else {
            setSelectedRowKeys(selectedRowKeys.filter(key => key !== index))
        }
    }

    const handleClick = (index: number) => {
        const applyData = [...dataArray]
        const data1 = applyData.find((data, i) => i === index + 1)

        console.log('data1', data1)

        const data = [...chartData]
        const check = data.some((obj) => obj === data1)
        if (!check) { data.push(data1) }
        setChartData(data)
        if (checked) setChecked(false)
        else setChecked(true)
    }

    console.log('chartData', chartData)

    const handleApply = () => {
        const indicators = chartData
        for (let i = 0; i < indicators.length; i += 1) {
            const indicator = indicators[i].indicators[i]
            const symbol = indicators[i]

            clientApi
                .get('/indicator/', {
                    params: {
                        name: indicator.name,
                        symbol: symbol.stock.split('-')[0].trim(),
                        ...indicator.parameters
                    }
                })
                .then(res => {
                    const { data } = res
                    // append data to lines
                    const thisLines = [...lines]

                    const checkData = thisLines.some((obj) => obj.name === data.name)
                    if (!checkData) { thisLines.push(data) }

                    setLines(thisLines)

                    console.log('thisLinesssss', thisLines)
                })
        }
    }

    const columns: ColumnsType<any> = [
        {
            title: 'Select',
            key: 'select',
            render: (_, _record, index: number) =>
                dataArray.length >= 1 ? (
                    <Space size='middle'>
                        <Checkbox
                            className='font-bold text-blue-500'
                            onClick={() => handleClick(index)}
                            checked={selectedRowKeys.includes(index)}
                            onChange={e => handleCheckboxChange(e, index)}
                        />
                    </Space>
                ) : null
        },
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
                            parameters: any
                        }) => {
                            return (
                                <Tooltip
                                    placement='top'
                                    content={`Period: ${indicator.parameters.period}`}
                                    overlayStyle={{ zIndex: 200 }}
                                >
                                    <Tag key={indicator.id}>{indicator.name}</Tag>
                                </Tooltip>
                            )
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
                            onClick={() => handleApply()}
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
                        style={{ width: '100%', height: '100%' }}
                        dataSource={dataArray.slice(1)}
                        columns={columns}
                        scroll={{ x: 1500, y: 300 }}
                        rowKey={(record, index) => index.toString()}
                    />
                </div>
            </div>
        </div>
    )
}
