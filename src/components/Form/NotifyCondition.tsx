import IndicatorModel from '@/model/Indicator'
// import { PlusOutlined } from '@ant-design/icons'
// import { clientApi } from '@/lib/axios'
import { Button, Form, Select, Space } from 'antd'
import { useState } from 'react'
import Indicator from '../Select indicator/Indicator'

type props = {
    indicators: IndicatorModel[]
}

export default function NotifyCondition(props: props) {
    const { indicators } = props

    const [selectingIndicator, setSelectingIndicator] = useState<IndicatorModel>()
    const [selectedIndicator, setSelectedIndicator] = useState<string[]>([])
    const [showModal, setShowModal] = useState(false)

    const handleClick = () => {
        selectedIndicator.push(selectingIndicator?.name ?? '')
        setSelectedIndicator([...selectedIndicator])
        console.log('selectedIndicator', selectedIndicator)
    }

    return (
        <div className='rounded-lg w-full flex-col pb-4'>
            <Form.List name='indicators'>
                {(fields, { add }) => (
                    <>
                        <Form.Item
                            label='Select Indicator'
                            style={{ width: '100%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please select indicator'
                                }
                            ]}
                        >
                            <Space.Compact
                                size='middle'
                                style={{ width: '100%', maxWidth: '100%' }}
                            >
                                <Select
                                    showSearch
                                    placeholder='Select Indicator'
                                    optionFilterProp='children'
                                    style={{ width: '80%', maxWidth: '80%' }}
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '')
                                            .toLowerCase()
                                            .localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    onSelect={value => {
                                        setSelectingIndicator(indicators.find(e => e.name === value))
                                    }}
                                    options={indicators.map(e => ({
                                        value: e.name,
                                        label: `${e.label} (${e.name}) `
                                    }))}
                                    onChange={value => {
                                        setSelectingIndicator(value)
                                    }}
                                />
                                <Button
                                    // className='bg-cyan-700 rounded-lg text-sm flex items-center mx-auto justify-center hover:bg-cyan-600 w-[20%]'
                                    style={{
                                        width: '20%',
                                        maxWidth: '20%',
                                        backgroundColor: 'rgb(14 116 144 / var(--tw-bg-opacity))',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}
                                    type='primary'
                                    // icon={<PlusOutlined />}
                                    onClick={() => {
                                        add()
                                        setShowModal(true)
                                    }}
                                >
                                    Add
                                </Button>
                            </Space.Compact>
                        </Form.Item>
                        {fields.map(({ key, name }) =>
                            showModal ? (
                                <>
                                    <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none rounded-lg min-w-full'>
                                        <div className='relative w-4xl my-2 mx-auto min-w-3xl'>
                                            <div className='rounded-lg shadow-lg relative flex flex-col w-3xl bg-white outline-none focus:outline-none min-w-full'>
                                                <div className='flex items-start justify-between p-5 rounded-lg'>
                                                    <h3 className='text-3xl font-semibold pl-2'>Select Condition</h3>
                                                </div>
                                                <div className='relative px-4 flex min-w-full'>
                                                    <Indicator
                                                        key={key}
                                                        name={name}
                                                        // side='notification'
                                                        selectingIndicator={
                                                            selectingIndicator ?? {
                                                                id: '',
                                                                name: '',
                                                                label: '',
                                                                predefined_returns: [],
                                                                predefined_params: []
                                                            }
                                                        }
                                                    />
                                                </div>
                                                <div className='flex items-center justify-end p-4'>
                                                    <button
                                                        className='text-red-500 background-transparent font-bold p-4 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                                                        type='button'
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className='bg-cyan-700 text-white active:bg-cyan-600 font-bold text-sm p-4 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-cyan-600'
                                                        type='button'
                                                        onClick={() => {
                                                            setShowModal(false)
                                                            handleClick()
                                                        }}
                                                    >
                                                        Add Indicator
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='opacity-25 fixed inset-0 z-40 bg-black' />
                                </>
                            ) : null
                        )}
                    </>
                )}
            </Form.List>
        </div>
    )
}
