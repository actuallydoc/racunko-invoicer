import React, { useEffect } from 'react'
import type { Invoice, Company, Partner } from 'types'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
export default function InvoiceCreateModal({ customers, companies, invoiceState, invoiceData, setShowModal, handleCreateInvoice }: { invoiceData: Invoice | undefined, customers: Partner[] | undefined, companies: Company[] | undefined, invoiceState: React.Dispatch<React.SetStateAction<Invoice>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>, handleCreateInvoice: () => void }) {

    const [fromDate, setFromDate] = React.useState<Date | null>(new Date());
    const [toDate, setToDate] = React.useState<Date | null>(new Date());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        invoiceState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
            company: {
                ...prevState.company,
            },
            partner: {
                ...prevState.partner,
            },

        }))

        console.log(e.target.id + ' ' + e.target.value)
    }
    const handleCustomerDropDown = (e: React.FormEvent<HTMLSelectElement>) => {
        console.log("HANDLE CUSTOMER BRO")
        if (customers && e.currentTarget.value) {
            const filtered = customers.filter((customer) => {
                return customer.name === e.currentTarget.value
            })
            invoiceState((prevState) => ({
                ...prevState,
                partner: {
                    ...filtered[0]
                }

            }))
        }

    }
    const handleCompanyDropDown = (e: React.FormEvent<HTMLSelectElement>) => {
        console.log("HANDLE COMPANY BRO")
        if (companies && e.currentTarget.value) {
            const filtered = companies.filter((company) => {
                return company.name === e.currentTarget.value
            })
            invoiceState((prevState) => ({
                ...prevState,
                company: {
                    ...filtered[0]
                }

            }))
        }
    }



    return (
        <div className=" bg-gray-100">
            <div className="flex items-center justify-center h-full">
                <div className="w-full ">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <div className='pb-5'>
                                <button onClick={() => setShowModal(false)} className="text-3xl font-bold text-gray-500 hover:text-gray-400">&times;</button>
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
                                            value={fromDate?.toString()}
                                            onChange={([date]) => {
                                                setFromDate(date as Date);
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
                                            value={fromDate?.toString()}
                                            onChange={([date]) => {
                                                setFromDate(date as Date);
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
                                            value={fromDate?.toString()}
                                            onChange={([date]) => {
                                                setFromDate(date as Date);
                                            }}
                                        />
                                    </div>
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
                                        value={invoiceData?.company?.name}
                                    />
                                </div>
                            </div>
                            <div className='flex space-x-32'>

                                <div className='flex space-x-8 bg-b'>
                                    <div className='flex-col'>
                                        <div>
                                            <select onChange={(e) => {

                                                handleCompanyDropDown(e);
                                            }} className="w-full border-2 border-gray-300 rounded-lg p-2">
                                                {companies?.length > 0 ? companies?.map((company) => (
                                                    <option key={company.id} value={company.name}>{company.name}</option>
                                                )) : <option value=''>No Companies </option>}

                                            </select>
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
                                                value={invoiceData?.company?.name}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyaddress">
                                                Company Address
                                            </label>
                                            <input
                                                value={invoiceData?.company?.address}
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
                                                value={invoiceData?.company?.zip}
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
                                                value={invoiceData?.company?.city}
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
                                                value={invoiceData?.company?.country}
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
                                                value={invoiceData?.company?.phone}
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
                                                value={invoiceData?.company?.email}
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
                                                value={invoiceData?.company?.website}
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
                                                value={invoiceData?.company?.vat}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex-col'>
                                        <div>
                                            <select onChange={(e) => {
                                                handleCustomerDropDown(e);
                                            }} className="w-full border-2 border-gray-300 rounded-lg p-2">
                                                {customers?.length > 0 ? customers?.map((customer) => (
                                                    <option key={customer.id} value={customer.name}>{customer.name}</option>
                                                )) : <option value=''>No Customer&apos;s </option>}

                                            </select>
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
                                                value={invoiceData?.partner?.name}
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
                                                value={invoiceData?.partner?.address}
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
                                                value={invoiceData?.partner?.zip}
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
                                                value={invoiceData?.partner?.city}
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
                                                value={invoiceData?.partner?.country}
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
                                                value={invoiceData?.partner?.phone}
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
                                                value={invoiceData?.partner?.email}
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
                                                value={invoiceData?.partner?.website}
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
                                                value={invoiceData?.partner?.vat}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleCreateInvoice}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}
