import { Form, Input, Space } from 'antd'

export default function InputWhatsappUser() {
    return (
        <Form.Item
            label='WhatsApp number'
            className='w-full'
            rules={[
                {
                    required: true,
                    message: 'Please input your WhatsApp number'
                }
            ]}
        >
            <Space.Compact
                size='middle'
                className='w-full'
            >
                <Form.Item
                    name='whatsapp_area_code'
                    noStyle
                >
                    <Input
                        className='w-1/6 text-center'
                        defaultValue='+84'
                    />
                </Form.Item>
                <Form.Item
                    name='whatsapp_number'
                    noStyle
                >
                    <Input
                        className='w-full'
                        maxLength={9}
                        minLength={9}
                    />
                </Form.Item>
            </Space.Compact>
        </Form.Item>
    )
}
