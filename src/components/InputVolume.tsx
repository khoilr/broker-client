import { Form, Input } from 'antd'

export default function InputVolume() {
    return (
        <Form.Item
            name='Volume'
            label='Volume'
        >
            <Input type='number' />
        </Form.Item>
    )
}
