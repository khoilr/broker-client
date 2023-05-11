'use client'

import Side from '@/components/side'
import IndicatorModel from '@/model/Indicator'
import CompanyModel from '@/model/Company'
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
import indicatorsJSON from '../data/indicators.json'
import companiesJSON from '../data/companies.json'

const { Title, Text } = Typography

export default function Home() {
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])
    const [companies, setCompanies] = useState<CompanyModel[]>([])

    useEffect(() => {
        setIndicators(indicatorsJSON)
        setCompanies(companiesJSON)
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
                                <Form.Item
                                    name='stock'
                                    label='Stock'
                                    className='mx-2 w-full'
                                >
                                    <Select
                                        showSearch
                                        placeholder='Select stock'
                                        optionFilterProp='children'
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.value ?? '')
                                                .toLowerCase()
                                                .localeCompare(
                                                    (
                                                        optionB?.value ?? ''
                                                    ).toLowerCase()
                                                )
                                        }
                                        options={companies.map(e => {
                                            return {
                                                value: e.symbol,
                                                label: `${e.symbol} - ${e.name}`
                                            }
                                        })}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name='time_frame'
                                    label='Time frame'
                                    className='mx-2 w-full'
                                >
                                    <Select
                                        showSearch
                                        placeholder='Select time frame'
                                        optionFilterProp='children'
                                        filterOption={(input, option) =>
                                            (option?.label ?? '')
                                                .toLowerCase()
                                                .includes(input.toLowerCase())
                                        }
                                        filterSort={(optionA, optionB) =>
                                            (optionA?.label ?? '')
                                                .toLowerCase()
                                                .localeCompare(
                                                    (
                                                        optionB?.label ?? ''
                                                    ).toLowerCase()
                                                )
                                        }
                                        options={[
                                            { value: '60', label: '1 hour' },
                                            { value: 'D', label: '1 day' },
                                            { value: 'W', label: '1 week' },
                                            { value: 'M', label: '1 month' }
                                        ]}
                                    />
                                </Form.Item>
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
                            <Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                >
                                    Start auto trading
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        </ConfigProvider>
    )
}
