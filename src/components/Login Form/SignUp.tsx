import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import React from 'react'

export default function SignUp() {
    const [form] = Form.useForm()
    // const [formData, setFormData] = useState<any>([])

    const [messageApi, contextHolder] = message.useMessage()

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Registered successfully!'
        })
    }

    const onFinish = async (values: any) => {
        const formData = new FormData()
        formData.append('username', values.username)
        formData.append('password', values.password)

        const reqOptions = {
            url: 'http://localhost:8000/api/auth/sign-up',
            method: 'POST',
            data: formData
        }

        try {
            await axios.request(reqOptions).then(res => {
                if (res.status === 201) {
                    success()
                }
            })
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: error.response.data.detail
            })
        }
    }

    return (
        <div className='bg-white rounded-2xl shadow-2xl flex w-[50vh] justify-center'>
            {contextHolder}
            <div className='p-7 w-full'>
                <div className='text-left font-bold'>
                    <span className='text-cyan-700'>1C</span> Innovation
                </div>
                <div className='pt-5'>
                    <h2 className='text-3xl font-bold mb-2 text-cyan-700'>Sign Up</h2>
                </div>
                <div className='border-2 w-10 border-cyan-700 inline-block mb-4 mt-2' />
                <Form
                    layout='vertical'
                    form={form}
                    name='register'
                    onFinish={onFinish}
                    style={{ maxWidth: 600, padding: '0px 10px' }}
                >
                    <Form.Item
                        name='username'
                        label={<p style={{ fontSize: '16px' }}>Username</p>}
                        tooltip='Username use to login'
                        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ fontSize: '5px' }}
                        name='email'
                        label={<p style={{ fontSize: '16px' }}>E-mail</p>}
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!'
                            },
                            {
                                required: false,
                                message: 'Please input your E-mail!'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        label={<p style={{ fontSize: '16px' }}>Password</p>}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name='confirm'
                        label={<p style={{ fontSize: '16px' }}>Confirm Password</p>}
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!'
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve()
                                    }
                                    return Promise.reject(new Error('The new password that you entered do not match!'))
                                }
                            })
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            style={{
                                width: '100px',
                                height: '40px',
                                backgroundColor: 'rgb(14 116 144 / var(--tw-bg-opacity))',
                                color: 'white',
                                fontSize: '16px',
                                fontWeight: '600',
                                borderRadius: '10px',
                                marginTop: '20px'
                            }}
                            type='primary'
                            htmlType='submit'
                        >
                            Sign Up
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
