'use client'

import InputTelegramUser from '@/components/InputTelegramUser'
import InputWhatsappUser from '@/components/InputWhatsappUser'
import NotifyCondition from '@/components/NotifyCondition'
import StockSelection from '@/components/StockSelection'
import TimeFrameSelection from '@/components/TimeFrameSelection'
import { Button, Col, ConfigProvider, Form, Layout, Row, Typography } from 'antd'
import { useEffect, useRef, useState } from 'react'
import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import Chart from '@/components/Chart'
import indicatorsJSON from '@/data/indicators.json'
// import apiAxios from '@/lib/axios'
import ParameterType from '@/model/ParameterType'

const { Title } = Typography

export default function NotifyPage() {
    // const [api, contextHolder] = notification.useNotification()

    const [symbol, setSymbol] = useState<string>()
    const [timeFrame, setTimeFrame] = useState<string>()
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])
    const buttonSubmit = useRef(null)

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
            } as unknown as IndicatorModel
        })

        setIndicators(thisIndicators)
    }, [])
    const [form] = Form.useForm()

    // handle form submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        // log values but indicators
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { indicators, ...rest1 } = values
        console.table(rest1)

        const { parameters, ...rest2 } = indicators
        console.table(rest2)
        console.table(parameters)
        // apiAxios.post('/', values).then(res => {
        //     if (res.status === 200) {
        //         api.info({
        //             message: 'Added notification',
        //             description: "You'll be notified when the condition is met"
        //         })
        //     }
        // })
    }

    const dropParameters = (index: number) => {
        console.log(index)

        // const fieldsValue = form.getFieldsValue()
        // // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const fields = fieldsValue.indicators?.map((indicator: any, i: number) => {
        //     if (i === index) {
        //         return {
        //             ...indicator,
        //             parameters: []
        //         }
        //     }
        //     return indicator
        // })

        // const fieldsObject = {
        //     indicators: fields
        // }

        // console.log(fieldsObject)

        // form.setFieldsValue(fieldsObject)
    }

    const resetCondition = (source: string, side: string, index: number) => {
        const fieldsValue = form.getFieldsValue()

        // replace return in condition in side and index with _return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fields = fieldsValue.indicators?.map((indicator: any, i: number) => {
            if (i === index) {
                const condition = {
                    ...indicator?.condition,
                    source
                }
                return {
                    ...indicator,
                    condition
                }
            }
            return indicator
        })

        const fieldsObject = {
            indicators: fields
        }

        console.log(fieldsObject)

        form.setFieldsValue(fieldsObject)
    }

    return (
        <ConfigProvider
            componentSize='large'
            theme={{ token: { fontSize: 16, borderRadius: 16 } }}
        >
            {/* {contextHolder} */}
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
                                <TimeFrameSelection setTimeFrame={setTimeFrame} />
                                <InputTelegramUser />
                                <InputWhatsappUser />
                            </div>
                            <div className='flex justify-between'>
                                <NotifyCondition
                                    resetCondition={resetCondition}
                                    side='notification'
                                    indicators={indicators}
                                    dropParameters={dropParameters}
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
                            symbol={symbol || ''}
                            timeFrame={timeFrame || ''}
                        />
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
    )
}
