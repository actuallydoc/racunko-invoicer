import React, { useEffect } from 'react'
import TableItem from './TableItem'
// import TableHeader from './TableHeader'
import type { Invoice } from '@prisma/client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from 'react-redux';
import { type RootState } from '@/stores/invoiceSlice';
export default function TableComponent({ handleInvoiceClick }: { handleInvoiceClick: (invoice: Invoice) => void }) {
  const invoiceSelector = useSelector((state: RootState) => state.items);
  useEffect(() => {
    console.log(invoiceSelector)
  }, [invoiceSelector])
  return (
    <div>
      <Table >
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Invoice Number</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoiceSelector?.map((invoice) => (
            <TableRow key={invoice.id} onClick={() => handleInvoiceClick(invoice)} className='hover:cursor-pointer'>
              <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
              <TableCell>{invoice.Partner.name}</TableCell>
              <TableCell>{invoice.Company.name}</TableCell>
              <TableCell>{invoice.invoiceDate.toISOString().toString()}</TableCell>
              <TableCell>{invoice.dueDate.toISOString().toString()}</TableCell>
              <TableCell>{invoice.status}</TableCell>
              <TableCell className="text-right">{invoice.id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    // <div className="max-h-[770px] overflow-y-scroll overflow-x-hidden">
    //   <table className="min-w-full">
    //     <thead>
    //       <TableHeader />
    //     </thead>
    //     <tbody >
    //       {Invoices?.map((invoice) => (
    //         <TableItem handleInvoiceClick={handleInvoiceClick} key={invoice.id} invoice={invoice} />
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

  )
}
