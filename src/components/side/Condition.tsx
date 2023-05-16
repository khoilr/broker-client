import { useEffect, useState } from 'react'
import ReturnModel from '@/model/Return'
import { Form, Input, Select, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'

const changes = [
    { value: 'increase-to', label: 'Increase to' },
    { value: 'increase-by', label: 'Increase by' },
    { value: 'decrease-to', label: 'Decrease to' },
    { value: 'decrease-by', label: 'Decrease by' }
]
const units = [
    { value: 'vnd', label: 'VND' },
    { value: 'percentage', label: 'Percentage (%)' }
]

type props = {
    returns: ReturnModel[]
    name: number
}

export default function Condition(props: props) {
    const { returns, name } = props

    const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>([])
    const [initialReturn, setInitialReturn] = useState<BaseOptionType>()

    useEffect(() => {
        const thisReturn = returns.map(e => e as BaseOptionType)
        setReturnOptions(thisReturn)
        setInitialReturn(thisReturn[0])
    }, [returns])

    return (
        <Space.Compact
            size='large'
            className='w-full px-2'
        >
            <Form.Item
                className='w-full'
                name={[name.toString(), 'condition', 'return']}
            >
                <Select
                    showSearch
                    placeholder='Select return'
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={returnOptions}
                    value={initialReturn}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), 'condition', 'change']}
            >
                <Select
                    showSearch
                    placeholder='Select condition'
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={changes}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), 'condition', 'value']}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[name.toString(), 'condition', 'unit']}
            >
                <Select
                    showSearch
                    placeholder='Select unit'
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={units}
                />
            </Form.Item>
        </Space.Compact>
    )
}
