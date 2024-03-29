'use client'

import React, { useState, useEffect } from 'react';
import { clientApi } from '@/lib/axios'
import PredTag from '@/components/Trend'
import { Form, Select, Space } from 'antd'
import Nav from '@/components/Navigation/Navigation'
import options from '../../data/options.json';

interface Option {
  value: string;
  label: string;
}

export default function Prediction() {
    const [symbol, setSymbol] = useState('VN30')
    const [probability_day, setProbability_day] = useState(0)
    const [probability_week, setProbability_week] = useState(0)
    const [selectionOptions, setSelectionOptions] = useState<Option[]>([]);
    const [form] = Form.useForm()
    // const stockWatcher = Form.useWatch('stock', form)
    const [selectedValue, setSelectedValue] = useState(options[0].label);

    useEffect(() => {
      const fetchOptions = async () => {
        try {
          // Set the options directly since they are already imported from the JSON file
          setSelectionOptions(options);
        } catch (error) {
          console.error('Error loading options:', error);
        }
      };
      fetchOptions();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const stock_select = selectedValue
                const response = await clientApi.get('/predict', {
                    params: {
                        symbol: selectedValue
                    }
                })
                const { data } = response
                setSymbol(stock_select)
                setProbability_day(data.probability_day)
                setProbability_week(data.probability_week)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [selectedValue])

     const handleProvinceChange = () => {
         setSelectedValue(options[0].label)
     }
    return (
        <>
            <Nav />
            <div className='flex items-center justify-center w-full px-20 text-center min-h-screen py-2 bg-gray-200'>
                <div className='p-4 flex gap-4'>
                    <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Symbol name
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Trend next day
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Day confidence level
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Trend next week
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Week confidence level
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                <PredTag
                                    stock={symbol}
                                    probability_day={probability_day}
                                    probability_week={probability_week}
                                />
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h1 className='px-8 pb-4 pt-2'>Select stock</h1>
                        {/* <select
                            onChange={e => setSelectedValue(e.target.value)}
                            defaultValue='VN30'
                            className='px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300'
                        >
                            {selectionOptions.map((option: Option) => (
                                <option
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select> */}

                        <Space wrap>
                            <Select
                                defaultValue='VN30'
                                style={{ width: 120 }}
                                onChange={handleProvinceChange}
                                options={selectionOptions.map(option => ({ key: option.value, value: option.value }))}
                            />
                        </Space>
                    </div>
                </div>
            </div>
        </>
    )
}
