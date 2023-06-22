import { Form, Input, Space } from 'antd'

export default function InputWhatsappUser() {
    return (
        <Form.Item
            label='WhatsApp number'
            className='w-full mx-2'
            rules={[
                {
                    required: true,
                    message: 'Please input your WhatsApp number'
                }
            ]}
        >
            <Space.Compact
                size='large'
                className='w-full'
            >
                <Form.Item
                    name='whatsapp_area_code'
                    noStyle
                    initialValue='+84'
                >
                    <Input className='w-2/12' />
                </Form.Item>
                <Form.Item
                    name='whatsapp_number'
                    noStyle
                >
                    <Input
                        className='w-10/12'
                        maxLength={9}
                        minLength={9}
                    />
                </Form.Item>
            </Space.Compact>
        </Form.Item>
    )
}
