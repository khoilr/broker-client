'use client'

import Chart from '@/components/Chart'
import InputTelegramUser from '@/components/InputTelegramUser'
import InputWhatsappUser from '@/components/InputWhatsappUser'
import NotifyCondition from '@/components/NotifyCondition'
import StockSelection from '@/components/StockSelection'
// import TimeFrameSelection from '@/components/TimeFrameSelection'
// import Indicator from '@/components/side/Indicator'
// import indicatorsJSON from '@/data/indicators.json'
import { clientApi } from '@/lib/axios'
import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import ReturnModel from '@/model/Return'
import { Button, Col, ConfigProvider, Form, Layout, Row, Typography, notification } from 'antd'
import { useEffect, useRef, useState } from 'react'

const { Title } = Typography

export default function NotifyPage() {
    const [api, contextHolder] = notification.useNotification()

    const [symbol, setSymbol] = useState<string>('')
    // const [timeFrame, setTimeFrame] = useState<string>('')
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])
    const buttonSubmit = useRef(null)

    useEffect(() => {
        clientApi.get('/indicators/').then(res => {
            const indicatorsData = res.data as []

            // Parse indicators
            const thisIndicators = indicatorsData.map((indicator: IndicatorModel) => {
                // Parse parameters
                const parameters = indicator.parameters.map((parameter: ParameterModel) => {
                    return {
                        ...parameter,
                        type: ParameterType[parameter.type as unknown as keyof typeof ParameterType]
                    } as ParameterModel
                })

                // Parse returns
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const returns = indicator.returns?.map((ret: any) => {
                    return {
                        ...ret,
                        value: ret.name
                    } as ReturnModel
                })

                // Return parsed Indicator Model
                return {
                    ...indicator,
                    parameters,
                    returns
                } as unknown as IndicatorModel
            })

            // Set indicators
            setIndicators(thisIndicators)
        })
    }, [])

    const [form] = Form.useForm()

    // handle form submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        clientApi.post('/strategies/', values).then(res => {
            if (res.status === 200) {
                api.info({
                    message: 'Added notification',
                    description: "You'll be notified when the condition is met"
                })
            }
        })
    }

    // * Deprecated
    // const resetCondition = (source: string, side: string, index: number) => {
    //     const fieldsValue = form.getFieldsValue()

    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     const fields = fieldsValue.indicators?.map((indicator: any, i: number) => {
    //         if (i === index) {
    //             const { name } = indicator
    //             const indicatorObject = indicator[name]

    //             const condition = {
    //                 ...indicatorObject?.condition,
    //                 source
    //             }

    //             return {
    //                 ...indicator,
    //                 [name]: {
    //                     ...indicatorObject,
    //                     condition
    //                 }
    //             }
    //         }

    //         return indicator
    //     })

    //     const fieldsObject = {
    //         indicators: fields
    //     }

    //     form.setFieldsValue(fieldsObject)
    // }

    return (
        <ConfigProvider
            componentSize='large'
            theme={{ token: { fontSize: 16, borderRadius: 16 } }}
        >
            {contextHolder}
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
                                <StockSelection setSymbol={setSymbol} />
                                {/* <TimeFrameSelection setTimeFrame={setTimeFrame} /> */}
                                <InputTelegramUser />
                                <InputWhatsappUser />
                            </div>
                            <div className='flex justify-between'>
                                <NotifyCondition
                                    side='notification'
                                    indicators={indicators}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <Form.Item className='mx-2'>
                                    <Button
                                        ref={buttonSubmit}
                                        type='primary'
                                        htmlType='submit'
                                    >
                                        Notify me
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                        <Chart
                            symbol={symbol}
                            timeFrame='1H'
                            // timeFrame={timeFrame}
                        />
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
    )
}
