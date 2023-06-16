import { clientApi } from '@/lib/axios'
import StockPriceModel from '@/model/StockPrices'
import { useEffect, useState } from 'react'
import {
    Bar,
    BarChart,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts'

// Having no idea what are these but without them, the code won't run :D
// ChartJS.register(LineElement, PointElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

interface props {
    symbol: string
    timeFrame: string
}

export default function Chart(props: props) {
    const { symbol, timeFrame } = props

    const [price, setPrice] = useState<StockPriceModel[]>()

    // call api to get price
    useEffect(() => {
        // if both symbol and timeFrame are not set, return
        if (!(symbol && timeFrame)) {
            return
        }

        clientApi
            .get('prices/', {
                params: {
                    symbol,
                    time_frame: timeFrame
                }
            })
            .then(res => {
                const prices = res.data

                const data = prices.map((price: StockPriceModel) => {
                    return {
                        ...price,
                        // average with rounded to 2 decimal places
                        average: Math.round(((price.close + price.open + price.high + price.low) / 4) * 100) / 100
                    }
                })
                setPrice(data)
            })
    }, [symbol, timeFrame])

    return (
        <div className='w-full h-auto'>
            <ResponsiveContainer height={480}>
                <ComposedChart
                    data={price}
                    height={480}
                    title={symbol}
                    syncId={symbol}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                        dataKey='datetime'
                        minTickGap={32}
                    />
                    <YAxis
                        yAxisId='left'
                        orientation='left'
                        stroke='rgb(75, 192, 192)'
                    />
                    {/* <YAxis
                        yAxisId='right'
                        orientation='right'
                        stroke='rgba(255, 99, 132, 1)'
                    /> */}
                    <Tooltip />
                    <Legend />
                    <Line
                        yAxisId='left'
                        type='monotone'
                        dataKey='average'
                        name='Price'
                        stroke='rgb(75, 192, 192)'
                        dot={false}
                    />
                    {/* <Bar
                        yAxisId='right'
                        dataKey='volume'
                        name='Volume'
                        fill='rgba(255, 99, 132, 1)'
                    /> */}
                </ComposedChart>
            </ResponsiveContainer>
            <ResponsiveContainer height={320}>
                <BarChart
                    height={320}
                    data={price}
                    syncId={symbol}
                >
                    <Tooltip />
                    <Legend />
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                        dataKey='datetime'
                        minTickGap={32}
                    />
                    <YAxis
                        orientation='left'
                        stroke='rgb(75, 192, 192)'
                    />
                    <Bar
                        dataKey='volume'
                        name='Volume'
                        fill='rgb(75, 192, 192)'
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
