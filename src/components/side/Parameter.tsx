import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import { Form, Input, Select } from 'antd'
import { sentenceCase } from 'change-case'

type props = {
    parameter: ParameterModel
    name: number
}

const switchCase = (parameter: ParameterModel) => {
    return parameter.type === ParameterType.SELECTION ? (
        <Select
            showSearch
            placeholder={parameter.name as string}
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
            // onSelect={(value, option) => { }}
            options={parameter.values?.map(value => {
                return {
                    label: sentenceCase(value.toString()),
                    value: value as string
                }
            })}
        />
    ) : (
        <Input type='number' />
    )
}

export default function Parameter(props: props) {
    const { name, parameter } = props

    return (
        <Form.Item
            name={[name.toString(), 'parameters', parameter.name.toString()]}
            label={parameter.label as string}
            initialValue={parameter.default}
            className='px-2 w-full basis-2/6'
        >
            {switchCase(parameter)}
        </Form.Item>
    )
}
