'use client'

import { Form, Input, Row, Select } from 'antd'

const stockSymbols = [
    'ACB',
    'BCM',
    'BID',
    'BVH',
    'CTG',
    'FPT',
    'GAS',
    'GVR',
    'HDB',
    'HPG',
    'MBB',
    'MSN',
    'MWG',
    'NVL',
    'PDR',
    'PLX',
    'POW',
    'SAB',
    'SSI',
    'STB',
    'TCB',
    'TPB',
    'VCB',
    'VHM',
    'VIB',
    'VIC',
    'VJC',
    'VNM',
    'VPB',
    'VRE'
]

export default function Home() {
    return (
        <Form
            layout='vertical'
            className='w-1/2'
        >
            <Form.Item 
			className='flex'>
                <Form.Item
                    name='stock_symbol'
                    label='Stock symbol'
                    className='w-1/2'
                >
                    <Select
                        showSearch
                        placeholder='Select stock symbol'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? '').toLowerCase()
                                )
                        }
                        options={stockSymbols.map(e => {
                            return {
                                value: e,
                                label: e
                            }
                        })}
                    />
                </Form.Item>
                <Form.Item
                    name='time_frame'
                    label='Time frame'
                    className='w-1/2'
                >
                    <Select
                        showSearch
                        placeholder='Select time frame'
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                            (option?.label ?? '')
                                .toLowerCase()
                                .includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '')
                                .toLowerCase()
                                .localeCompare(
                                    (optionB?.label ?? '').toLowerCase()
                                )
                        }
                        options={[
                            { value: '60', label: '1 hour' },
                            { value: 'D', label: '1 day' },
                            { value: 'W', label: '1 week' },
                            { value: 'M', label: '1 month' }
                        ]}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item>
                <Input
                    type='number'
                    min={1}
                    max={10}
                    defaultValue={3}
                />
            </Form.Item>
        </Form>
    )
}
