import IndicatorModel from '@/model/Indicator'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space } from 'antd'
import { useState } from 'react'
import Indicator from './side/Indicator'

type props = {
    indicators: IndicatorModel[]
}

export default function NotifyCondition(props: props) {
    const { indicators } = props
    const [selectingIndicator, setSelectingIndicator] = useState<IndicatorModel>()
    return (
        <div className='rounded-lg w-full flex'>
            <Form.List name='indicators'>
                {(fields, { remove }) => (
                    <>
                        <Form.Item
                            label='Select Indicator'
                            className='w-full'
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your WhatsApp number'
                                }
                            ]}
                        >
                            <Space.Compact
                                size='middle'
                                className='w-full'
                            >
                                <Select
                                    showSearch
                                    placeholder='Select Indicator'
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onSelect={value => {
                                        setSelectingIndicator(indicators.find(e => e.name === value))
                                    }}
                                    options={indicators.map(e => ({
                                        value: e.name,
                                        label: `${e.label} (${e.name}) `
                                    }))}
                                />
                                <Button
                                    className='bg-cyan-700 rounded-lg w-1/5 text-sm flex items-center mx-auto'
                                    type='primary'
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        if (selectingIndicator) add()
                                    }}
                                >
                                    Add
                                </Button>
                            </Space.Compact>
                        </Form.Item>
                        {fields.map(({ key, name }) => (
                            <Indicator
                                key={key}
                                name={name}
                                side='notification'
                                selectingIndicator={
                                    selectingIndicator ?? {
                                        id: '',
                                        name: '',
                                        label: '',
                                        returns: [],
                                        parameters: []
                                    }
                                }
                                remove={remove}
                            />
                        ))}
                    </>
                )}
            </Form.List>
        </div>
    )
}
