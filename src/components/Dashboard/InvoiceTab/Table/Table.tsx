import React from 'react'
import type { InvoiceObject } from 'types'
import TableItem from './TableItem'
import TableHeader from './TableHeader'




export default function Table({ Invoices }: { Invoices: InvoiceObject[] | undefined }) {

    return (
        <div className="max-h-[770px] overflow-y-scroll">
            <table className="min-w-full">
                <thead>
                    <TableHeader />
                </thead>
                <tbody >
                    {Invoices?.map((invoice) => (
                        <TableItem key={invoice.id} invoice={invoice} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}
