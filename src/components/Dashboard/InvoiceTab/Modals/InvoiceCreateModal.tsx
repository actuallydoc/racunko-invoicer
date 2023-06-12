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
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceSlice, type RootState } from '@/stores/invoiceSlice';
import ServiceCreateItem from './ServiceCreateItem';
import { format } from 'date-fns';

// TODO: All invoice modals should not have input's only dropdowns with search for data that already exists in the database
export default function InvoiceCreateModal({ customers, companies, setShowModal }: { customers: Partner[], companies: Company[], invoiceState: React.Dispatch<React.SetStateAction<Invoice>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>> }) {
    const createInvoice = api.invoice.createInvoice.useMutation();

    const createInvoiceSelector = useSelector((state: RootState) => state.createItem);
    const createInvoiceDispatch = useDispatch();
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
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !createInvoiceSelector.invoiceDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {createInvoiceSelector.invoiceDate ? format(createInvoiceSelector.invoiceDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={createInvoiceSelector.invoiceDate}
                                                    onSelect={(e) => handleInvoiceDate(e as Date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>

                                <div className='flex-col'>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                            Invoice Service Date
                                        </label>
                                    </div>
                                    <div className='border-4  rounded-lg'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !createInvoiceSelector.invoiceServiceDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {createInvoiceSelector.invoiceServiceDate ? format(createInvoiceSelector.invoiceServiceDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={createInvoiceSelector.invoiceServiceDate}
                                                    onSelect={(e) => handleServiceDate(e as Date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className='flex-col'>

                                    <div>
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                            Invoice Due Date
                                        </label>
                                    </div>
                                    <div className='border-4  rounded-lg'>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-[280px] justify-start text-left font-normal",
                                                        !createInvoiceSelector.dueDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {createInvoiceSelector.dueDate ? format(createInvoiceSelector.dueDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={createInvoiceSelector.dueDate}
                                                    onSelect={(e) => handleDueDate(e as Date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
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
                                                    {companies?.map((company) => (
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
