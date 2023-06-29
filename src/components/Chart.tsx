/* eslint-disable @typescript-eslint/no-explicit-any */
import { clientApi } from '@/lib/axios'
import StockModel from '@/model/Stock'
import StockPriceModel from '@/model/StockPrices'
import EChartsReact from 'echarts-for-react'
import { useEffect, useState } from 'react'
import { EChartsOption } from 'echarts'

interface props {
    stock: StockModel
}

const upColor = '#ec0000'
const downColor = '#00da3c'

export default function Chart(props: props) {
    const { stock } = props

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
            top: 10,
            left: 'center',
            data: []
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

                obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
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
                height: '50%'
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
                start: 98,
                end: 100
            }
            // {
            //   show: true,
            //   xAxisIndex: [0, 1],
            //   type: 'slider',
            //   top: '85%',
            //   start: 98,
            //   end: 100
            // }
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
                    formatter: (params: TooltipFormatterParams) => {
                        const param = params[0]
                        return [
                            `Date: ${param.name}<hr size=1 style="margin: 3px 0">`,
                            `Open: ${param.data[0]}<br/>`,
                            `Close: ${param.data[1]}<br/>`,
                            `Low: ${param.data[2]}<br/>`,
                            `High: ${param.data[3]}<br/>`
                        ].join('')
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
                    color(param: { dataIndex: number; data: any[] }) {
                        return data.values[param.dataIndex][1] > data.values[param.dataIndex][0] ? upColor : downColor
                    }
                }
            }
        ]
    }

    // const [option, setOption] = useState<EChartsOption>(

    useEffect(() => {
        if (!stock.symbol) return

        clientApi
            .get('/prices/daily/', {
                params: {
                    symbol: stock.symbol,
                    orient: 'records'
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
                    const { date, open, close, low, high, volume } = resData[i]
                    categoryData.push(date)
                    values.push([open, close, low, high])
                    volumes.push([i, volume, close > open ? 1 : -1])
                }

                // Set data to state
                setData({
                    categoryData,
                    values,
                    volumes
                })
            })
    }, [stock.symbol])

    // useEffect(() => {
    //     // setOption((prev: EChartsOption) => {
    //     //     const newOption = { ...prev }
    //     //     newOption.legend.data[0] = stock.name
    //     //     newOption.series[0].name = stock.symbol

    //     //     // console.log(newOption)
    //     //     // console.log(stock.name)
    //     //     // console.log(stock.symbol)
    //     //     return newOption as EChartsOption
    //     // })
    // }, [data, stock.name, stock.symbol])
    return (
        <div className='w-full md:col-span-3 relative lg:h-[70vh] h-full p-4 border rounded-lg bg-white'>
            <EChartsReact
                option={option}
                style={{
                    height: '100%'
                }}
            />
        </div>
    )
}
