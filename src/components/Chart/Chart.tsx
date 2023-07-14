/* eslint-disable @typescript-eslint/no-explicit-any */
import { clientApi } from '@/lib/axios'
import StockModel from '@/model/Stock'
import StockPriceModel from '@/model/StockPrices'
import EChartsReact from 'echarts-for-react'
import { useEffect, useState } from 'react'
import { EChartsOption } from 'echarts'

interface props {
    stock: StockModel
    lines: any
}

const downColor = '#ec0000'
const upColor = '#00da3c'

export default function Chart(props: props) {
    const { stock, lines } = props
    const [thisLines, setThisLines] = useState<any>([{ data: [] }])
    const [names, setNames] = useState<string[]>([])
    const [series, setSeries] = useState<any[]>([{}])

    useEffect(() => {
        // if lines if not empty
        if (lines && lines.length > 0) {
            setThisLines(lines)
        }
    }, [lines])

    useEffect(() => {
        // get every name in every data in lines
        const thisNames = []
        for (let i = 0; i < thisLines.length; i += 1) {
            const line = thisLines[i]
            for (let j = 0; j < line.data.length; j += 1) {
                const data = line.data[j]
                thisNames.push(data.name)
            }
        }
        setNames(thisNames)

        // get every series in every data in lines
        // {
        //         name: stock.symbol,
        //         type: 'candlestick',
        //         data: data.values,
        //         itemStyle: {
        //             color: upColor,
        //             color0: downColor,
        //             borderColor: undefined,
        //             borderColor0: undefined
        //         },
        //         tooltip: {
        //             formatter(param) {
        //                 return `${param.name}<br>${param.data || ''}`
        //             }
        //         }
        //     },
        const thisSeries = []
        for (let i = 0; i < thisLines.length; i += 1) {
            const line = thisLines[i]
            for (let j = 0; j < line.data.length; j += 1) {
                const data = line.data[j]
                thisSeries.push({
                    name: data.name,
                    type: 'line',
                    data: data.data
                })
            }
        }
        setSeries(thisSeries)
    }, [thisLines])

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [data, setData] = useState<StockPriceModel>({
        categoryData: [],
        values: [],
        volumes: []
    })

    const option: EChartsOption = {
        animation: true,
        title: {
            left: 'center',
            text: stock.name
        },
        legend: {
            top: 35,
            left: 'center',
            data: names
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            },
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 8,
            textStyle: {
                color: '#000'
            },
            position(pos: number[], params: any, el: any, elRect: any, size: { viewSize: number[] }) {
                interface PositionObject {
                    top: number
                    [key: string]: number
                }

                const obj: PositionObject = {
                    top: 10
                }

                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 10
                return obj
            }
            // extraCssText: 'width: 170px'
        },
        axisPointer: {
            link: [
                {
                    xAxisIndex: 'all'
                }
            ],
            label: {
                backgroundColor: '#777'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: false
                },
                brush: {
                    type: ['lineX', 'clear']
                }
            }
        },
        brush: {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        },
        visualMap: {
            show: false,
            seriesIndex: 5,
            dimension: 2,
            pieces: [
                {
                    value: -1,
                    color: downColor
                },
                {
                    value: 1,
                    color: upColor
                }
            ]
        },
        grid: [
            {
                left: '5%',
                right: '5%',
                top: '12%',
                height: '60%'
            },
            {
                left: '5%',
                right: '5%',
                top: '80%',
                height: '16%'
            }
        ],
        xAxis: [
            {
                type: 'category',
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax',
                axisPointer: {
                    z: 100
                }
            },
            {
                type: 'category',
                gridIndex: 1,
                data: data.categoryData,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
            }
        ],
        series: [
            {
                name: stock.symbol,
                type: 'candlestick',
                data: data.values,
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: undefined,
                    borderColor0: undefined
                },
                tooltip: {
                    formatter(param) {
                        return `${param.name}<br>${param.data || ''}`
                    }
                }
            },
            {
                name: 'Volume',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: data.volumes,
                itemStyle: {
                    color(param) {
                        return data.values[param.dataIndex][1] > data.values[param.dataIndex][0] ? upColor : downColor
                    }
                }
            },
            ...series
        ]
    }

    useEffect(() => {
        if (!stock.symbol) return

        setIsLoading(true)
        clientApi
            .get('/price/daily/', {
                params: {
                    symbol: stock.symbol
                }
            })
            .then(res => {
                // Get data from response
                const resData = res.data

                // Create data for chart
                const categoryData: string[] = []
                const values: number[][] = []
                const volumes: number[][] = []

                // Add data to array
                for (let i = 0; i < resData.length; i += 1) {
                    const { TradingDate, Open, Close, Low, High, Volume } = resData[i]
                    categoryData.push(TradingDate)
                    values.push([Open, Close, Low, High])
                    volumes.push([i, Volume, Close > Open ? 1 : -1])
                }

                // Set data to state
                setData({
                    categoryData,
                    values,
                    volumes
                })
                setIsLoading(false)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stock.symbol])

    return (
        <div className='w-full md:col-span-3 relative lg:h-[70vh] h-full p-4 border rounded-lg bg-white'>
            <EChartsReact
                showLoading={isLoading}
                option={option}
                style={{
                    height: '100%'
                }}
            />
        </div>
    )
}
