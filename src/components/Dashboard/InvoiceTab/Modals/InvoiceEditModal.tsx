import React, { useEffect, useState } from 'react'

import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import generatePDFInvoice from '@/utils/invoicer';
import type { Company, Partner } from '@prisma/client';
import { api } from '@/utils/api';
import type { InvoiceType, Service } from 'types';
import { toast } from 'react-toastify';
import ServiceItem from './ServiceItem';

// TODO: Fix date input's they r trippin out

export default function InvoiceEditModal({ customers, companies, invoiceData, setShowModal }: {
    invoiceData: InvoiceType | undefined, customers: Partner[], companies: Company[], setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const editInvoice = api.invoice.editInvoice.useMutation();
    const deleteInvoice = api.invoice.deleteInvoice.useMutation();
    const [selectedCustomer, setSelectedCustomer] = useState<Partner>(invoiceData?.Partner as Partner);
    const [selectedCompany, setSelectedCompany] = useState<Company>(invoiceData?.Company as Company);
    const [tempInvoice, setTempInvoice] = useState<InvoiceType>(invoiceData as InvoiceType);
    const [services, setServices] = useState<Service[]>(JSON.parse(invoiceData?.services as string) as unknown as Service[]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTempInvoice((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
            Company: {
                ...prevState.Company as Company,
            },
            Partner: {
                ...prevState.Partner as Partner,
            },
        }))
    }
    const handleGenerateInvoice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //Create a Blob and open it in a new window
        //!TODO This is curently not working the template is broken
        e.preventDefault();
        const blob = generatePDFInvoice(invoiceData);
        console.log("Blob is: ",);
        window.open(blob, "_blank")
    }
    const handleEditInvoice = () => {
        editInvoice.mutate({
            companyId: selectedCompany?.id,
            dueDate: tempInvoice.dueDate,
            id: tempInvoice?.id,
            invoiceDate: tempInvoice?.invoiceDate,
            invoiceNumber: tempInvoice?.invoiceNumber,
            invoiceServiceDate: tempInvoice?.invoiceServiceDate,
            partnerId: selectedCustomer?.id,
            services: tempInvoice?.services as string,
        }, {
            onSuccess: () => {
                setTempInvoice({} as InvoiceType)
                toast.success("Invoice edited successfully")
                setShowModal(false)
            }
        });
    }
    const handleDeleteInvoice = () => {
        deleteInvoice.mutate({
            id: tempInvoice?.id,
        }, {
            onSuccess: () => {
                toast.success("Invoice deleted successfully")
                setShowModal(false)
            }
        })
    }
    const handleDueDate = (e: Date) => {
        setTempInvoice((prevState) => ({
            ...prevState,
            dueDate: e,
        }))
    }
    const handleServiceDate = (e: Date) => {
        setTempInvoice((prevState) => ({
            ...prevState,
            invoiceServiceDate: e,
        }))
    }
    const handleInvoiceDate = (e: Date) => {
        setTempInvoice((prevState) => ({
            ...prevState,
            invoiceDate: e,
        }))
    }
    const handleAddService = () => {
        // setAddService(true)
        // setEmptyServices((prevState) => ([
        //     ...prevState,
        //     {
        //         id: Math.random().toString(),
        //         name: null,
        //         price: null,
        //         description: null,
        //         quantity: 1,
        //     }
        // ]))
    }
    const handleCustomerDropDown = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCustomer(customers?.filter((customer) => {
            return customer.name === e.currentTarget.value
        }
        )
        [0])
    }
    const handleCompanyDropDown = (e: React.FormEvent<HTMLSelectElement>) => {
        setSelectedCompany(companies?.filter((company) => {
            return company.name === e.currentTarget.value
        }
        )[0])
    }
    // const handleDeleteService = (id: string) => {
    //     setEmptyServices((prevState) => (prevState.filter((service) => service.id !== id)))
    // }

    const handleCloseModal = () => {
        setShowModal(false)
    }
    return (
        <div className=" bg-gray-100">

            <div className="flex items-center justify-center h-full">
                <div className="w-full ">

                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <div className='pb-5'>
                                <button onClick={handleCloseModal} className="text-3xl font-bold text-gray-500 hover:text-gray-400">&times;</button>
                            </div>

                            <div className='flex pb-10 space-x-5'>
                                <div className='flex-col'>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                            Invoice Date
                                        </label>
                                    </div>
                                    <div className='border-4  rounded-lg'>
                                        <Flatpickr
                                            id='invoiceDate'
                                            value={tempInvoice.invoiceDate?.toString()}
                                            onChange={([date]) => {
                                                handleInvoiceDate(date as Date);
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className='flex-col'>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                            Invoice Service Date
                                        </label>
                                    </div>
                                    <div className='border-4  rounded-lg'>
                                        <Flatpickr
                                            id='serviceDate'
                                            value={tempInvoice.invoiceServiceDate?.toString()}
                                            onChange={([date]) => {
                                                handleServiceDate(date as Date);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='flex-col'>
                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                            Invoice Due Date
                                        </label>
                                    </div>
                                    <div className='border-4  rounded-lg'>
                                        <Flatpickr
                                            id='dueDate'
                                            value={tempInvoice.dueDate?.toString()}
                                            onChange={([date]) => {
                                                handleDueDate(date as Date);
                                            }}
                                        />
                                    </div>

                                </div>
                                <div className='flex content-center '>
                                    <button onClick={handleGenerateInvoice} className="bg-green-500 hover:bg-green-700 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline">View PDF</button>
                                </div>
                            </div>

                            <div>
                                <div className='mb-6'>
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="invoiceNumber">
                                        Invoice Number
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="invoiceNumber"
                                        type="name"
                                        placeholder="Invoice Number"
                                        value={invoiceData?.invoiceNumber}
                                    />
                                </div>
                            </div>

                            <div className='flex space-x-32'>

                                <div className='flex space-x-8 bg-b'>
                                    <div className='flex-col'>
                                        <div>
                                            {companies && (
                                                <select
                                                    onChange={handleCompanyDropDown}
                                                    defaultValue={selectedCompany?.name}
                                                    className="w-full border-2 border-gray-300 rounded-lg p-2">
                                                    <option disabled selected value={"123"}> -- select an option -- </option>
                                                    {companies?.length > 0 ? companies?.map((company) => (
                                                        <option key={company.id} value={company.name}>{company.name}</option>
                                                    )) : <option value=''>No Companies </option>}

                                                </select>
                                            )
                                            }
                                        </div>
                                        <div className='mb-6'>

                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyname">
                                                Company Name
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyname"
                                                type="name"
                                                placeholder="Company name"
                                                value={selectedCompany?.name}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyaddress">
                                                Company Address
                                            </label>
                                            <input
                                                value={selectedCompany?.address}
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyaddress"
                                                type="text"
                                                placeholder="Company Address"
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyzip">
                                                Company Zip
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyzip"
                                                type="text"
                                                placeholder="Company Zip"
                                                value={selectedCompany?.zip}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companycity">
                                                Company City
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companycity"
                                                type="text"
                                                placeholder="Company City"
                                                value={selectedCompany?.city}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companycountry">
                                                Company Country
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companycountry"
                                                type="text"
                                                placeholder="Company Country"
                                                value={selectedCompany?.country}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyphone">
                                                Company Phone
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyphone"
                                                type="text"
                                                placeholder="Company Phone"
                                                value={selectedCompany?.phone}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyemail">
                                                Company Email
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyemail"
                                                type="text"
                                                placeholder="Company Email"
                                                value={selectedCompany?.email}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companywebsite">
                                                Company Website
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companywebsite"
                                                type="text"
                                                placeholder="Company Website"
                                                value={selectedCompany?.website as string}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyvat">
                                                Company VAT
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyvat"
                                                type="text"
                                                placeholder="Company Vat"
                                                value={selectedCompany?.vat}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex-col'>
                                        <div>
                                            {customers && (
                                                <select onChange={handleCustomerDropDown}
                                                    defaultValue={selectedCustomer?.name}
                                                    className="w-full border-2 border-gray-300 rounded-lg p-2">
                                                    <option disabled selected value={"123"}> -- select an option -- </option>
                                                    {customers?.length > 0 ? customers?.map((customer) => (
                                                        <option key={customer.id} value={customer.name}>{customer.name}</option>
                                                    )) : <option value=''>No Customer&apos;s </option>}

                                                </select>
                                            )}
                                        </div>
                                        <div className='mb-6'>

                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customername">
                                                Customer Name
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="name"
                                                type="Customername"
                                                placeholder="Customer name"
                                                value={selectedCustomer?.name}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customeraddress">
                                                Customer Address
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customeraddress"
                                                type="text"
                                                placeholder="Customer Address"
                                                value={selectedCustomer?.address}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customerzip">
                                                Customer Zip
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customerzip"
                                                type="text"
                                                placeholder="Customer Zip"
                                                value={selectedCustomer?.zip}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customercity">
                                                Customer City
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customercity"
                                                type="text"
                                                placeholder="Customer City"
                                                value={selectedCustomer?.city}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customercountry">
                                                Customer Country
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customercountry"
                                                type="text"
                                                placeholder="Customer Country"
                                                value={selectedCustomer?.country}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customerphone">
                                                Customer Phone
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customerphone"
                                                type="text"
                                                placeholder="Customer Phone"
                                                value={selectedCustomer?.phone}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customeremail">
                                                Customer Email
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customeremail"
                                                type="text"
                                                placeholder="Customer Email"
                                                value={selectedCustomer?.email}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customerwebsite">
                                                Customer Website
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customerwebsite"
                                                type="text"
                                                placeholder="Customer Website"
                                                value={selectedCustomer?.website as string}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customervat">
                                                Customer VAT (Optional)
                                            </label>
                                            <input
                                                onChange={handleChange}
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customervat"
                                                type="text"
                                                placeholder="Customer Vat"
                                                value={selectedCustomer?.vat as string}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='pb-10'>
                                {/* Pretty fascinating that u can do that so easily(scroll) */}
                                <div className='max-h-[200px] overflow-y-scroll'>

                                    {services?.map((serviceEdit, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="mb-6">
                                                <ServiceItem service={serviceEdit} />
                                            </div>
                                        </div>
                                    ))}

                                </div>
                                <div>

                                </div>
                                <div>
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        onClick={handleAddService}
                                        type="button"
                                    >
                                        Add Service
                                    </button>
                                </div>

                            </div>
                            <div>

                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <button

                                        onClick={handleEditInvoice}
                                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Edit
                                    </button>
                                </div>
                                <div>
                                    <button

                                        onClick={handleDeleteInvoice}
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                        type="button"
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    </form>

                </div>
            </div >
        </div >
    )
}

