/* eslint-disable @typescript-eslint/no-explicit-any */
import InputTelegramUser from '@/components/Form/InputTelegramUser'
// import InputWhatsappUser from '@/components/Form/InputWhatsappUser'
import StockSelection from '@/components/Form/StockSelection'
import IndicatorModel from '@/model/Indicator'
import StockModel from '@/model/Stock'
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import { Form, FormInstance, message } from 'antd'
import { useEffect, useState } from 'react'
import { clientApi } from '@/lib/axios'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import ReturnModel from '@/model/Return'
import NotifyCondition from '@/components/Form/NotifyCondition'
import axios from 'axios'

interface props {
    setStock: (stock: StockModel) => void
    form: FormInstance
    onSubmit: (data: any) => void
}

export default function FormField(props: props) {
    const { setStock, form, onSubmit } = props
    // const [activeTab, setActiveTab] = useState('notification')
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])
    const [formData, setFormData] = useState<any>([])
    const [messageApi] = message.useMessage()

    const data = [
        {
            label: 'Place Order',
            value: 'notification'
        }
    ]

    useEffect(() => {
        clientApi.get('/predefined_indicator/').then(res => {
            const indicatorsData = res.data

            // Parse indicators
            const thisIndicators = indicatorsData.map((indicator: IndicatorModel) => {
                // Parse parameters
                const parameters = indicator.predefined_params.map((parameter: any) => {
                    let { type } = parameter

                    if (type === 'float' || type === 'int') type = 'number'
                    else if (type.includes('OHLCV')) type = 'OHLCV'
                    else type = 'selection'

                    return {
                        ...parameter,
                        type: ParameterType[type.toUpperCase() as keyof typeof ParameterType]
                    } as ParameterModel
                })

                // Parse returns
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const returns = indicator.predefined_returns?.map((ret: any) => {
                    return {
                        ...ret,
                        value: ret.name
                    } as ReturnModel
                })

                // Return parsed Indicator Model
                return {
                    ...indicator,
                    predefined_params: parameters,
                    predefined_returns: returns
                } as unknown as IndicatorModel
            })

            // Set indicators
            setIndicators(thisIndicators)
        })
    }, [])

    useEffect(() => {
        setFormData(form.getFieldsValue())
    }, [formData])

    async function handleSave() {
        onSubmit({ ...formData, form })

        const symbols = []
        symbols.push(formData.stock.split('-')[0].trim())

        const indicators = []
        for (let i = 0; i < formData.indicators.length; i += 1) {
            const indicator = formData.indicators[i]
            const indicatorParams = indicator.parameters

            const params = []
            // eslint-disable-next-line no-restricted-syntax
            for (const key in indicatorParams) {
                if (indicatorParams.hasOwnProperty(key)) {
                    params.push({ name: key, value: indicatorParams[key] })
                }
            }

            indicators.push({
                name: indicator.name,
                condition: { ...indicator.condition, value: Number(indicator.condition.value) },
                params
            })
        }

        const data = {
            symbols,
            telegram: formData.telegram_user,
            indicators
        }

        const userStr = localStorage.getItem('user')

        const customConfig = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${userStr?.toString()}`,
            }
        }

        try {
            await axios.post('http://localhost:8000/api/strategy', JSON.stringify(data), customConfig).then(res => {
                if (res.status === 201) {
                    messageApi.open({
                        type: 'success',
                        content: 'Post successfully!'
                    })
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                // ✅ TypeScript knows err is Error
                messageApi.open({
                    type: 'error',
                    content: error.response.data.detail
                })
            } else {
                console.log('Unexpected error', error)
            }
        }
    }

    return (
        <div className='w-full col-span-1 relative lg:h-[70vh] h-full py-4 border rounded-lg bg-white'>
            <Tabs
                id='custom-animation'
                value='notification'
            >
                <TabsHeader>
                    {/* {data.map(({ label, value }) => ( */}
                    <Tab
                        // key={value}
                        // value={value}
                        // onClick={() => setActiveTab(value)}
                        // className={
                        //     activeTab === value
                        //         ? 'text-cyan-700 font-semibold border-b-2 border-cyan-700 p-2'
                        //         : 'p-2'
                        // }
                        className='text-cyan-700 font-semibold border-b-2 border-cyan-700 p-2'
                    >
                        Place Order
                    </Tab>
                    {/* ))} */}
                </TabsHeader>
                <TabsBody
                    animate={{
                        initial: { y: 250 },
                        mount: { y: 0 },
                        unmount: { y: 250 }
                    }}
                >
                    {data.map(({ value }) => (
                        <TabPanel
                            key={value}
                            value={value}
                        >
                            <Form
                                size='middle'
                                form={form}
                                layout='vertical'
                                // onFinish={onFinish}
                            >
                                <div className='items-center px-2 pt-2 rounded-lg m-auto flex-col'>
                                    <StockSelection setStock={setStock} />
                                    <InputTelegramUser />
                                    {/* <InputWhatsappUser /> */}
                                    <NotifyCondition indicators={indicators} />
                                    <div className='flex justify-items-center'>
                                        <button
                                            type='button'
                                            onClick={handleSave}
                                            className='bg-cyan-700 text-white py-2 px-auto rounded-lg m-auto flex justify-center min-w-20 w-20'
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    )
}
