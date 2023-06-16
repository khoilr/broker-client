import IndicatorModel from '@/model/Indicator'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Form, Select, Typography } from 'antd'
import { useEffect, useState } from 'react'
// import { BaseOptionType } from 'antd/es/select'
import Condition from './Condition'
// import Parameter from './Parameter'
// import ParameterType from '@/model/ParameterType'

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
    // const [indicatorOption, setIndicatorOption] = useState<ReactElement | null>()
    // const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>([])

    useEffect(() => {
        if (side === 'buy') {
            setColor('green')
        }
        if (side === 'notification') {
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
                    rules={[{ required: true, message: 'Please select indicator' }]}
                >
                    <Select
                        showSearch
                        placeholder={`Select ${side} indicator`}
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        onSelect={value => {
                            setIndicator(indicators.find(e => e.name === value))
                            console.log(indicators.find(e => e.name === value)?.parameters)
                        }}
                        options={indicators.map(e => ({
                            value: e.name,
                            label: `${e.label} (${e.name}) `
                        }))}
                    />
                </Form.Item>
                {indicator && (
                    <>
                        <Form.Item label={<Title level={3}>Condition</Title>}>
                            <Condition
                                indicator={indicator}
                                returns={indicator.returns}
                                name={name}
                                resetCondition={resetCondition}
                                side={side}
                            />
                        </Form.Item>
                        <Form.Item
                            // name={[name.toString(), indicator.name, 'returns']}
                            name={[name.toString(), 'returns']}
                            hidden
                            initialValue={indicator.returns?.map(e => e.value)}
                        />
                        {/* // Todo: implement parameters */}
                        {/* {indicator.parameters.length > 0 && (
                            // <Form.List name={[name.toString(), indicator.name, 'parameters']}>
                            <Form.List name={[name.toString(), 'parameters']}>
                                {() => (
                                    <div className='flex flex-wrap'>
                                        {indicator.parameters
                                            .sort((a, b) => a.name.localeCompare(b.name))
                                            .map(e => (
                                                <Parameter
                                                    indicator={indicator}
                                                    key={e.name}
                                                    parameter={e}
                                                    name={name}
                                                />
                                            ))}
                                    </div>
                                )}
                            </Form.List>
                        )} */}
                        {/* {indicator.parameters.filter(
                            e => e.type === ParameterType.NUMBER || e.type === ParameterType.SELECTION
                        ).length > 0 && (
                            <Form.Item
                                name={[name.toString(), 'parameters']}
                                label={<Title level={3}>Parameters</Title>}
                                className={`border border-solid border-${color}-500 rounded-lg p-2`}
                            >
                                <div className='flex flex-wrap'>
                                    {indicator.parameters
                                        .sort((a, b) => a.name.localeCompare(b.name))
                                        .map(e => (
                                            <Parameter
                                                indicator={indicator}
                                                key={e.name}
                                                parameter={e}
                                                name={name}
                                            />
                                        ))}
                                </div>
                            </Form.Item>
                        )} */}
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
