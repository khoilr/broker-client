import IndicatorModel from '@/model/Indicator'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Condition from './Condition'
import Parameter from './Parameter'

const { Title } = Typography

type props = {
    side: string
    // indicators: IndicatorModel[]
    selectingIndicator: IndicatorModel
    name: number
    remove: (name: number) => void
}

export default function Indicator(props: props) {
    const { side, selectingIndicator, name, remove } = props
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
                    label={<Title level={3}>Indicator</Title>}
                    name={[name.toString(), 'name']}
                    initialValue={indicator?.name}
                >
                    <Input
                        readOnly
                        value={indicator?.name}
                    />
                </Form.Item>
                <Form.Item label={<Title level={3}>Condition</Title>}>
                    <Condition
                        indicator={indicator}
                        returns={indicator?.returns}
                        name={name}
                    />
                </Form.Item>
                <Form.Item
                    name={[name.toString(), 'returns']}
                    hidden
                    initialValue={indicator?.returns?.map(e => e.value)}
                />
                {(indicator?.parameters?.length ?? 0) > 0 && (
                    <Form.Item label={<Title level={3}>Parameters</Title>}>
                        <Form.List
                            name={[name.toString(), 'parameters']}
                            initialValue={indicator.parameters}
                        >
                            {fields => (
                                <div className='flex flex-wrap'>
                                    {fields.map((field, index) => (
                                        <Parameter
                                            key={field.key}
                                            parameter={indicator?.parameters?.[index]}
                                            name={field.name}
                                        />
                                    ))}
                                </div>
                            )}
                        </Form.List>
                    </Form.Item>
                )}
            </div>
            <Button
                className='mx-2'
                onClick={() => {
                    remove(name)
                }}
                danger
                icon={<DeleteOutlined />}
            />
        </div>
    )
}
