import React, { useState } from 'react'

import "flatpickr/dist/themes/material_green.css";
import generatePDFInvoice from '@/utils/invoicer';
import type { Company, Partner } from '@prisma/client';
import { api } from '@/utils/api';
import { Input } from '@/components/ui/input';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
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
import { ChevronsUpDown, Check } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { invoiceSlice, type RootState } from '@/stores/invoiceSlice';
import ServiceItem from './ServiceItem';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'react-toastify';


export default function InvoiceEditModal({ customers, companies, setShowModal }: {
    customers: Partner[], companies: Company[], setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {

    const invoiceDispatch = useDispatch();
    const invoiceSelector = useSelector((state: RootState) => state.editItem);
    const editInvoice = api.invoice.editInvoice.useMutation();
    const deleteInvoice = api.invoice.deleteInvoice.useMutation();
    const [selectedCustomer, setSelectedCustomer] = useState<Partner>(invoiceSelector?.Partner as Partner);
    const [selectedCompany, setSelectedCompany] = useState<Company>(invoiceSelector?.Company as Company);
    // const [tempInvoice, setTempInvoice] = useState<InvoiceSerialized>(invoiceSelector);

    const handleGenerateInvoice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //Create a Blob and open it in a new window
        // TODO This is curently not working the template is broken
        e.preventDefault();
        const blob = generatePDFInvoice(invoiceSelector);
        console.log("Blob is: ",);
        window.open(blob, "_blank")
    }
    const handleEditInvoice = () => {
        editInvoice.mutate({
            ...invoiceSelector,

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            companyId: invoiceSelector.Company?.id as string,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            partnerId: invoiceSelector.Partner?.id as string,
            services: JSON.stringify(invoiceSelector.Services as unknown as string),
        }, {
            onSuccess: () => {
                invoiceDispatch(invoiceSlice.actions.reset)
                toast.success("Invoice edited successfully")
                setShowModal(false)
            }
        });
    }
    const handleInvoiceNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        invoiceDispatch(invoiceSlice.actions.updateInvoiceNumber({
            invoiceNumber: e.target.value
        }))
    }
    const handleDeleteInvoice = () => {
        deleteInvoice.mutate({
            id: invoiceSelector?.id,
        }, {
            onSuccess: () => {

                setShowModal(false)
            }
        })
    }
    const handleDueDate = (e: Date) => {
        invoiceDispatch(invoiceSlice.actions.updateInvoiceDueDate({
            date: e
        }))
    }
    const handleServiceDate = (e: Date) => {
        invoiceDispatch(invoiceSlice.actions.updateServiceDate({
            date: e
        }))
    }
    const handleInvoiceDate = (e: Date) => {
        invoiceDispatch(invoiceSlice.actions.updateInvoiceDate({
            date: e
        }))
    }
    const handleAddService = () => {
        invoiceDispatch(invoiceSlice.actions.addService({
            service: {
                description: "",
                id: Math.random().toString(),
                name: "",
                price: 0,
                quantity: 1,
            }
        }))
    }
    const handleCompanyChange = (e: Company) => {
        invoiceDispatch(invoiceSlice.actions.updateCompany({
            company: e
        }))
    }
    const handleCustomerChange = (e: Partner) => {
        invoiceDispatch(invoiceSlice.actions.updatePartner({
            partner: e
        }))
    }
    const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false)
    const [companyValue, setCompanyValue] = React.useState("")
    const [openCustomerPopover, setOpenCustomerPopover] = React.useState(false)
    const [customerValue, setCustomerValue] = React.useState("")

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
                                                        !invoiceSelector.invoiceDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {invoiceSelector.invoiceDate ? format(invoiceSelector.invoiceDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={invoiceSelector.invoiceDate}
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
                                                        !invoiceSelector.invoiceServiceDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {invoiceSelector.invoiceServiceDate ? format(invoiceSelector.invoiceServiceDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={invoiceSelector.invoiceServiceDate}
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
                                                        !invoiceSelector.dueDate && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {invoiceSelector.dueDate ? format(invoiceSelector.dueDate, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={invoiceSelector.dueDate}
                                                    onSelect={(e) => handleDueDate(e as Date)}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
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
                                    <Input
                                        onChange={handleInvoiceNumber}
                                        className="shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="invoiceNumber"
                                        type="name"
                                        placeholder="Invoice Number"
                                        defaultValue={invoiceSelector?.invoiceNumber}
                                    />
                                </div>
                            </div>

                            <div className='flex space-x-32'>


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
                                                            handleCompanyChange(company);
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


                                <div className='flex space-x-2'>
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
                                                                handleCustomerChange(customer)
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

                            <div className='pb-10'>
                                {/* Pretty fascinating that u can do that so easily(scroll) */}
                                <div className='max-h-[200px] overflow-y-scroll'>
                                    {invoiceSelector.Services?.map((service, index) => (
                                        <div key={index} className="flex items-center justify-between">
                                            <div className="mb-6">
                                                <ServiceItem service={service} />
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

