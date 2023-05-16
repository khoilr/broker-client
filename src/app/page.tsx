'use client'

import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import {
    Button,
    Col,
    Form,
    Layout,
    Row,
    Typography,
    Select,
    ConfigProvider
} from 'antd'
import { useEffect, useState } from 'react'
import indicatorsJSON from '../data/indicator.json'
import StockSelection from '@/components/StockSelection'
import TimeFrameSelection from '@/components/TimeFrameSelection'
import Side from '@/components/Side'

const { Title, Text } = Typography

export default function Home() {
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])

    useEffect(() => {
        const _indicators = indicatorsJSON.map(indicator => {
            const parameters = indicator.parameters.map(parameter => {
                if (
                    ParameterType[
                        parameter.type.toUpperCase() as keyof typeof ParameterType
                    ] === undefined
                )
                    console.log(parameter.type)

                return {
                    ...parameter,
                    type: ParameterType[
                        parameter.type.toUpperCase() as keyof typeof ParameterType
                    ]
                } as ParameterModel
            })

            return {
                ...indicator,
                parameters
            } as IndicatorModel
        })

        setIndicators(_indicators)
    }, [])

    const [form] = Form.useForm()

    // handle form submission
    const onFinish = (values: any) => {
        console.log(values)
    }

    return (
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
                        <Title className='text-center'>
                            Build stock trading strategy
                        </Title>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={onFinish}
                        >
                            <div className='flex justify-between'>
                                <StockSelection />
                                <TimeFrameSelection />
                            </div>
                            <div className='flex justify-between items-start'>
                                <Side
                                    side='buy'
                                    indicators={indicators}
                                />
                                <Side
                                    side='sell'
                                    indicators={indicators}
                                />
                            </div>
                            <Row justify ="center">
                            <Form.Item className="m-2">
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Start auto trading
                                </Button>
                            </Form.Item>

                            <Form.Item className="m-2">
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Back testing
                                </Button>
                            </Form.Item>
                            </Row>  
                        </Form>
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
    )
}
