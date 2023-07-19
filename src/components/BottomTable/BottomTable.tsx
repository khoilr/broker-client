/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import FormData from '@/model/Form'
import { Table } from 'antd'

type props = {
    data: FormData[]
}

const { Column } = Table

export default function BottomTable(props: props) {
    const { data } = props

    return (
        <div className='overflow-x-auto w-full col-span-1 relative lg:h-[40vh] h-[20vh] m-auto p-4 border rounded-lg bg-white overflow-scroll'>
            <div className='p-1.5 w-full inline-block align-middle'>
                <div className='overflow-hidden border rounded-lg'>
                    <Table dataSource={data}>
                        <Column
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
