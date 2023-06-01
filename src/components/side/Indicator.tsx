import IndicatorModel from '@/model/Indicator'
import { MinusCircleOutlined } from '@ant-design/icons'
import { Form, Select, Typography } from 'antd'
import { useEffect, useState, ReactElement } from 'react'
import { BaseOptionType } from 'antd/es/select'
import Condition from './Condition'
import Parameter from './Parameter'

const { Title } = Typography

type props = {
    side: string
    indicators: IndicatorModel[]
    name: number
    remove: (name: number) => void
    resetCondition: (_return: string, side: string, index: number) => void
    dropParameters: (index: number) => void
}

type option_props = {
    indicator: IndicatorModel
    name: number
    side: string
    color: string
    returnOptions: BaseOptionType[]
}

function IndicatorOption(props: option_props) {
    const { indicator, name, returnOptions, side, color } = props

    return (
        <>
            <Form.Item label={<Title level={3}>Condition</Title>}>
                <Condition
                    returns={indicator.returns}
                    name={name}
                    returnOptions={returnOptions}
                    side={side}
                />
            </Form.Item>
            <Form.Item
                name={[name.toString(), 'returns']}
                hidden
                initialValue={indicator.returns.map(e => e.value)}
            />
            {indicator.parameters.filter(e => e.readOnly).length > 0 && (
                <Form.Item
                    name={[name.toString(), 'parameters']}
                    label={<Title level={3}>Parameters</Title>}
                    className={`border border-solid border-${color}-500 rounded-lg p-2`}
                >
                    <div className='flex flex-wrap'>
                        {indicator.parameters
                            .filter(e => e.readOnly)
                            .map(e => (
                                <Parameter
                                    // index={index}
                                    key={e.name}
                                    parameter={e}
                                    name={name}
                                />
                            ))}
                    </div>
                </Form.Item>
            )}
        </>
    )
}

export default function Indicator(props: props) {
    const { side, indicators, name, remove, resetCondition, dropParameters } = props
    const [color, setColor] = useState<string>()
    const [indicator, setIndicator] = useState<IndicatorModel>()
    const [indicatorOption, setIndicatorOption] = useState<ReactElement | null>()
    const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>([])

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

    useEffect(() => {
        dropParameters(name)
        if (indicator) {
            setIndicatorOption(
                <IndicatorOption
                    indicator={indicator}
                    name={name}
                    returnOptions={returnOptions}
                    side={side}
                    color={color || ''}
                />
            )
        } else {
            setIndicatorOption(null)
        }
    }, [color, indicator, name, resetCondition, side, dropParameters, returnOptions])

    useEffect(() => {
        if (indicator) {
            const thisReturn = indicator?.returns.map(e => e as BaseOptionType)
            if (thisReturn) {
                setReturnOptions(thisReturn)
                resetCondition(thisReturn[0].value as string, side, name)
            }
        }
    }, [indicator, name, resetCondition, returnOptions, side])

    return (
        <div className='flex items-start'>
            <div className={`border border-solid rounded-lg border-${color}-600 p-2 w-full mb-6`}>
                <Form.Item
                    label={<Title level={3}>Indicator</Title>}
                    name={[name.toString(), 'name']}
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
                            setIndicator(indicators.find(e => e.value === value))
                        }}
                        options={indicators.map(e => ({
                            value: e.value,
                            label: e.label
                        }))}
                    />
                </Form.Item>
                {indicatorOption}
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
