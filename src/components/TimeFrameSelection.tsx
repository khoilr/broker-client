import { Form, Select } from 'antd'

export default function TimeFrameSelection() {
    return (
        <Form.Item
            name='time_frame'
            label='Time frame'
            className='mx-2 w-full'
        >
            <Select
                showSearch
                placeholder='Select time frame'
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
                options={[
                    { value: '60', label: '1 hour' },
                    { value: 'D', label: '1 day' },
                    { value: 'W', label: '1 week' },
                    { value: 'M', label: '1 month' }
                ]}
            />
        </Form.Item>
    )
}
