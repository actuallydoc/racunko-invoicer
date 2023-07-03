import React, { useEffect, useState } from 'react'

import "flatpickr/dist/themes/material_green.css";
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
import { DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog';
import { DialogHeader } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import ServiceCreateItem from './ServiceCreateItem';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';


export default function InvoiceEditModal() {
    useEffect(() => { console.log("InvoiceEditModal") }, [])
    const { data: sessionData } = useSession()
    const { data: companies } = api.company.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { data: customers } = api.partner.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { toast } = useToast();
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
        // const blob = generatePDFInvoice(invoiceSelector);
        // console.log("Blob is: ",);
        // window.open(blob, "_blank")
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
                toast({
                    title: "Invoice edited",
                    description: "Invoice was edited successfully",
                })

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
    // const handleCompanyChange = (e: Company) => {
    //     invoiceDispatch(invoiceSlice.actions.updateCompany({
    //         company: e
    //     }))
    // }
    // const handleCustomerChange = (e: Partner) => {
    //     invoiceDispatch(invoiceSlice.actions.updatePartner({
    //         partner: e
    //     }))
    // }
    const createInvoiceSelector = useSelector((state: RootState) => state.createItem);
    const createInvoiceDispatch = useDispatch();
    const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false)
    const [companyValue, setCompanyValue] = React.useState("")
    const [openCustomerPopover, setOpenCustomerPopover] = React.useState(false)
    const [customerValue, setCustomerValue] = React.useState("")
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
    return (
        <DialogContent className='p-10'>
            <DialogHeader>
                <DialogTitle>Create invoice</DialogTitle>
                <DialogDescription>
                    After pressing Create button you will create a new invoice for your company.
                </DialogDescription>
            </DialogHeader>
            <Card className='pt-4'>
                <CardContent>
                    <div className='space-y-3 flex space-x-5'>
                        <div className='flex-col'>
                            <Label className="block text-sm font-bold mb-5" htmlFor="date">
                                Invoice Date
                            </Label>
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
                                <PopoverContent className="">
                                    <Calendar
                                        mode="single"
                                        selected={createInvoiceSelector.invoiceDate}
                                        onSelect={(e) => handleInvoiceDate(e as Date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                        </div>

                        <div className='flex-col'>
                            <div>
                                <Label className="block text-sm font-bold mb-2" htmlFor="date">
                                    Invoice Service Date
                                </Label>
                            </div>
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
                                <PopoverContent className="">
                                    <Calendar
                                        mode="single"
                                        selected={createInvoiceSelector.invoiceServiceDate}
                                        onSelect={(e) => handleServiceDate(e as Date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className='flex-col mb-10'>

                            <div>
                                <Label className="block text-sm font-bold mb-2" htmlFor="date">
                                    Invoice Due Date
                                </Label>
                            </div>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[250px] justify-start text-left font-normal",
                                            !createInvoiceSelector.dueDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {createInvoiceSelector.dueDate ? format(createInvoiceSelector.dueDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="">
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
                    <div>
                        <div className='flex-col mb-5'>
                            <Label className="text-sm font-bold mb-2" htmlFor="invoiceNumber">
                                Invoice Number
                            </Label>
                            <Input
                                onChange={handleInvoiceNumber}
                                className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                id="invoiceNumber"
                                type="name"
                                placeholder="Invoice Number"
                                defaultValue={createInvoiceSelector?.invoiceNumber}
                            />
                        </div>
                    </div>

                    <div className='flex space-x-10'>
                        <div className='flex-col'>
                            <Popover open={openCompanyPopover} onOpenChange={setOpenCompanyPopover}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"

                                        className="w-[200px] justify-between"
                                    >
                                        {companyValue
                                            ? companies?.find((company) => company.name === companyValue)?.name
                                            : "Select company..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder="Search companies..." />
                                        <CommandEmpty>No companies found.</CommandEmpty>
                                        <CommandGroup>
                                            {companies?.map((company: Company) => (
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
                                                ? customers?.find((customer) => customer.name === customerValue)?.name
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
                                                {customers?.map((customer: Partner) => (
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
                            {invoiceSelector.Services?.map((service, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mb-6">
                                        <ServiceCreateItem service={service} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>

                        </div>
                        <div className='pt-3'>
                            <Button className=" font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleAddService}
                                type="button"
                                variant={"outline"}
                            >
                                Add Service
                            </Button>
                        </div>
                    </div>
                    <div>

                    </div>
                    <div className="flex items-center justify-between">
                        <Button
                            onClick={handleEditInvoice}
                            className=""
                            variant={'outline'}
                        >
                            Create
                        </Button>
                    </div>

                </CardContent>
            </Card>
        </DialogContent>
    )
}

