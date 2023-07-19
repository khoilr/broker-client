/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import FormData from '@/model/Form'
import { Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

type props = {
    data: any
}

// const { Column } = Table

export default function BottomTable(props: props) {
    const { data } = props

    // const [tableData, setTableData] = useState<any[]>([])

    const dataSource: FormData[] = [
        {
            id: data.id,
            telegram_user: data.telegram_user,
            whatsapp_number: data.whatsapp_number,
            indicator: data.indicator
        }
    ]

    const columns: ColumnsType<any> = [
        {
            title: 'Strategy',
            dataIndex: 'id',
            key: 'id',
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
        }
        // {
        //     title: 'Indicators',
        //     key: 'indicator',
        //     dataIndex: 'indicator',
        //     render: (_, { indicators }) => (
        //         <>
        //             {indicators.map(indicator => {
        //                 let color = indicator.length > 5 ? 'geekblue' : 'green'
        //                 if (indicator === 'loser') {
        //                     color = 'volcano'
        //                 }
        //                 return (
        //                     <Tag
        //                         color={color}
        //                         key={indicator}
        //                     >
        //                         {indicator.toUpperCase()}
        //                     </Tag>
        //                 )
        //             })}
        //         </>
        //     )
        // }
    ]

    return (
        <div className='overflow-x-auto w-full col-span-1 relative lg:h-[40vh] h-[20vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <div className='p-1.5 w-full inline-block align-middle'>
                <div className='overflow-hidden border rounded-lg'>
                    <Table
                        dataSource={dataSource}
                        columns={columns}
                    >
                        {/* <Column
                            title='Stratery'
                            dataIndex='id'
                            key='id'
                        />
                        <Column
                            title='Telegram User'
                            dataIndex='telegram_user'
                            key='telegram_user'
                        />
                        <Column
                            title='Whatsapp Number'
                            dataIndex='whatsapp_number'
                            key='whatsapp_user'
                        />
                        <Column
                            title='Indicator'
                            dataIndex='indicator'
                            key='indicator'
                        />
                        {/* <Column
                            title='Action'
                            key='action'
                            render={(_: any, record: DataType) => (
                                <Space size='middle'>
                                    <a>Invite {record.lastName}</a>
                                    <a>Delete</a>
                                </Space>
                            )}
                        /> */}
                    </Table>
                </div>
            </div>
        </div>
    )
}
