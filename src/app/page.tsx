'use client'

import StockSelection from '@/components/StockSelection'
import TimeFrameSelection from '@/components/TimeFrameSelection'
import Side from '@/components/side/Side'
import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import { PlusOutlined } from '@ant-design/icons'

import { Button, Col, ConfigProvider, Form, Layout, Row, Typography } from 'antd'

import { ModalForm, ProForm, ProFormText } from '@ant-design/pro-components'

import axios from 'axios'
import { useEffect, useState } from 'react'
import indicatorsJSON from '../data/indicators.json'

const { Title } = Typography

// const waitTime = (time: number = 100) => {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(true)
//         }, time)
//     })
// }

export default function Home() {
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
        axios.post('http://localhost:8000/', values).then(response => {
            // print url and query params
            console.log(response.data)
        })
    }

    const resetCondition = (_return: string, side: string, index: number) => {
        const fieldsValue = form.getFieldsValue()

        // replace return in condition in side and index with _return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fields = fieldsValue[side]?.map((indicator: any, i: number) => {
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
            [side]: fields
        }

        form.setFieldsValue(fieldsObject)
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
                        <Title className='text-center'>Build stock trading strategy</Title>
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
                                        // onClick={getMessage}
                                    >
                                        Auto trading
                                    </Button>
                                </Form.Item>

                                <Form.Item className='mx-2'>
                                    <ModalForm
                                        title='Enter Username'
                                        trigger={
                                            <Button type='primary'>
                                                <PlusOutlined />
                                                Notification
                                            </Button>
                                        }
                                        form={form}
                                        autoFocusFirstInput
                                        modalProps={{
                                            destroyOnClose: true,
                                            onCancel: () => console.log('run')
                                        }}
                                        submitTimeout={2000}
                                        //     onFinish={async (values) => {
                                        //     await waitTime(2000);
                                        //     console.log(values.name);
                                        //     message.success('Success');
                                        //     return true;
                                        //     }
                                        // }
                                    >
                                        <ProForm.Group>
                                            <ProFormText
                                                width='md'
                                                name='name'
                                                label='Enter username'
                                                tooltip='Enter username'
                                                placeholder='hienhine0310'
                                            />
                                        </ProForm.Group>
                                    </ModalForm>
                                </Form.Item>
                            </div>
                        </Form>
                        {/* <Chart/>        */}
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
    )
}
