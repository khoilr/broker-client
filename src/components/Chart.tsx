import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Tooltip
} from 'chart.js'

import StockPriceModel from '@/model/StockPrices'
import { Bar, Line } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import axios from 'axios'

// Having no idea what are these but without them, the code won't run :D
ChartJS.register(LineElement, PointElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

// Configuration options for the line chart
const options = {
    scales: {
        x: {
            grid: {
                display: false
            }
        }
    }
}

interface props {
    symbol: string
    timeFrame: string
}

export default function Chart(props: props) {
    const { symbol, timeFrame } = props

    const [price, setPrice] = useState<StockPriceModel>()
    const [averages, setAverages] = useState<number[]>([])

    useEffect(() => {
        axios
            .get('http://localhost:8000/prices', {
                params: {
                    symbol,
                    timeframe: timeFrame
                }
            })
            .then(res => {
                setPrice(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [symbol, timeFrame])
    useEffect(() => {
        const arrayLength = price?.close.length || 0
        const averages = []

        for (let i = 0; i < arrayLength; i += 1) {
            const closeValue = price?.close[i] || 0
            const openValue = price?.open[i] || 0
            const highValue = price?.high[i] || 0
            const lowValue = price?.low[i] || 0

            const rowAverage = (closeValue + openValue + highValue + lowValue) / 4

            averages.push(rowAverage)
        }
        console.log(averages)

        setAverages(averages)
    }, [price])

    return (
        <>
            <Line
                options={options}
                data={{
                    labels: price?.datetime,
                    datasets: [
                        {
                            data: averages,
                            borderColor: '#084de0',
                            borderWidth: 1,
                            pointRadius: 1,
                            pointHoverRadius: 1
                        }
                    ]
                }}
            />
            <Bar
                data={{
                    labels: price?.datetime,
                    datasets: [
                        {
                            label: 'Volume',
                            data: price?.volume,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)'
                        }
                    ]
                }}
                options={options}
            />
        </>
    )
}
