import IndicatorModel from '@/model/Indicator'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space } from 'antd'
import { useState } from 'react'
import Indicator from './side/Indicator'

type props = {
    indicators: IndicatorModel[]
}

export default function NotifyCondition(props: props) {
    const { indicators } = props

    const [selectingIndicator, setSelectingIndicator] = useState<IndicatorModel>()
    const [showModal, setShowModal] = useState(false)
    const [showComponent, setShowComponent] = useState(false)

    const handleClick = () => {
        setShowComponent(!showComponent)
        setShowModal(false)
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
                                    message: 'Please input your WhatsApp number'
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
                                />
                                <Button
                                    className='bg-cyan-700 rounded-lg text-sm flex items-center mx-auto justify-center hover:bg-cyan-600 w-[20%]'
                                    type='primary'
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                        if (selectingIndicator) add()
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
                                        <div className='relative w-auto my-2 mx-auto max-w-3xl'>
                                            <div className=' rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                                                <div className='flex items-start justify-between p-5 rounded-lg'>
                                                    <h3 className='text-3xl font-semibold pl-2'>Select Condition</h3>
                                                </div>
                                                <div className='relative px-6 py-2 flex-auto'>
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
                                                        onClick={() => handleClick()}
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
            {showComponent && (
                <span className='inline-flex items-center rounded-md bg-green-200 px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10'>
                    {indicators.find(e => e.name === selectingIndicator?.name)?.label ?? ''}{' '}
                </span>
            )}
        </div>
    )
}
