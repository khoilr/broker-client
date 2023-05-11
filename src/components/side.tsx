import { Button, Form } from 'antd'
import { useEffect, useState } from 'react'
import Indicator from './indicator'
import IndicatorModel from '@/model/Indicator'
import { Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

type props = {
    side: String
    indicators: IndicatorModel[]
}

export default function Side(props: props) {
    const [color, setColor] = useState<String>()

    useEffect(() => {
        if (props.side === 'buy') {
            setColor('green')
        } else {
            setColor('red')
        }
    }, [props.side])

    return (
        <div
            className={`border border-solid rounded-lg border-${color}-700 mx-2 p-2 w-full mb-6`}
        >
            <Title
                level={2}
                className={`text-center text-${color}-500`}
            >
                {`When to ${props.side}`}
            </Title>
            <Form.List name={props.side.toString()}>
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Indicator
                                key={key}
                                name={name}
                                side={props.side}
                                indicators={props.indicators}
                                remove={remove}
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
