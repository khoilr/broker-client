// import {
//     BarElement,
//     CategoryScale,
//     Chart as ChartJS,
//     Legend,
//     LineElement,
//     LinearScale,
//     PointElement,
//     Tooltip,
//     ChartData
// } from 'chart.js'
import { Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts'
import StockPriceModel from '@/model/StockPrices'
// import { Bar, Line, Chart as ChartJS2 } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
        axios
            .get('http://localhost:8000/prices', {
                params: {
                    symbol,
                    timeframe: timeFrame
                }
            })
            .then(res => {
                const prices = res.data
                const data = prices.map((price: StockPriceModel) => {
                    return {
                        ...price,
                        average: (price.close + price.open + price.high + price.low) / 4
                    }
                })
                setPrice(data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [symbol, timeFrame])

    return (
        <>
            <div className='w-full h-80'>
                <ResponsiveContainer height={320}>
                    <ComposedChart
                        data={price}
                        height={320}
                        title={symbol}
                    >
                        <CartesianGrid strokeDasharray='3 3' />
                        <XAxis
                            dataKey='datetime'
                            minTickGap={16}
                        />
                        <YAxis
                            yAxisId='left'
                            orientation='left'
                            stroke='rgb(75, 192, 192)'
                        />
                        <YAxis
                            yAxisId='right'
                            orientation='right'
                            stroke='rgba(255, 99, 132, 1)'
                        />
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
                        <Bar
                            yAxisId='right'
                            dataKey='volume'
                            name='Volume'
                            fill='rgba(255, 99, 132, 1)'
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            </div>

            {/* <Line
                data={{
                    labels: price?.datetime,
                    datasets: [
                        {
                            label: 'Price',
                            data: averages,
                            borderColor: 'rgb(75, 192, 192)',
                            tension: 0.4,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)'
                        }
                    ]
                }}
                options={commonOptions}
            />
            <Bar
                data={{
                    labels: price?.datetime,
                    datasets: [
                        {
                            label: 'Volume',
                            data: price?.volume,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }
                    ]
                }}
                options={{
                    ...commonOptions,
                    indexAxis: 'x',
                    plugins: {
                        ...commonOptions.plugins,
                        tooltip: {}
                    }
                }}
            /> */}
        </>
    )
}
