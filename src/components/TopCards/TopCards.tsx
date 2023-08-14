import React from 'react'

function TopCards() {
    return (
        <div className='grid lg:grid-cols-3 gap-4 p-4'>
            <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>$17,000</p>
                    <p className='text-gray-500'>Daily Revenue</p>
                </div>
                <div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+20%</span>
                    </p>
                </div>
            </div>
            <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>$17,000</p>
                    <p className='text-gray-500'>Daily Revenue</p>
                </div>
                <div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+20%</span>
                    </p>
                </div>
            </div>
            <div className='lg:col-span-1 col-span-1 bg-white flex justify-between w-full border p-4 rounded-lg'>
                <div className='flex flex-col w-full pb-4'>
                    <p className='text-2xl font-bold'>$17,000</p>
                    <p className='text-gray-500'>Daily Revenue</p>
                </div>
                <div>
                    <p className='bg-green-200 flex justify-center items-center p-2 rounded-lg'>
                        <span className='text-green-700 text-lg'>+20%</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TopCards
