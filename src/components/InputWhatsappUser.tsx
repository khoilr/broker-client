import { Form, Input, Select } from 'antd'

const { Option } = Select

export default function InputWhatsappUser() {
    const prefixSelector = (
        <Form.Item
            name='prefix'
            noStyle
        >
            <Select
                style={{ width: 70 }}
                defaultValue='+84'
            >
                <Option value='84'>+84</Option>
                <Option value='86'>+86</Option>
            </Select>
        </Form.Item>
    )
    return (
        <Form.Item
            label='WhatsApp Number'
            className='w-full mx-auto'
            rules={[
                {
                    required: true,
                    message: 'Please input your WhatsApp number'
                }
            ]}
        >
            <Input
                addonBefore={prefixSelector}
                style={{ width: '100%' }}
            />
        </Form.Item>
    )
}
