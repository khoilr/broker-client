import { Form, Input } from 'antd'

export default function InputWhatsappUser() {
    return (
        <Form.Item
            name='whatsapp-user'
            label='Whatsapp user name'
            className='mx-2 w-full'
        >
            <Input
                placeholder='@user'
                type='text'
            />
        </Form.Item>
    )
}
