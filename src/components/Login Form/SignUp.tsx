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
                    // {...formItemLayout}
                    layout='vertical'
                    form={form}
                    name='register'
                    onFinish={onFinish}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        name='username'
                        label='User name'
                        tooltip='Username use to login'
                        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ fontSize: '5px' }}
                        name='email'
                        label='E-mail'
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
                        label='Password'
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
                        label='Confirm Password'
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
                            className='bg-cyan-700 hover:bg-cyan-500 w-50% text-base font-bold h-10'
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
