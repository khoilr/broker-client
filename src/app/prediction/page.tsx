'use client'
import React, { useState, useEffect } from 'react';
import { clientApi } from '@/lib/axios'
import Nav from '@/components/Navigation'
import PredTag from '@/components/Trend'
import { Form } from 'antd'
import options from '../../data/options.json';



interface Option {
  value: string;
  label: string;
}


export default function HomePage() {
    const [symbol, setSymbol] = useState('')
    const [probability, setProbability] = useState(0)
    const [selectionOptions, setSelectionOptions] = useState<Option[]>([]);
    const [form] = Form.useForm()
    const stockWatcher = Form.useWatch('stock', form)
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
                setSymbol(stock_select)
                const response = await clientApi.get('/predict', {
                    params: {
                        symbol: stock_select
                    }
                })
                const { data } = response
                setProbability(data.probability)
            } catch (error) {
                console.error(error)
            }
        }

        fetchData()
    }, [selectedValue])
    return (
        <>
            <Nav />
            <div className='min-h-full bg-gray-200'>
                <div className='p-4 grid md:grid-cols-4 grid-cols-1 gap-4'>
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
                                        Trend
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                                    >
                                        Confidence level
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200'>
                                <PredTag
                                    stock={symbol}
                                    probability={probability}
                                />
                            </tbody>
                        </table>
                    </div>
                    <div>
                      <h1 className='px-4'>Select stock</h1>
    <select onChange={(e) => setSelectedValue(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300">

      {selectionOptions.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
                    </div>
                </div>
            </div>
        </>
    )
}
