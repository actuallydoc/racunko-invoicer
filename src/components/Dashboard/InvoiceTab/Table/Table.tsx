import React from 'react'
import TableItem from './TableItem'
import TableHeader from './TableHeader'
import { Invoice } from '@prisma/client'
export default function Table({ Invoices, handleInvoiceClick }: { Invoices: Invoice[] | undefined, handleInvoiceClick: (invoice: Invoice) => void }) {
  return (
    <div className="max-h-[770px] overflow-y-scroll overflow-x-hidden">
      <table className="min-w-full">
        <thead>
          <TableHeader />
        </thead>
        <tbody >
          {Invoices?.map((invoice) => (
            <TableItem handleInvoiceClick={handleInvoiceClick} key={invoice.id} invoice={invoice} />
          ))}
        </tbody>
      </table>
    </div>

  )
}
