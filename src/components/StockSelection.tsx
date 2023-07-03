import { clientApi } from '@/lib/axios'
import StockModel from '@/model/Stock'
import { Form, Select } from 'antd'
import { useEffect, useState } from 'react'

interface props {
    setStock: (stock: StockModel) => void
}

export default function StockSelection(props: props) {
    const { setStock } = props

    const [stocks, setStocks] = useState<StockModel[]>([])

    useEffect(() => {
        clientApi.get('/stocks/').then(res => {
            const stocksData = res.data

            // rename en_name to enName
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const thisStocks = stocksData.map((stock: any) => {
                return {
                    ...stock,
                    enName: stock.en_name
                } as StockModel
            })

            setStocks(thisStocks)
        })
    }, [])

    return (
        <Form.Item
            name='stock'
            label='Select stock'
            className='w-full'
            rules={[
                {
                    required: true,
                    message: 'Please select a stock'
                }
            ]}
        >
            <Select
                showSearch
                placeholder='Select stock'
                optionFilterProp='children'
                filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                    (optionA?.value ?? '').toLowerCase().localeCompare((optionB?.value ?? '').toLowerCase())
                }
                options={stocks.map(e => {
                    return {
                        value: `${e.symbol} - ${e.market}`,
                        label: `${e.symbol} - ${e.market} - ${e.name}`
                    }
                })}
                onSelect={(value: string) => {
                    const [symbol, market] = value.split('-')
                    const stock = stocks.find(e => e.symbol === symbol.trim() && e.market === market.trim())
                    setStock(stock as StockModel)
                }}
            />
        </Form.Item>
    )
}
