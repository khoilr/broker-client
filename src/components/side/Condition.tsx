import IndicatorModel from '@/model/Indicator'
import ReturnModel from '@/model/Return'
import { Form, Input, Select, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { useEffect } from 'react'

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
    returns: ReturnModel[]
    name: number
    side: string
    resetCondition: (_return: string, side: string, index: number) => void
}

export default function Condition(props: props) {
const { returns, name, resetCondition, side, indicator } = props

    useEffect(() => {
        const thisReturn = returns.map(e => e as BaseOptionType)

        resetCondition(thisReturn[0].value as string, side, name)
    }, [returns, resetCondition, name, side])

    return (
        <Space.Compact
            size='large'
            className='w-full px-2'
        >
            <Form.Item
                className='w-full'
                name={[name.toString(), indicator.value, 'condition', 'source']}
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
                    options={returns.map(e => e as BaseOptionType)}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), indicator.value, 'condition', 'change']}
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
                name={[name.toString(), indicator.value, 'condition', 'value']}
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
                name={[name.toString(), indicator.value, 'condition', 'unit']}
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
