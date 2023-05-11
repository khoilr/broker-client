import Indicator from '@/model/Indicator'
import Parameter from '@/model/Parameter'
import { Form, Input, Select } from 'antd'
import { sentenceCase } from 'change-case'

type props = {
    indicator: Indicator
    parameter: Parameter
    name: Number
}

const switchCase = (parameter: Parameter) => {
    switch (parameter.type) {
        case 'selection':
            return (
                <Select
                    showSearch
                    placeholder={parameter.name as String}
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                        (option?.label ?? '')
                            .toLowerCase()
                            .includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                            .toString()
                            .toLowerCase()
                            .localeCompare(
                                (optionB?.label ?? '').toString().toLowerCase()
                            )
                    }
                    // onSelect={(value, option) => { }}
                    options={parameter.values?.map(value => {
                        return {
                            label: sentenceCase(value.toString()),
                            value: value as String
                        }
                    })}
                />
            )
        case 'number':
            return <Input type='number' />
    }
}

export default function Parameter(props: props) {
    return (
        <Form.Item
            name={[
                props.name.toString(),
                'parameters',
                props.parameter.name.toString()
            ]}
            label={props.parameter.label as String}
            initialValue={props.parameter.default}
            className='mx-2 w-full'
        >
            {switchCase(props.parameter)}
        </Form.Item>
    )
}
