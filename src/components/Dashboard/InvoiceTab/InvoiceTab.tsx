import React, { useEffect } from 'react'
import Table from './Table/Table'
import type { InvoiceObject, Service, Company, Partner } from 'types'
import "flatpickr/dist/themes/material_green.css";
import { IoIosCreate } from 'react-icons/io';
import Flatpickr from "react-flatpickr";
import InvoiceCreateModal from './Modals/InvoiceCreateModal';
import InvoiceEditModal from './Modals/InvoiceEditModal';
interface InvoiceTabProps {
    Invoices: (InvoiceObject[] | undefined);
    handleCreateInvoice: (invoice: InvoiceObject) => void;
    Companies: Company[] | undefined;
    Customers: Partner[] | undefined;
    Services: Service[] | undefined;
    handleDeleteInvoice: (invoice: InvoiceObject) => void;
    handleEditInvoice: (invoice: InvoiceObject) => void;
}
export default function InvoiceTab({ Invoices, Services, handleEditInvoice, handleCreateInvoice, handleDeleteInvoice, Companies, Customers }: InvoiceTabProps) {
    const [fromDate, setFromDate] = React.useState<Date | null>(new Date());
    const [toDate, setToDate] = React.useState<Date | null>(new Date());
    const [filteredInvoices, setFilteredInvoices] = React.useState<InvoiceObject[]>([]);
    const [invoiceState, setInvoiceState] = React.useState<InvoiceObject>({} as InvoiceObject)
    const [invoiceTemp, setInvoiceTemp] = React.useState<InvoiceObject | undefined>(undefined)
    const [editInvoice, setEditInvoice] = React.useState<boolean>(false)
    const handleInvoiceClick = (invoice: InvoiceObject) => {

        setInvoiceTemp(invoice)
        setEditInvoice(true);
    };
    const HandleEditInvoiceFn = (invoice: InvoiceObject) => {
        handleEditInvoice(invoice)
        setEditInvoice(false)
    }
    //Create modal for creating new invoice
    const [showCreateModal, setCreateShowModal] = React.useState(false);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    const handleCreateInvoiceCb = () => {
        setCreateShowModal(false);
        handleCreateInvoice(invoiceState);
    };
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = Invoices?.filter((invoice) => {
            if (invoice.invoiceNumber === null) return;
            return invoice.invoiceNumber.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredInvoices(filtered as InvoiceObject[]);
        console.log(filtered);
    };
    useEffect(() => {
        setFilteredInvoices(Invoices as InvoiceObject[]);
    }, [Invoices]);


    return (
        <div className="min-h-screen flex items-center ml-10">
            {showCreateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <InvoiceCreateModal services={Services as Service[]} invoiceData={invoiceState} companies={Companies as Company[]} customers={Customers as Partner[]} handleCreateInvoice={handleCreateInvoiceCb} invoiceState={setInvoiceState} setShowModal={setCreateShowModal} />
                </div>
            )}
            {editInvoice && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <InvoiceEditModal handleDeleteInvoice={handleDeleteInvoice} setShowModal={setEditInvoice} companies={Companies as Company[]} customers={Customers as Partner[]} invoiceData={invoiceTemp as InvoiceObject} handleEditInvoice={HandleEditInvoiceFn} invoiceState={setInvoiceTemp} services={Services as Service[]} />
                </div>
            )}
            <div className="w-10/12 h-[850px] mb-16 bg-white rounded-3xl p-4 border-4">
                <div className='flex space-x-5 '>
                    <div className='flex space-x-5'>
                        <div>
                            <input type="text" onChange={handleFilter} placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" />
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
                    <Table handleInvoiceClick={handleInvoiceClick} Invoices={filteredInvoices as InvoiceObject[] | undefined} />
                </div>
            </div>
        </div>
    )
}



