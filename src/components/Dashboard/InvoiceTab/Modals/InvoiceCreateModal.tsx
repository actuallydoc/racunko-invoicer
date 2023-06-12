import React, { useState } from 'react'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import ServiceItem from './ServiceItem';
import type { Invoice, Company, Partner } from '@prisma/client';
import type { InvoiceType, Service } from 'types';
import { api } from '@/utils/api';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceSlice, type RootState } from '@/stores/invoiceSlice';
import ServiceCreateItem from './ServiceCreateItem';
// import ServiceAddModal from './ServiceAddModal';
export default function InvoiceCreateModal({ customers, companies, invoiceData, setShowModal }: { invoiceData: Invoice, customers: Partner[], companies: Company[], invoiceState: React.Dispatch<React.SetStateAction<Invoice>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const createInvoice = api.invoice.createInvoice.useMutation();

    const createInvoiceSelector = useSelector((state: RootState) => state.createItem);
    const createInvoiceDispatch = useDispatch();
    const [invoiceDate, setInvoiceDate] = React.useState<Date>(new Date());
    const [dueDate, setDueDate] = React.useState<Date>(new Date());
    const [serviceDate, setServiceDate] = React.useState<Date>(new Date());
    const [selectedCustomer, setSelectedCustomer] = React.useState<Partner>();
    // const [emptyServices, setEmptyServices] = React.useState<Service[]>([]);
    const [selectedCompany, setSelectedCompany] = React.useState<Company>();
    const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false)
    const [companyValue, setCompanyValue] = React.useState<string>("")
    const [openCustomerPopover, setOpenCustomerPopover] = React.useState(false)
    const [customerValue, setCustomerValue] = React.useState<string>("")
    const { data: sessionData } = useSession();
    const handleDueDate = (e: Date) => {
        createInvoiceDispatch(invoiceSlice.actions.updateCreateInvoiceDueDate({
            date: e
        }))
    }
    const handleInvoiceDate = (e: Date) => {
        createInvoiceDispatch(invoiceSlice.actions.updateCreateInvoiceDate({
            date: e
        }))
    }
    const handleServiceDate = (e: Date) => {
        createInvoiceDispatch(invoiceSlice.actions.updateCreateServiceDate({
            date: e
        }))
    }
    const handleInvoiceNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        createInvoiceDispatch(invoiceSlice.actions.updateCreateInvoiceNumber({
            invoiceNumber: e.target.value
        }))
    }
    const handleAddService = () => {
        createInvoiceDispatch(invoiceSlice.actions.addCreateService(
            {
                service: {
                    id: Math.random().toString(36).substr(2, 9),
                    description: "",
                    name: "",
                    price: 0,
                    quantity: 1,
                }
            }
        ))
    }
    const handleCompanySelect = (company: Company) => {
        createInvoiceDispatch(invoiceSlice.actions.updateCreateCompany({
            company: company
        }))
        setOpenCompanyPopover(false)
    }
    const handleCustomerSelect = (customer: Partner) => {
        createInvoiceDispatch(invoiceSlice.actions.updateCreatePartner({
            partner: customer
        }))
        setOpenCustomerPopover(false)
    }

    const handleInvoiceCreate = () => {
        console.log(createInvoiceSelector)
        createInvoice.mutate({
            companyId: selectedCompany?.id as string,
            partnerId: selectedCustomer?.id as string,
            invoiceDate: createInvoiceSelector.invoiceDate,
            dueDate: createInvoiceSelector.dueDate,
            invoiceNumber: createInvoiceSelector?.invoiceNumber,
            invoiceServiceDate: createInvoiceSelector.invoiceServiceDate,
            services: JSON.stringify(createInvoiceSelector.Services),
            id: sessionData?.user?.id as string,
            status: "DRAFT",
        }, {
            onSuccess: () => {
                toast.success("Invoice Created")
                createInvoiceDispatch(invoiceSlice.actions.resetCreate())
                setShowModal(false)
            },
        })



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
                                            id='invoiceDate'
                                            value={invoiceDate.toString()}
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
                                            value={serviceDate?.toString()}
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
                                            value={dueDate?.toString()}
                                            onChange={([date]) => {
                                                handleDueDate(date as Date);
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
                                    <Input
                                        onChange={handleInvoiceNumber}
                                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="invoiceNumber"
                                        type="name"
                                        placeholder="Invoice Number"
                                        defaultValue={createInvoiceSelector?.invoiceNumber}
                                    />
                                </div>
                            </div>

                            <div className='flex space-x-32'>
                                <div className='flex space-x-8 bg-b'>
                                    <div className='flex-col'>
                                        <Popover open={openCompanyPopover} onOpenChange={setOpenCompanyPopover}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"

                                                    className="w-[200px] justify-between"
                                                >
                                                    {companyValue
                                                        ? companies.find((company) => company.name === companyValue)?.name
                                                        : "Select company..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search companies..." />
                                                    <CommandEmpty>No companies found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {companies.map((company) => (
                                                            <CommandItem
                                                                key={company.id}
                                                                onSelect={(currentValue) => {
                                                                    setCompanyValue(currentValue === companyValue ? "" : currentValue)
                                                                    setSelectedCompany(company)
                                                                    handleCompanySelect(company)
                                                                    setOpenCompanyPopover(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        companyValue === company.name ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {company.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>

                                        <div className='mb-6'>

                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyname">
                                                Company Name
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyname"
                                                type="name"
                                                placeholder="Company name"
                                                defaultValue={selectedCompany?.name}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyaddress">
                                                Company Address
                                            </label>
                                            <Input
                                                disabled
                                                defaultValue={selectedCompany?.address}

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
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyzip"
                                                type="text"
                                                placeholder="Company Zip"
                                                defaultValue={selectedCompany?.zip}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companycity">
                                                Company City
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companycity"
                                                type="text"
                                                placeholder="Company City"
                                                defaultValue={selectedCompany?.city}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companycountry">
                                                Company Country
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companycountry"
                                                type="text"
                                                placeholder="Company Country"
                                                defaultValue={selectedCompany?.country}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyphone">
                                                Company Phone
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyphone"
                                                type="text"
                                                placeholder="Company Phone"
                                                defaultValue={selectedCompany?.phone}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyemail">
                                                Company Email
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyemail"
                                                type="text"
                                                placeholder="Company Email"
                                                defaultValue={selectedCompany?.email}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companywebsite">
                                                Company Website
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companywebsite"
                                                type="text"
                                                placeholder="Company Website"
                                                defaultValue={selectedCompany?.website as string}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Companyvat">
                                                Company VAT
                                            </label>
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Companyvat"
                                                type="text"
                                                placeholder="Company Vat"
                                                defaultValue={selectedCompany?.vat}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex'>
                                    <div className='flex-col'>
                                        <Popover open={openCustomerPopover} onOpenChange={setOpenCustomerPopover}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"

                                                    className="w-[200px] justify-between"
                                                >
                                                    {customerValue
                                                        ? customers.find((customer) => customer.name === customerValue)?.name
                                                        : "Select customer..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-[200px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search customers..." />
                                                    <CommandEmpty>No customers found.</CommandEmpty>
                                                    <CommandGroup>
                                                        {/* TODO: The name of the partner and company in the popover is not fully shown because of the width */}
                                                        {customers.map((customer) => (
                                                            <CommandItem
                                                                key={customer.id}
                                                                onSelect={(currentValue: string) => {
                                                                    setCustomerValue(currentValue === customerValue ? "" : currentValue)
                                                                    setSelectedCustomer(customer)
                                                                    handleCustomerSelect(customer)
                                                                    setOpenCustomerPopover(false)
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        customerValue === customer.name ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                                {customer.name}
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <div className='mb-6'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customername">
                                                Customer Name
                                            </label>
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                id="Customeremail"
                                                type="text"
                                                placeholder="Customer Email"
                                                value={selectedCustomer?.email as string}
                                            />
                                        </div>
                                        <div className="mb-6">
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Customerwebsite">
                                                Customer Website
                                            </label>
                                            <Input
                                                disabled

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
                                            <Input
                                                disabled

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
                                    {createInvoiceSelector.Services?.map((service, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="mb-6">
                                                <ServiceCreateItem service={service} />
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
                                <button
                                    onClick={handleInvoiceCreate}
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
