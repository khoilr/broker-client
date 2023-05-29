'use client'

import StockSelection from '@/components/StockSelection'
import TimeFrameSelection from '@/components/TimeFrameSelection'
import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'

import { Button, Col, ConfigProvider, Form, Layout, Row, Typography } from 'antd'

import InputTelegramUser from '@/components/InputTelegramUser'
import axios from 'axios'
import { useEffect, useState } from 'react'
import InputWhatsappUser from '@/components/InputWhatsappUser'
import indicatorsJSON from '../data/indicators.json'
import InputVolume from '@/components/InputVolume'
import InputPrice from '@/components/InputPrice'

const { Title } = Typography

export default function NotificationPage() {
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])

    useEffect(() => {
        const thisIndicators = indicatorsJSON.map(indicator => {
            const parameters = indicator.parameters.map(parameter => {
                return {
                    ...parameter,
                    type: ParameterType[parameter.type.toUpperCase() as keyof typeof ParameterType]
                } as ParameterModel
            })

            return {
                ...indicator,
                parameters
            } as IndicatorModel
        })

        setIndicators(thisIndicators)
    }, [])

    const [form] = Form.useForm()

    // handle form submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        console.log(values)

        axios.post('http://localhost:8000/', values).then(response => {
            // print url and query params
            console.log(response.data)
        })
    }

    return (
        <html>
            <ConfigProvider
            componentSize='large'
            theme={{
                token: {
                    // colorPrimary: '#eb13c7',
                    fontSize: 16,
                    borderRadius: 16
                }
            }}
        >
            <Layout>
                <Row justify='center'>
                    <Col
                        md={24}
                        lg={20}
                    >
                        <Title className='text-center'>Build stock trading strategy</Title>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <div className='flex justify-between'>
                                <StockSelection />
                                <TimeFrameSelection />
                                <InputTelegramUser />
                                <InputWhatsappUser />
                            </div>
                            <div className='flex justify-between'>
                                <InputPrice />
                                <InputVolume />
                            </div>
                            <div className='flex justify-center'>
                                <Form.Item className='mx-2'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        // onClick={getMessage}
                                    >
                                        Notify me
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                        {/* <Chart/>        */}
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
        </html>
    )
}
