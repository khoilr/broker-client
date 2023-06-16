import { clientApi } from '@/lib/axios'
import IndicatorModel from '@/model/Indicator'
import ParameterModel from '@/model/Parameter'
import ParameterType from '@/model/ParameterType'
import ReturnModel from '@/model/Return'
import { useEffect, useState } from 'react'
import { Control, Controller, UseFormHandleSubmit, UseFormRegister, useFieldArray, useForm } from 'react-hook-form'

interface Parameter {
    id: string
    name: string
    value: string
}
interface Condition {
    name: string
    change: string
    value: string
    unit: string
}
interface Indicator {
    name: string
    parameters: Parameter[]
    condition: Condition
}
interface FormData {
    symbol: string
    time_frame: string
    telegram_user: string
    indicators: Indicator[]
}

const useFormData = (): {
    control: Control<FormData>
    register: UseFormRegister<FormData>
    handleSubmit: UseFormHandleSubmit<FormData>
    onSubmit: (data: FormData) => void
} => {
    const { control, handleSubmit, register } = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        console.log(data) // Handle form submission here
    }

    return {
        control,
        register,
        handleSubmit,
        onSubmit
    }
}

function Symbol(props: { control: Control<FormData> }) {
    const { control } = props

    return (
        <div>
            <label htmlFor='symbol'>Symbol</label>
            <Controller
                control={control}
                name='symbol'
                render={({ field }) => (
                    <select
                        {...field}
                        id='symbol'
                        className='block w-full border-gray-300 rounded-md'
                    >
                        {/* Add your symbol options here */}
                        <option value='AAPL'>AAPL</option>
                        <option value='MSFT'>MSFT</option>
                    </select>
                )}
            />
        </div>
    )
}
function TimeFrame(props: { control: Control<FormData> }) {
    const { control } = props

    return (
        <div>
            <label htmlFor='time_frame'>Time Frame</label>
            <Controller
                control={control}
                name='time_frame'
                render={({ field }) => (
                    <select
                        {...field}
                        id='time_frame'
                        className='block w-full border-gray-300 rounded-md'
                    >
                        {/* Add your time frame options here */}
                        <option value='1m'>1m</option>
                        <option value='5m'>5m</option>
                    </select>
                )}
            />
        </div>
    )
}
function TelegramUser(props: { control: Control<FormData> }) {
    const { control } = props

    return (
        <div>
            <label htmlFor='telegram_user'>Telegram User</label>
            <Controller
                control={control}
                name='telegram_user'
                render={({ field }) => (
                    <input
                        {...field}
                        id='telegram_user'
                        type='text'
                        className='block w-full border-gray-300 rounded-md'
                    />
                )}
            />
        </div>
    )
}
function ConditionField(props: { index: number; register: UseFormRegister<FormData> }) {
    const { index, register } = props

    return (
        <div>
            {/*
            four inputs: name (selection), change (selection), value (text), unit (text)
    */}
            <section className='section'>
                <select
                    {...register(`indicators.${index}.condition.name` as const, {
                        required: true
                    })}
                    placeholder='name'
                >
                    <option value=''>name</option>
                    <option value='cross'>cross</option>
                    <option value='under'>under</option>
                    <option value='over'>over</option>
                </select>
                <select
                    {...register(`indicators.${index}.condition.change` as const, {
                        required: true
                    })}
                    placeholder='change'
                >
                    <option value=''>change</option>
                    <option value='up'>up</option>
                    <option value='down'>down</option>
                </select>
                <input
                    {...register(`indicators.${index}.condition.value` as const, {
                        required: true
                    })}
                    placeholder='value'
                />
                <input
                    {...register(`indicators.${index}.condition.unit` as const, {
                        required: true
                    })}
                    placeholder='unit'
                />
            </section>
        </div>
    )
}

// TODO: implement modify parameters
// function ParametersField(props: {
//     index: number
//     parameters: ParameterModel[]
//     control: Control<FormData>
//     register: UseFormRegister<FormData>
// }) {
//     const { index, control, register, parameters } = props

//     const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
//         control, // control props comes from useForm (optional: if you are using FormContext)
//         name: `indicators.${index}.parameters` as const // unique name for your Field Array
//         // unique name for your Field Array
//     })

