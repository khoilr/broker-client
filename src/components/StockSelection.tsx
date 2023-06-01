import { useState } from 'react'
import CompanyModel from '@/model/Company'
import { Form, Select } from 'antd'
import companiesJSON from '../data/companies.json'

interface props {
    setSymbol: (symbol: string) => void
}
export default function StockSelection(props: props) {
    const { setSymbol } = props

    const [companies] = useState<CompanyModel[]>(companiesJSON)

    return (
        <Form.Item
            name='stock'
            label='Stock'
            className='mx-2 w-full'
        >
            <Select
                showSearch
                placeholder='Select stock'
                optionFilterProp='children'
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                    (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
                }
                options={companies.map(e => {
                    return {
                        value: e.symbol,
                        label: `${e.symbol} - ${e.name}`
                    }
                })}
                onSelect={(value: string) => {
                    setSymbol(value)
                }}
            />
        </Form.Item>
    )
}
