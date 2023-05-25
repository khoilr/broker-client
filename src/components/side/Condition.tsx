import ReturnModel from '@/model/Return'
import { Form, Input, Select, Space } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'

const changes = [
    { value: 'equal', label: '=' }
]
const units = [
    { value: 'vnd', label: 'VND' },
    { value: 'percentage', label: 'Percentage (%)' }
]

type props = {
    returns: ReturnModel[]
    name: number
    resetCondition: (_return: string, side: string, index: number) => void
    side: string
}

export default function Condition(props: props) {
    const { returns, name, resetCondition, side } = props

    const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>([])

    useEffect(() => {
        const thisReturn = returns.map(e => e as BaseOptionType)
        setReturnOptions(thisReturn)
        resetCondition(thisReturn[0].value as string, side, name)
    }, [returns, resetCondition, name, side])

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
                <Input
                    type='number'
                    min={0}
                />
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
