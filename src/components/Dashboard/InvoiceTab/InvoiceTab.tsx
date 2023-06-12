import React from 'react'
import Table from './Table/Table'
import type { Invoice, Company, Partner } from 'prisma/prisma-client'
import "flatpickr/dist/themes/material_green.css";
import { IoIosCreate } from 'react-icons/io';
import Flatpickr from "react-flatpickr";
import InvoiceCreateModal from './Modals/InvoiceCreateModal';
import InvoiceEditModal from './Modals/InvoiceEditModal';
import type { InvoiceSerialized } from 'types';
import { invoiceSlice } from '@/stores/invoiceSlice';
import { useDispatch } from 'react-redux';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
interface InvoiceTabProps {
    Companies: Company[];
    Customers: Partner[];
}
export default function InvoiceTab({ Companies, Customers }: InvoiceTabProps) {
    const [fromDate, setFromDate] = React.useState<Date>(new Date());
    const [toDate, setToDate] = React.useState<Date>(new Date());

    const invoiceDispatch = useDispatch();
    const [invoiceState, setInvoiceState] = React.useState<Invoice>({} as Invoice)
    const [editInvoice, setEditInvoice] = React.useState<boolean>(false)
    const handleInvoiceClick = (invoice: Invoice) => {
        invoiceDispatch(invoiceSlice.actions.editInvoice({
            item: invoice as InvoiceSerialized,
        }))
        setEditInvoice(true);
    };

    //Create modal for creating new invoice
    const [showCreateModal, setCreateShowModal] = React.useState(false);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    return (
        <div className="min-h-screen flex items-center ml-10">
            {showCreateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <InvoiceCreateModal invoiceData={invoiceState} companies={Companies} customers={Customers} invoiceState={setInvoiceState} setShowModal={setCreateShowModal} />
                </div>
            )}
            {editInvoice && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <InvoiceEditModal setShowModal={setEditInvoice} companies={Companies} customers={Customers} />
                </div>
            )}
            <div className="w-10/12 h-[850px] mb-16 bg-[#030610] rounded-3xl p-4 border-slate-400 border">
                <div className='flex space-x-5 '>
                    <div className='flex space-x-5'>
                        <div>
                            {/* <input type="text" onChange={handleFilter} placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" /> */}
                        </div>

                        <Popover>
                            <PopoverTrigger asChild className='dark text-slate-400'>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !fromDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={fromDate}
                                    onSelect={(date) => setFromDate(date as unknown as Date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>


                        <div className='pt-2 text-slate-400'>
                            <p>to</p>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild className='dark text-slate-400'>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !toDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={toDate}
                                    onSelect={(date) => setToDate(date as unknown as Date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>

                        <div className='w-auto flex space-x-3'>
                            <div>
                                <Button variant={'outline'} onClick={handleOpenCreateModal} className='flex space-x-5 text-slate-400  p-3 '>
                                    <div>
                                        <p>Create</p>
                                    </div>
                                    <div className='pt-1'>
                                        <IoIosCreate />
                                    </div>

                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-5'>
                    <Table handleInvoiceClick={handleInvoiceClick} />
                </div>
            </div>
        </div>
    )
}



