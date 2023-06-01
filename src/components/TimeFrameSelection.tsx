import { Form, Select } from 'antd'

const options = [
    {
        label: 'Minute',
        options: [
            {
                value: '1m',
                label: '1 minute'
            },
            {
                value: '5m',
                label: '5 minutes'
            },
            {
                value: '15m',
                label: '15 minutes'
            },
            {
                value: '30m',
                label: '30 minutes'
            }
        ]
    },
    {
        label: 'Hour',
        options: [
            {
                value: '1H',
                label: '1 hour'
            },
            {
                value: '4H',
                label: '4 hours'
            }
        ]
    },
    {
        label: 'Other',
        options: [
            {
                value: '1D',
                label: '1 day'
            },
            {
                value: '1W',
                label: '1 week'
            },
            {
                value: '1M',
                label: '1 month'
            }
        ]
    }
]

interface props {
    setTimeFrame: (timeFrame: string) => void
}

export default function TimeFrameSelection(props: props) {
    const { setTimeFrame } = props

    return (
        <Form.Item
            name='time_frame'
            label='Time frame'
            className='mx-2 w-full'
        >
            <Select
                showSearch
                placeholder='Select time frame'
                optionFilterProp='children'
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                // * don't sort
                // filterSort={(optionA, optionB) =>
                //     (optionA?.label ?? '')
                //         .toLowerCase()
                //         .localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                options={options}
                onSelect={(value: string) => {
                    setTimeFrame(value)
                }}
            />
        </Form.Item>
    )
}
