'use client'

import StockSelection from '@/components/StockSelection'
import TimeFrameSelection from '@/components/TimeFrameSelection'

import { Button, Col, ConfigProvider, Form, Layout, Row, Typography } from 'antd'

import InputTelegramUser from '@/components/InputTelegramUser'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import InputWhatsappUser from '@/components/InputWhatsappUser'
import NotifyCondition from '@/components/NotifyCondition'
// import ParameterType from '@/model/ParameterType'
import IndicatorModel from '@/model/Indicator'
// import ParameterModel from '@/model/Parameter'
import indicatorsJSON from '@/data/indicators.json'
import Chart from '@/components/Chart'

const { Title } = Typography

export default function NotifyPage() {
    const [symbol, setSymbol] = useState<string>()
    const [timeFrame, setTimeFrame] = useState<string>('1D')
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])
    const buttonSubmit = useRef(null)

    useEffect(() => {
        const thisIndicators = indicatorsJSON.map(indicator => {
            // const parameters = indicator.parameters.map(parameter => {
            //     return {
            //         ...parameter,
            //         type: ParameterType[parameter.type.toUpperCase() as keyof typeof ParameterType]
            //     } as ParameterModel
            // })
            return {
                ...indicator
                // parameters
            } as IndicatorModel
        })

        setIndicators(thisIndicators)
    }, [])
    const [form] = Form.useForm()

    // handle form submission
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onFinish = (values: any) => {
        console.log(values)

        axios.post('https://khoilr.serveo.net/', values).then(response => {
            // print url and query params
            console.log(response.data)
        })
    }

    const resetCondition = (_return: string, side: string, index: number) => {
        const fieldsValue = form.getFieldsValue()
        // replace return in condition in side and index with _return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fields = fieldsValue.indicators?.map((indicator: any, i: number) => {
            if (i === index) {
                const condition = {
                    ...indicator?.condition,
                    return: _return
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

        form.setFieldsValue(fieldsObject)
    }

    return (
        <ConfigProvider
            componentSize='large'
            theme={{ token: { fontSize: 16, borderRadius: 16 } }}
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
