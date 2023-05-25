import { Form, Input } from 'antd'

export default function InputTelegramUser() {
    return (
        <Form.Item
            name='telegram-user'
            label='Telegram user name'
            className='mx-2 w-full'
        >
            <Input
                placeholder='@user'
                type='text'
            />
        </Form.Item>
    )
}
