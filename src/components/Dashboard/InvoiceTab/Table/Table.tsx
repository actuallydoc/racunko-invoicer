import React from 'react'
import type { Invoice } from 'types'
import TableItem from './TableItem'
import TableHeader from './TableHeader'




export default function Table({ Invoices }: { Invoices: Invoice[] | undefined }) {
    return (
        <table className="min-w-full">
            <thead>
                <TableHeader />
            </thead>
            <tbody>
                {Invoices?.map((invoice) => (
                    <TableItem key={invoice.id} invoice={invoice} />
                ))}
            </tbody>
        </table>
    )
}
