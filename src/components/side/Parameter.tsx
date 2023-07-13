import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import { Form, Input, Select } from 'antd'

const OHLC = [
    { value: 'open', label: 'Open' },
    { value: 'high', label: 'High' },
    { value: 'low', label: 'Low' },
    { value: 'close', label: 'Close' }
]

type props = {
    parameter: ParameterModel
    name: number
}

export default function Parameter(props: props) {
    const { name, parameter } = props

    switch (parameter.type) {
        case ParameterType.SELECTION:
            return (
                <Form.Item
                    name={[name.toString(), 'parameters', parameter.name]}
                    label={parameter.name as string}
                    className='px-2 w-full basis-2/6'
                    initialValue='close'
                >
                    <Select
                        showSearch
                        placeholder={parameter.name as string}
                        optionFilterProp='children'
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={OHLC}
                        defaultValue='close'
                    />
                </Form.Item>
            )
        case ParameterType.NUMBER:
            return (
                <Form.Item
                    name={[name.toString(), 'parameters', parameter.name]}
                    label={parameter.label as string}
                    initialValue={parameter.default}
                    className='px-2 w-full basis-2/6'
                >
                    <Input
                        type='number'
                        min={0}
                        step={0.01}
                    />
                </Form.Item>
            )
        case ParameterType.OHLCV:
            return (
                <Form.Item
                    hidden
                    name={[name.toString(), 'parameters', parameter.name]}
                    initialValue='OHLCV'
                />
            )
        default:
            return null
    }
}
