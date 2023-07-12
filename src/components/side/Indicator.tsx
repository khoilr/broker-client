import IndicatorModel from '@/model/Indicator'
// import { DeleteOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import Condition from './Condition'
import Parameter from './Parameter'

type props = {
    side: string
    selectingIndicator: IndicatorModel
    name: number
}

export default function Indicator(props: props) {
    const { side, selectingIndicator, name } = props
    const [color, setColor] = useState<string>()
    const [indicator] = useState<IndicatorModel>(selectingIndicator)

    useEffect(() => {
        if (side === 'buy') {
            setColor('green')
        } else if (side === 'notification') {
            setColor('black')
        } else if (side === 'sell') {
            setColor('red')
        }
    }, [side])

    return (
        <div className='flex items-start'>
            <div className={`border border-solid rounded-lg border-${color}-600 p-2 w-full mb-6`}>
                <Form.Item
                    label='Indicator'
                    name={[name.toString(), 'name']}
                    initialValue={indicator?.name}
                >
                    <Input
                        readOnly
                        value={indicator?.name}
                    />
                </Form.Item>
                <Form.Item label='Condition'>
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
                                <Form.Item name={[name.toString(), 'parameter', parameter.name]}>
                                    <Parameter
                                        parameter={parameter}
                                        name={name}
                                    />
                                </Form.Item>
                        ))}
                        {/* <Form.List
                            name={[name.toString(), 'parameters']}
                            initialValue={indicator.predefined_params}
                        >
                            {fields => (
                                <div className='flex flex-wrap'>
                                    {fields.map((field, index) => (
                                        <Parameter
                                            key={field.key}
                                            parameter={indicator?.predefined_params?.[index]}
                                            name={field.name}
                                        />
                                    ))}
                                </div>
                            )}
                        </Form.List> */}
                    </Form.Item>
                )}
            </div>
        </div>
    )
}
