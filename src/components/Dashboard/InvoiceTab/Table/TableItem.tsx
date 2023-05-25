import React, { useEffect } from 'react'
import type { InvoiceJSON, InvoiceObject, Service } from 'types'

export default function TableItem({ invoice, handleInvoiceClick }: { invoice: InvoiceObject, handleInvoiceClick: (invoice: InvoiceObject) => void }) {

    const [total, setTotal] = React.useState<number>(0)

    const handleItemClick = (invoice: InvoiceObject) => {
        handleInvoiceClick(invoice)
    }
    useEffect(() => {
        console.log(invoice)
        const calculateTotal = () => {
            let total = 0
            invoice.services?.map((service: Service) => {
                if (service.price) {
                    total += Number(service.price)
                }
            })
            setTotal(total)
        }
        calculateTotal()
    }, [invoice])


    return (
        <tr key={invoice.id} onClick={() => handleItemClick(invoice)} className='cursor-pointer overflow-x-hidden hover:translate-x-2 duration-200'>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="flex items-center">
                    <div>
                        <div className="text-sm leading-5 font-medium text-gray-900">
                            {invoice.invoiceNumber}
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {invoice?.Partner?.name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <div className="text-sm leading-5 text-gray-900">
                    {invoice.Company?.name}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {invoice.createdAt?.toLocaleDateString()}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">
                {invoice.dueDate?.toLocaleDateString()}
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {invoice.status}
                </span>
            </td>
            <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 text-gray-500">

                {total} €
            </td>
        </tr>
    )
}
