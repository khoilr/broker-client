import { Form, Input, Select, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'
import ReturnModel from '@/model/Return'

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
    name: Number
}

export default function Condition(props: props) {
    const [returns, setReturns] = useState<BaseOptionType[]>([])
    const [initialReturn, setInitialReturn] = useState<BaseOptionType>()

    useEffect(() => {
        const _returns = props.returns.map(e => e as BaseOptionType)
        setReturns(_returns)
        setInitialReturn(_returns[0])
    }, [props.returns])

    return (
        <Space.Compact
            size='large'
            className='w-full px-2'
        >
            <Form.Item
                className='w-full'
                name={[props.name.toString(), 'condition', 'return']}
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
                    options={returns}
                    value={initialReturn}
                />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[props.name.toString(), 'condition', 'change']}
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
                name={[props.name.toString(), 'condition', 'value']}
            >
                <Input type='number' />
            </Form.Item>
            <Form.Item
                className='w-full'
                name={[props.name.toString(), 'condition', 'unit']}
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
