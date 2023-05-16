'use client'

import StockSelection from '@/components/StockSelection'
import TimeFrameSelection from '@/components/TimeFrameSelection'
import Side from '@/components/side/Side'
import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import {
    Button,
    Col,
    ConfigProvider,
    Form,
    Layout,
    Row,
    Typography
} from 'antd'
import { useEffect, useState } from 'react'
import indicatorsJSON from '../data/indicator.json'

const { Title } = Typography

export default function Home() {
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])

    useEffect(() => {
        const thisIndicators = indicatorsJSON.map(indicator => {
            const parameters = indicator.parameters.map(parameter => {
                if (
                    ParameterType[
                        parameter.type.toUpperCase() as keyof typeof ParameterType
                    ] === undefined
                ) {
                    console.log(parameter.type)
                }

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

        setIndicators(thisIndicators)
    }, [])

    const [form] = Form.useForm()

    // handle form submission
    const onFinish = (values: unknown) => {
        console.log(values)
    }

    const resetCondition = (_return: string) => {
        const fieldsValue = form.getFieldsValue()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const buyFields = fieldsValue.buy?.map((indicator: any) => {
            const condition = {
                ...indicator?.condition,
                return: _return
            }
            return {
                ...indicator,
                condition
            }
        })
        const sellFields = fieldsValue.sell?.map((indicator: object) => {
            const condition = null
            return {
                ...indicator,
                condition
            }
        })

        const fields = {
            ...fieldsValue,
            buy: buyFields,
            sell: sellFields
        }

        form.setFieldsValue(fields)
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
                                    resetCondition={resetCondition}
                                />
                                <Side
                                    resetCondition={resetCondition}
                                    side='sell'
                                    indicators={indicators}
                                />
                            </div>
                            <div className='flex justify-center'>
                                <Form.Item className='mx-2'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                    >
                                        Auto trading
                                    </Button>
                                </Form.Item>

                                <Form.Item className='mx-2'>
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        // onClick={resetCondition}
                                    >
                                        Back testing
                                    </Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
    )
}
