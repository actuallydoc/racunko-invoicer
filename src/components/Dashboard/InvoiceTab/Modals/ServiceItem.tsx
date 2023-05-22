import React from 'react'
import type { Service } from 'types'

export default function ServiceItem({ service, deleteCallBack }: { service: Service, deleteCallBack: (id: string) => void }) {
    const handleDelete = () => {
        deleteCallBack(service.id as string)
    }

    return (
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <span className="text-sm font-medium">{service.name}</span>
                <span className="text-xs text-gray-500">{service.description}</span>
            </div>
            <div className="flex items-center">
                <span className="text-sm font-medium">{service.price}</span>
                <button onClick={handleDelete} className="ml-2 text-red-500 hover:text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div>
                {/* Make a delete button */}
                <button onClick={handleDelete} className="ml-2 text-red-500 hover:text-red-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

        </div>

    )
}
