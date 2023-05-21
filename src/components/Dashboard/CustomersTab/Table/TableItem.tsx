import React from 'react'
import type { Partner } from 'types'

export default function TableItem({ partner, editPartner }: { partner: Partner, editPartner: (partner: Partner) => void }) {
    const handleEditPartner = () => {
        editPartner(partner);
    }
    return (
        <tr key={partner.id} onClick={handleEditPartner} className='cursor-pointer hover:scale-x-105 duration-200'>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm leading-5 font-medium text-gray-900">
                            {partner.name}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {partner.address}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {partner.country}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {partner.city}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                {partner.zip}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {partner.phone}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                {partner.email}
            </td>
        </tr>
    )
}
