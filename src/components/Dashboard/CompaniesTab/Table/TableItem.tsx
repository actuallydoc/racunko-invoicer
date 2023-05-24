import React from 'react'
import type { Company } from 'types'

export default function TableItem({ company, editCompany }: { company: Company, editCompany: (company: Company) => void }) {
    const handleEditPartner = () => {
        editCompany(company);
    }
    return (
        <tr key={company.id} onClick={handleEditPartner} className='cursor-pointer hover:translate-x-2 duration-200'>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm leading-5 font-medium text-gray-900">
                            {company.name}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {company.address}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {company.country}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                {company.city}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                {company.zip}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {company.phone}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                {company.email}
            </td>
        </tr>
    )
}
