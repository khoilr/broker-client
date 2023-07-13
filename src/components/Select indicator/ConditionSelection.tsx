import { Select } from 'antd'
import ReturnModel from '@/model/Return'
import { BaseOptionType } from 'antd/es/select'
import { useEffect, useState } from 'react'

type props = {
    returns: ReturnModel[]
}
export default function ConditionSelection(props: props) {
    const { returns } = props

    const [returnOptions, setReturnOptions] = useState<BaseOptionType[]>([])
    const [initialReturn, setInitialReturn] = useState<BaseOptionType>()

useEffect(() => {
        const thisReturn = returns.map(e => e as BaseOptionType)
        setReturnOptions(thisReturn)
        setInitialReturn(thisReturn[0])
    }, [returns])

return (
        <Select
            showSearch
            placeholder='Select return'
            optionFilterProp='children'
            filterOption={(input, option) =>
                (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
            }
            filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? '').toLowerCase())
            }
            options={returnOptions}
            value={initialReturn}
        />
    )
}
