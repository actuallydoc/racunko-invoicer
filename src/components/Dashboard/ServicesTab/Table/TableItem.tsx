import React from 'react'
import type { Service } from 'types'

export default function TableItem({ service, editService }: { service: Service, editService: (service: Service) => void }) {
    const handleEditPartner = () => {
        editService(service);
    }

    return (
        <tr key={service.id} onClick={handleEditPartner} className='cursor-pointer hover:scale-x-105 duration-200'>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm leading-5 font-medium text-gray-900">
                            {service.name}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {service.price}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {service.description}
                </div>
            </td>

        </tr>
    )
}
