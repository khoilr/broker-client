import { toTitleCase } from '@/lib/helper'
import IndicatorModel from '@/model/Indicator'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Form, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Condition from './Condition'
import Parameter from './Parameter'

const { Title, Text } = Typography

type props = {
    side: String
    indicators: IndicatorModel[]
    key: Number
    name: Number
    remove: Function
}

export default function Indicator(props: props) {
    const [color, setColor] = useState<String>()

    useEffect(() => {
        if (props.side === 'buy') {
            setColor('green')
        } else {
            setColor('red')
        }
    }, [props.side])

    const [indicator, setIndicator] = useState<IndicatorModel>()

    return (
        <div className='flex items-start'>
            <div
                className={`border border-solid rounded-lg border-${color}-600 p-2 w-full mb-6`}
            >
                <Form.Item
                    label={<Title level={3}>Indicator</Title>}
                    name={[props.name.toString(), 'name']}
                >
                    <Select
                        showSearch
                        placeholder='Select buy indicator'
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
                        onSelect={(value, option) => {
                            setIndicator(
                                props.indicators.find(e => e.value === value)
                            )
                        }}
                        options={props.indicators.map(e => ({
                            value: e.value,
                            label: toTitleCase(e.label)
                        }))}
                    />
                </Form.Item>
                {indicator && (
                    <>
                        <Form.Item label={<Title level={3}>Condition</Title>}>
                            <Condition
                                returns={indicator.returns}
                                name={props.name}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<Title level={3}>Parameters</Title>}
                            className={`border border-solid border-${color}-500 rounded-lg p-2`}
                        >
                            <div className={`flex flex-wrap`}>
                                {indicator.parameters.map((e, index) => (
                                    <Parameter
                                        key={index}
                                        indicator={indicator as IndicatorModel}
                                        parameter={e}
                                        name={props.name}
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
                    props.remove(props.name)
                }}
            />
        </div>
    )
}
