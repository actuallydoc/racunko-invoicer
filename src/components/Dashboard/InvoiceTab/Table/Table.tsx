import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { type RootState, invoiceSlice } from '@/stores/invoiceSlice';
import type { InvoiceSerialized, Service } from 'types';
export default function TableComponent() {
  const [editInvoice, setEditInvoice] = React.useState<InvoiceSerialized | null>(null);
  const invoiceSelector = useSelector((state: RootState) => state.items);
  useEffect(() => {
    console.log(invoiceSelector)
  }, [invoiceSelector])
  const invoiceDispatch = useDispatch();
  const handleInvoiceClick = (invoice: InvoiceSerialized) => {
    invoiceDispatch(invoiceSlice.actions.editInvoice({
      item: invoice,
    }))
    setEditInvoice(invoice);
  }
  return (

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
        {invoiceSelector?.map((invoice, index) => (
          // FIXME: When you click on the table row, it should open the edit modal
          <TableRow key={index} onClick={() => handleInvoiceClick(invoice)} className='hover:cursor-pointer'>
            <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
            <TableCell>{invoice.Partner.name}</TableCell>
            <TableCell>{invoice.Company.name}</TableCell>
            <TableCell>{invoice.invoiceDate.toISOString().toString()}</TableCell>
            <TableCell>{invoice.dueDate.toISOString().toString()}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell className="text-right">
              {invoice.Services?.reduce((total: number, service: Service) => {
                if (service.price) {
                  return total + Number(service.price) * Number(service.quantity);
                }
                return total;
              }, 0)} $
              {/* TODO: Get the currency */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
