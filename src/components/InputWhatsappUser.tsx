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
            <Space.Compact size='large'>
                <Form.Item
                    name='whatsapp_area_code'
                    noStyle
                    initialValue='+84'
                >
                    <Input style={{ minWidth: 16 * 3, width: '20%' }} />
                </Form.Item>
                <Form.Item
                    name='whatsapp_number'
                    noStyle
                >
                    <Input
                        style={{ width: '80%' }}
                        maxLength={9}
                        minLength={9}
                    />
                </Form.Item>
            </Space.Compact>
        </Form.Item>
    )
}
