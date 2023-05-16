import ReturnModel from '@/model/Return'
import { Form, Input, Select, Space } from 'antd'
// import ConditionSelection from './ConditionSelection'
import { BaseOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'

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
    resetCondition: (_return: string) => void
}

export default function Condition(props: props) {
    const { returns, name, resetCondition } = props

    const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>([])
    // const [initialReturn, setInitialReturn] = useState<BaseOptionType>()
    // useRef for Select

    // const [selectedReturn, setSelectedReturn] = useState<string>()

    useEffect(() => {
        const thisReturn = returns.map(e => e as BaseOptionType)
        setReturnOptions(thisReturn)
        resetCondition(thisReturn[0].value as string)
    }, [returns, resetCondition])

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
                    // value={initialReturn}
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
