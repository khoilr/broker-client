import IndicatorModel from '@/model/Indicator'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Typography } from 'antd'
import { useEffect, useState } from 'react'
import Indicator from './Indicator'

const { Title } = Typography

type props = {
    side: string
    indicators: IndicatorModel[]
    resetCondition: (_return: string) => void
}

export default function Side(props: props) {
    const { side, indicators, resetCondition } = props
    const [color, setColor] = useState<string>()

    useEffect(() => {
        if (side === 'buy') {
            setColor('green')
        } else {
            setColor('red')
        }
    }, [side])

    return (
        <div
            className={`border border-solid rounded-lg border-${color}-700 mx-2 p-2 w-full mb-6`}
        >
            <Title
                level={2}
                className={`text-center text-${color}-500`}
            >
                {`When to ${side}`}
            </Title>
            <Form.List name={side}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name }) => (
                            <Indicator
                                key={key}
                                name={name}
                                side={side}
                                indicators={indicators}
                                remove={remove}
                                resetCondition={resetCondition}
                            />
                        ))}
                        <Form.Item>
                            <Button
                                type='dashed'
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                            >
                                Add indicator
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
        </div>
    )
}
