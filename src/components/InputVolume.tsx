import { Form, Input } from 'antd'

export default function InputVolume() {
    return (
        <Form.Item
            name='Volume'
            className='w-full mx-2'
            label='Volume'
        >
            <Input type='number' />
        </Form.Item>
    )
}
