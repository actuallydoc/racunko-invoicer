import React from 'react'
import { Invoice } from 'types'


const HeaderNames = [
    "Invoice Number",
    "Customer",
    "Company",
    "Date",
    "Due Date",
    "Status",
    "Total",
]

export default function Table({ Invoices }: { Invoices: Invoice[] }) {
    return (
        <table className="min-w-full">
            <thead>
                <tr>
                    {HeaderNames.map((name) => (
                        <th
                            key={name}
                            className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                        >
                            {name}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Invoices?.map((invoice) => (
                    <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="flex items-center">
                                <div>
                                    <div className="text-sm leading-5 font-medium text-gray-900">
                                        {invoice.id}
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                                {invoice.partner.name}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <div className="text-sm leading-5 text-gray-900">
                                {invoice.company.name}
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {invoice.createdAt.toString()}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            {invoice.dueDate.toString()}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {invoice.status}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                            {invoice.services.reduce(
                                (acc, service) => acc + service.price,
                                0
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
