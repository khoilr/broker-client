import IndicatorModel from '@/model/Indicator'
import ReturnModel from '@/model/Return'
import { Form, Input, Select, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { useState } from 'react'

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
    indicator: IndicatorModel | undefined
    returns?: ReturnModel[]
    name: number
}

function Condition(props: props) {
    const { returns, name, indicator } = props

    const [returnOptions] = useState<BaseOptionType[]>(() => {
        // Get the returns of the indicator
        let thisReturn = returns?.map(e => e as BaseOptionType)

        // if thisReturn is empty, then add a new BaseOption with the name of the indicator
        if (thisReturn?.length === 0 || thisReturn === undefined) {
            thisReturn = [{ value: indicator?.name, label: indicator?.name } as BaseOptionType]
        }
        return thisReturn
    })

    return (
        <Space.Compact
            size='small'
            className='w-full'
        >
            <Form.Item
                noStyle
                className='w-full'
                name={[name.toString(), 'condition', 'source']}
                rules={[
                    {
                        required: true,
                        message: 'Please select source'
                    }
                ]}
                initialValue={returnOptions?.[0]?.value}
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
                noStyle
                className='w-full'
                name={[name.toString(), 'condition', 'change']}
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
                noStyle
                className='w-full'
                name={[name.toString(), 'condition', 'value']}
                rules={[{ required: true, message: 'Please input value' }]}
            >
                <Input
                    type='number'
                    min={0}
                    step={0.01}
                />
            </Form.Item>
            <Form.Item
                noStyle
                className='w-full'
                name={[name.toString(), 'condition', 'unit']}
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
    returns: []
}

export default Condition
