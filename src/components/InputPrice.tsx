import { Form, Input } from 'antd'

export default function InputPrice() {
    return (
        <Form.Item
            name='price'
            label='Price'
        >
            <Input type='number' />
        </Form.Item>
    )
}
