import IndicatorModel from '@/model/Indicator'
import ReturnModel from '@/model/Return'
import { Form, Input, Select, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'

const changes = [
    { value: '==', label: '=' },
    { value: '>', label: '>' },
    { value: '>=', label: '>=' },
    { value: '<', label: '<' },
    { value: '<=', label: '<=' }
]
const units = [
    { value: 'vnd', label: 'VND' },
    { value: 'percentage', label: 'Percentage (%)' }
]

type props = {
    indicator: IndicatorModel
    returns?: ReturnModel[]
    name: number
    side: string
    resetCondition: (_return: string, side: string, index: number) => void
}

function Condition(props: props) {
    const { returns, name, resetCondition, side, indicator } = props

    const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>()

    useEffect(() => {
        // Get the returns of the indicator
        let thisReturn = returns?.map(e => e as BaseOptionType)

        // if thisReturn is empty, then add a new BaseOption with the name of the indicator
        if (thisReturn?.length === 0 || thisReturn === undefined) {
            thisReturn = [{ value: indicator.name, label: indicator.name } as BaseOptionType]
        }

        // Set the returnOptions
        setReturnOptions(thisReturn)

        // Reset the condition of the indicator
        resetCondition(thisReturn[0].value as string, side, name)
    }, [returns, resetCondition, name, side, indicator.name])

    return (
        <Space.Compact
            size='large'
            className='w-full px-2'
        >
            <Form.Item
                className='w-full'
                name={[name.toString(), indicator.name, 'condition', 'source']}
                rules={[
                    {
                        required: true,
                        message: 'Please select source'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder='Select source'
                    optionFilterProp='children'
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={returnOptions}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), indicator.name, 'condition', 'change']}
                rules={[
                    {
                        required: true,
                        message: 'Please select condition'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder='Select condition'
                    optionFilterProp='children'
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={changes}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), indicator.name, 'condition', 'value']}
                rules={[{ required: true, message: 'Please input value' }]}
            >
                <Input
                    type='number'
                    min={0}
                    step={0.01}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), indicator.name, 'condition', 'unit']}
                rules={[
                    {
                        required: true,
                        message: 'Please select unit'
                    }
                ]}
            >
                <Select
                    showSearch
                    placeholder='Select unit'
                    optionFilterProp='children'
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={units}
                />
            </Form.Item>
        </Space.Compact>
    )
}

Condition.defaultProps = {
    returns: [] // Define an empty array as the default value for the "returns" prop
}

export default Condition
