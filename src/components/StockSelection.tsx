import { Form, Select } from 'antd'
import companiesJSON from '../data/companies.json'
import CompanyModel from '@/model/Company'
import { useState } from 'react'

export default function StockSelection() {
    const [companies, setCompanies] = useState<CompanyModel[]>(companiesJSON)

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
                filterOption={(input, option) =>
                    (option?.label ?? '')
                        .toLowerCase()
                        .includes(input.toLowerCase())
                }
                filterSort={(optionA, optionB) =>
                    (optionA?.value ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.value ?? '').toLowerCase())
                }
                options={companies.map(e => {
                    return {
                        value: e.symbol,
                        label: `${e.symbol} - ${e.name}`
                    }
                })}
            />
        </Form.Item>
    )
}
