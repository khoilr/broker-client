/* eslint-disable @typescript-eslint/no-explicit-any */
import InputTelegramUser from '@/components/InputTelegramUser'
import InputWhatsappUser from '@/components/InputWhatsappUser'
import StockSelection from '@/components/StockSelection'
import IndicatorModel from '@/model/Indicator'
import StockModel from '@/model/Stock'
import { Tab, TabPanel, Tabs, TabsBody, TabsHeader } from '@material-tailwind/react'
import { Form, FormInstance } from 'antd'
import { useEffect, useState } from 'react'
import { clientApi } from '@/lib/axios'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import ReturnModel from '@/model/Return'
import NotifyCondition from '@/components/NotifyCondition'

interface props {
    setStock: (stock: StockModel) => void
    form: FormInstance
}

export default function FormField(props: props) {
    const { setStock, form } = props

    const [activeTab, setActiveTab] = useState('notification')
    const [indicators, setIndicators] = useState<IndicatorModel[]>([])

    const data = [
        {
            label: 'Notification',
            value: 'notification'
        }
    ]

    // handle form submission
    const onFinish = (values: any) => {
        clientApi.post('/strategies/', values).then(res => {
            if (res.status === 200) {
                // api.info({
                //     message: 'Added notification',
                //     description: "You'll be notified when the condition is met"
                // })
            }
        })
    }

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

    return (
        <div className='w-full col-span-1 relative  lg:h-[70vh] h-full py-4 border rounded-lg bg-white'>
            <Tabs
                id='custom-animation'
                value='notification'
            >
                <TabsHeader className='rounded-none bg-transparent'>
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={
                                activeTab === value
                                    ? 'text-cyan-700 font-semibold border-b-2 border-cyan-700 p-2'
                                    : 'p-2'
                            }
                        >
                            {label}
                        </Tab>
                    ))}
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
                                onFinish={onFinish}
                            >
                                <div className='items-center px-2 pt-2 rounded-lg m-auto flex-col'>
                                    <StockSelection setStock={setStock} />
                                    <InputTelegramUser />
                                    <InputWhatsappUser />
                                    <NotifyCondition indicators={indicators} />
                                    <button
                                        type='button'
                                        className='bg-cyan-700 text-white py-2 px-4 rounded-lg m-auto flex items-center'
                                    >
                                        Notify me
                                    </button>
                                </div>
                            </Form>
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </div>
    )
}
