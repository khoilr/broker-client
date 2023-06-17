import IndicatorModel from '@/model/Indicator'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Indicator from './side/Indicator'

const { Title } = Typography

type props = {
    side: string
    indicators: IndicatorModel[]
    resetCondition: (_return: string, side: string, index: number) => void
}

export default function NotifyCondition(props: props) {
    const { side, indicators, resetCondition } = props
    const [color, setColor] = useState<string>()
    const [selectingIndicator, setSelectingIndicator] = useState<string>()

    useEffect(() => {
        if (side === 'notification') {
            setColor('black')
        }
    }, [side])

    return (
        <div className={`border border-solid rounded-lg border-${color}-700 mx-2 p-2 w-full mb-6`}>
            <Title
                level={2}
                className={`text-center text-${color}-500`}
            >
                Notification
            </Title>
            <Form.List name='indicators'>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name }) => (
                            <Indicator
                                key={key}
                                name={name}
                                side='notification'
                                indicator={selectingIndicator}
                                // indicators={indicators}
                                remove={remove}
                                resetCondition={resetCondition}
                            />
                        ))}
                        <Form.Item>
                            <Button
                                type='dashed'
                                onClick={() => add('hihi')}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add indicator
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Space.Compact size='large'>
                                <Select
                                    showSearch
                                    placeholder={`Search ${side} indicator`}
                                    optionFilterProp='children'
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={[
                                        { label: 'AND', value: 'AND' },
                                        { label: 'OR', value: 'OR' }
                                    ]}
                                    onSelect={value => {
                                        // setSelectingIndicator(indicators.find(e => e.name === value))
                                        setSelectingIndicator(value)
                                    }}
                                />
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        add()
                                    }}
                                >
                                    Add indicator
                                </Button>
                            </Space.Compact>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </div>
    )
}
