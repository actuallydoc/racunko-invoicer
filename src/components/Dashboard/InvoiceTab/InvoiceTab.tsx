import React from 'react'
import Table from './Table/Table'
import type { Invoice, Company, Partner } from 'prisma/prisma-client'
import "flatpickr/dist/themes/material_green.css";
import { IoIosCreate } from 'react-icons/io';
import Flatpickr from "react-flatpickr";
import InvoiceCreateModal from './Modals/InvoiceCreateModal';
import InvoiceEditModal from './Modals/InvoiceEditModal';
import type { InvoiceType } from 'types';
interface InvoiceTabProps {
    Invoices: (Invoice & {
        Company: Company;
        Partner: Partner;
    })[] | undefined;
    Companies: Company[];
    Customers: Partner[];
}
export default function InvoiceTab({ Invoices, Companies, Customers }: InvoiceTabProps) {
    const [fromDate, setFromDate] = React.useState<Date | null>(new Date());
    const [toDate, setToDate] = React.useState<Date | null>(new Date());

    const [invoiceState, setInvoiceState] = React.useState<Invoice>({} as Invoice)
    const [invoiceTemp, setInvoiceTemp] = React.useState<Invoice | undefined>(undefined)
    const [editInvoice, setEditInvoice] = React.useState<boolean>(false)
    const handleInvoiceClick = (invoice: Invoice) => {

        setInvoiceTemp(invoice)
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
                    <InvoiceEditModal setShowModal={setEditInvoice} companies={Companies} customers={Customers} invoiceData={invoiceTemp as InvoiceType} />
                </div>
            )}
            <div className="w-10/12 h-[850px] mb-16 bg-white rounded-3xl p-4 border-4">
                <div className='flex space-x-5 '>
                    <div className='flex space-x-5'>
                        <div>
                            {/* <input type="text" onChange={handleFilter} placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" /> */}
                        </div>
                        <div className='pt-2 ml-5 rounded-lg border-4'>
                            <Flatpickr
                                value={fromDate?.toString()}
                                onChange={([date]) => {
                                    setFromDate(date as Date);
                                }}
                            />
                        </div>
                        <div className='pt-2'>
                            <p>to</p>
                        </div>
                        <div className='pt-2 border-4 justify-center content-center text-center rounded-lg'>
                            <Flatpickr
                                value={toDate?.toString()}
                                onChange={([date]) => {
                                    setToDate(date as Date);
                                }}
                            />
                        </div>
                        <div className='w-auto flex space-x-3'>
                            <div>
                                <button onClick={handleOpenCreateModal} className='flex space-x-5 text-black bg-[#D8FAD6] hover:bg-[#0F570A] hover:text-white p-3 rounded-xl'>
                                    <div>
                                        <p>Create</p>
                                    </div>
                                    <div className='pt-1'>
                                        <IoIosCreate />
                                    </div>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <Table handleInvoiceClick={handleInvoiceClick} Invoices={Invoices} />
                </div>
            </div>
        </div>
    )
}



