import { Form, Input } from 'antd'

export default function InputPrice() {
    return (
        <Form.Item
            name='price'
            label='Price'
            className='w-full mx-2'
        >
            <Input type='number' />
        </Form.Item>
    )
}
