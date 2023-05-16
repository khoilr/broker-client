import IndicatorModel from '@/model/Indicator'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Form, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Condition from './Condition'
import Parameter from './Parameter'

const { Title } = Typography

type props = {
    side: string
    indicators: IndicatorModel[]
    name: number
    remove: (name: number) => void
    resetCondition: (_return: string, side: string, index: number) => void
}

export default function Indicator(props: props) {
    const { side, indicators, name, remove, resetCondition } = props

    const [color, setColor] = useState<string>()
    const [indicator, setIndicator] = useState<IndicatorModel>()

    useEffect(() => {
        if (side === 'buy') {
            setColor('green')
        } else {
            setColor('red')
        }
    }, [side])

    return (
        <div className='flex items-start'>
            <div
                className={`border border-solid rounded-lg border-${color}-600 p-2 w-full mb-6`}
            >
                <Form.Item
                    label={<Title level={3}>Indicator</Title>}
                    name={[name.toString(), 'name']}
                >
                    <Select
                        showSearch
                        placeholder={`Select ${side} indicator`}
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
                        onSelect={value => {
                            setIndicator(
                                indicators.find(e => e.value === value)
                            )
                        }}
                        options={indicators.map(e => ({
                            value: e.value,
                            label: e.label
                        }))}
                    />
                </Form.Item>
                {indicator && (
                    <>
                        <Form.Item label={<Title level={3}>Condition</Title>}>
                            <Condition
                                returns={indicator.returns}
                                name={name}
                                resetCondition={resetCondition}
                                side={side}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<Title level={3}>Parameters</Title>}
                            className={`border border-solid border-${color}-500 rounded-lg p-2`}
                        >
                            <div className='flex flex-wrap'>
                                {indicator.parameters.map((e, index) => (
                                    <Parameter
                                        key={index}
                                        parameter={e}
                                        name={name}
                                    />
                                ))}
                            </div>
                        </Form.Item>
                    </>
                )}
            </div>
            <MinusCircleOutlined
                className='ml-2'
                onClick={() => {
                    remove(name)
                }}
            />
        </div>
    )
}
