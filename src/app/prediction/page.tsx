'use client'

import Nav from '@/components/Navigation'
import PredTag from '@/components/Trend'

export default function HomePage() {
    return (
        <>
            <Nav />
            <div className='min-h-full bg-gray-200'>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Symbol name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Trend
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Confidence level
            </th>
            {/* Add more th elements for additional columns */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200"><PredTag
                    stock={"VN INDEX"}
                    probability={0.65}
                    />
        <PredTag
                    stock={"VN INDEX"}
                    probability={0.4}
                    />
        </tbody>
      </table>
    </div>
            </div>
        </>
    )
}
