import { Form, Input } from 'antd'

export default function InputWhatsappUser() {
    return (
        <Form.Item
            name='whatsapp-number'
            label='Whatsapp phone number'
            className='mx-2 w-full'
            rules={[
                {
                    required: true,
                    message: 'Please input your Whatsapp phone number'
                }
            ]}
        >
            <Input
                placeholder='Whatsapp-number'
                type='text'
                minLength={10}
                maxLength={10}
            />
        </Form.Item>
    )
}
