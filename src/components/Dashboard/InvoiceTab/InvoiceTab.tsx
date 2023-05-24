import React from 'react'
import Table from './Table/Table'
import type { InvoiceObject, Service, Company, Partner } from 'types'
import "flatpickr/dist/themes/material_green.css";
import { IoIosCreate } from 'react-icons/io';
import Flatpickr from "react-flatpickr";
import InvoiceCreateModal from './Modals/InvoiceCreateModal';
interface InvoiceTabProps {
    Invoices: (InvoiceObject | undefined);
    handleCreateInvoice: (invoice: InvoiceObject) => void;
    Companies: Company[] | undefined;
    Customers: Partner[] | undefined;
    Services: Service[] | undefined;
}
export default function InvoiceTab({ Invoices, Services, handleCreateInvoice, Companies, Customers }: InvoiceTabProps) {
    const [fromDate, setFromDate] = React.useState<Date | null>(new Date());
    const [toDate, setToDate] = React.useState<Date | null>(new Date());
    //!TODO FILTER
    // const [filteredInvoices, setFilteredInvoices] = React.useState<Invoice[]>([]);

    const [invoiceState, setInvoiceState] = React.useState<InvoiceObject>({} as InvoiceObject)

    //Create modal for creating new invoice
    const [showCreateModal, setCreateShowModal] = React.useState(false);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    const handleCreateInvoiceCb = () => {
        setCreateShowModal(false);
        console.log(invoiceState);
        handleCreateInvoice(invoiceState);
    };


    return (
        <div className="min-h-screen flex items-center ml-10">
            {showCreateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <InvoiceCreateModal services={Services as Service[]} invoiceData={invoiceState} companies={Companies as Company[]} customers={Customers as Partner[]} handleCreateInvoice={handleCreateInvoiceCb} invoiceState={setInvoiceState} setShowModal={setCreateShowModal} />
                </div>
            )}
            <div className="w-10/12 h-[850px] mb-16 bg-white rounded-3xl p-4 border-4">
                <div className='flex space-x-5 '>
                    <div className='flex space-x-5'>
                        <div>
                            <input type="text" placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" />
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
                    <Table Invoices={Invoices as InvoiceObject[] | undefined} />
                </div>
            </div>
        </div>
    )
}



