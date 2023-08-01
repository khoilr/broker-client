/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Checkbox, Form, Input, message } from 'antd'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const [form] = Form.useForm()
    // const [formData, setFormData] = useState<any>([])

    const [messageApi, contextHolder] = message.useMessage()

    const navigate = useNavigate()
    const goToHomePage = () => {
        // This will navigate to second component
        navigate('/homepage')
    }
    const goToSignUpPage = () => {
        navigate('/signup')
    }

    const onFinish = async (values: any) => {
        const formData = new FormData()
        formData.append('username', values.username)
        formData.append('password', values.password)

        console.log('Received values of form: ', values)

        const reqOptions = {
            url: 'http://localhost:8000/api/auth/sign-in',
            method: 'POST',
            data: formData
        }

        try {
            await axios.request(reqOptions).then(res => {
                if (res.status === 201) {
                    goToHomePage()
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
        <div className='flex flex-col items-center justify-center w-full flex-1 px-20 text-center min-h-screen py-2 bg-gray-200'>
            {contextHolder}
            <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                <div className='w-3/5 p-5'>
                    <div className='text-left font-bold'>
                        <span className='text-cyan-700'>1C</span> Innovation
                    </div>
                    <div className='pt-10'>
                        <h2 className='text-3xl font-bold mb-2 text-cyan-700'>Login to Account</h2>
                    </div>
                    <div className='border-2 w-10 border-cyan-700 inline-block mb-2' />
                    <Form
                        name='basic'
                        form={form}
                        style={{ maxWidth: 500 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        // onFinishFailed={onFinishFailed}
                        autoComplete='on'
                        layout='vertical'
                    >
                        <Form.Item
                            style={{ padding: '10px 40px 0px' }}
                            label={<p style={{ fontSize: '16px' }}>Username</p>}
                            name='username'
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            style={{ padding: '0px 40px' }}
                            label={<p style={{ fontSize: '16px' }}>Password</p>}
                            name='password'
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item
                                style={{ float: 'left', padding: '0px 40px' }}
                                name='remember'
                                valuePropName='unchecked'
                            >
                                <Checkbox style={{ fontSize: '14px' }}>Remember me</Checkbox>
                            </Form.Item>
                            <a
                                style={{ float: 'right', padding: '0px 40px' }}
                                href=''
                            >
                                Forgot password?
                            </a>
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
                                    borderRadius: '10px'
                                }}
                                type='primary'
                                htmlType='submit'
                            >
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <div className='w-2/5 bg-cyan-700 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                    <h2 className='text-3xl font-bold mb-2'>Hello, Friend!</h2>
                    <div className='border-2 w-10 border-white inline-block mb-2' />
                    <p className='mb-10'>Fill up personal information to join with us</p>
                    <button
                        type='button'
                        className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-cyan-700'
                        onClick={goToSignUpPage}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}
