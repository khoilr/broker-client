import IndicatorModel from '@/model/Indicator'
// import { DeleteOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { useState } from 'react'
import Condition from './Condition'
import Parameter from './Parameter'

type props = {
    // side: string
    selectingIndicator: IndicatorModel
    name: number
}

export default function Indicator(props: props) {
    const { selectingIndicator, name } = props
    // const [color, setColor] = useState<string>()
    const [indicator] = useState<IndicatorModel>(selectingIndicator)

    return (
        <div className='flex items-start w-full min-w-full max-w-full border border-gray-200 rounded-lg'>
            <div className='w-full min-w-full max-w-full p-2'>
                <Form.Item
                    style={{ width: '80vh', minWidth: '100%' }}
                    label='Indicator'
                    name={[name.toString(), 'name']}
                    initialValue={indicator?.name}
                >
                    <Input
                        readOnly
                        value={indicator?.name}
                    />
                </Form.Item>
                <Form.Item
                    style={{ width: '100%' }}
                    label='Condition'
                >
                    <Condition
                        indicator={indicator}
                        returns={indicator?.predefined_returns}
                        name={name}
                    />
                </Form.Item>
                <Form.Item
                    name={[name.toString(), 'returns']}
                    hidden
                    initialValue={indicator?.predefined_returns?.map(e => e.value)}
                />
                {(indicator?.predefined_params?.length ?? 0) > 0 && (
                    <Form.Item label='Parameters'>
                        {indicator?.predefined_params?.map(parameter => (
                            <Parameter
                                parameter={parameter}
                                name={name}
                            />
                        ))}
                    </Form.Item>
                )}
            </div>
        </div>
    )
}
