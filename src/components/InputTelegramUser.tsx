import { Form, Input } from 'antd'

export default function InputTelegramUser() {
    return (
        <Form.Item
            name='telegram-user'
            label='Telegram user name'
            className='mx-2 w-full'
            tooltip={
                <p>
                    Please go to{' '}
                    <a
                        target='_blank'
                        href={process.env.NEXT_PUBLIC_TELEGRAM_BOT_URL}
                        rel='noreferrer'
                    >
                        t.me/broker_khoilr_bot
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
                placeholder='@user'
                type='text'
            />
        </Form.Item>
    )
}
