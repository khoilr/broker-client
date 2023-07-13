import { Form, Input } from 'antd'

export default function InputTelegramUser() {
    return (
        <Form.Item
            name='telegram_user'
            label='Telegram User Name'
            className='w-full'
            tooltip={
                <p>
                    Please go to{' '}
                    <a
                        target='_blank'
                        href={process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}
                        rel='noreferrer'
                    >
                        Telegram bot
                    </a>{' '}
                    to activate notification to your telegram account
                </p>
            }
            rules={[
                {
                    required: true,
                    message: 'Please input your Telegram user name'
                }
            ]}
        >
            <Input
                placeholder='@User'
                type='text'
            />
        </Form.Item>
    )
}