//     return (
//         <div>
//             {parameters?.map((parameter, jndex) => (
//                 <>
//                     <input
//                         type='hidden'
//                         {...register(`indicators.${index}.parameters.${jndex}.name` as const, {
//                             value: parameter.name
//                         })}
//                     />
//                     <section
//                         className='section'
//                         key={jndex}
//                     >
//                         <label htmlFor='name'>{parameter.name}</label>
//                         <Controller
//                             control={control}
//                             name={`indicators.${index}.parameters.${jndex}.value`}
//                             render={({ field }) => (
//                                 <input
//                                     {...field}
//                                     id='name'
//                                     type='text'
//                                     className='block w-full border-gray-300 rounded-md'
//                                 />
//                             )}
//                         />
//                     </section>
//                 </>
//             ))}
//         </div>
//     )
// }

function Indicators(props: {
    control: Control<FormData>
    register: UseFormRegister<FormData>
    indicatorsTA: IndicatorModel[]
}) {
    const { control, register, indicatorsTA } = props
    const [indicators, setIndicators] = useState<IndicatorModel[]>()
    const { fields, append, remove } = useFieldArray({
        control, // control props comes from useForm (optional: if you are using FormContext)
        name: 'indicators' // unique name for your Field Array
    })

    return (
        <>
            {fields.map((field, index) => (
                <div key={field.id}>
                    <section
                        className='section'
                        key={field.id}
                    >
                        <label htmlFor={`indicators.${index}.name`}>Indicator</label>
                        <Controller
                            control={control}
                            name={`indicators.${index}.name` as const}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    id={`indicators.${index}.name`}
                                    className='block w-full border-gray-300 rounded-md'
                                    onChange={e => {
                                        // find indicator by name
                                        const indicator = indicatorsTA.find(i => i.name === e.target.value)

                                        // set indicator at index
                                        const newIndicators = [...(indicators ?? [])]
                                        if (indicator) newIndicators[index] = indicator

                                        // set indicators
                                        setIndicators(newIndicators)
                                    }}
                                    value={indicators?.[index]?.name}
                                >
                                    {indicatorsTA.map(indicator => (
                                        <option
                                            key={indicator.id}
                                            value={indicator.name}
                                        >
                                            {`${indicator.label} (${indicator.name})`}
                                        </option>
                                    ))}
                                </select>
                            )}
                        />
                        <button
                            type='button'
                            onClick={() => remove(index)}
                        >
                            DELETE
                        </button>
                    </section>
                    <ConditionField
                        index={index}
                        register={register}
                    />
                </div>
            ))}
            <button
                type='button'
                onClick={() =>
                    append({
                        // an empty object will render an empty <input />
                        name: '',
                        parameters: [],
                        condition: {
                            name: '',
                            change: '',
                            value: '',
                            unit: ''
                        }
                    })
                }
            >
                APPEND
            </button>
        </>
    )
}

function MyForm() {
    const { control, handleSubmit, onSubmit, register } = useFormData()

    const [indicators, setIndicators] = useState<IndicatorModel[]>([])

    useEffect(() => {
        clientApi.get('/indicators/').then(res => {
            const indicatorsData = res.data as []

            // Parse indicators
            const thisIndicators = indicatorsData.map((indicator: IndicatorModel) => {
                // Parse parameters
                const parameters = indicator.parameters.map((parameter: ParameterModel) => {
                    return {
                        ...parameter,
                        type: ParameterType[parameter.type as unknown as keyof typeof ParameterType]
                    } as ParameterModel
                })

                // Parse returns
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const returns = indicator.returns?.map((ret: any) => {
                    return {
                        ...ret,
                        value: ret.name
                    } as ReturnModel
                })

                // Return parsed Indicator Model
                return {
                    ...indicator,
                    parameters,
                    returns
                } as unknown as IndicatorModel
            })

            // Set indicators
            setIndicators(thisIndicators)
        })
    }, [])

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='p-4 space-y-4'
        >
            <Symbol control={control} />
            <TimeFrame control={control} />
            <TelegramUser control={control} />
            <Indicators
                control={control}
                register={register}
                indicatorsTA={indicators}
            />

            <button
                type='submit'
                className='px-4 py-2 text-white bg-blue-500 rounded-md'
            >
                Submit
            </button>
        </form>
    )
}

export default MyForm
