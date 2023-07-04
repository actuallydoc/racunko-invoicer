import React, { useEffect, useState } from 'react'

import "flatpickr/dist/themes/material_green.css";
import type { Company, Invoice, Partner } from '@prisma/client';
import { api } from '@/utils/api';

import { Button } from "@/components/ui/button"
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
import { useSelector, useDispatch } from 'react-redux';
import { invoiceSlice, type RootState } from '@/stores/invoiceSlice';
import { DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { DialogClose } from '@radix-ui/react-dialog';
import { z } from "zod";
import { Form, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn, generateRandomId } from '@/lib/utils';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ServiceEditCreateItem from './ServiceEditCreateItem';
import { InvoiceSerialized, InvoiceStatus } from 'types';
import { Textarea } from '@/components/ui/textarea';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
const InvoiceFormSchema = z.object({
    invoiceDate: z.date({
        required_error: "A date of birth is required.",
    }),
    dueDate: z.date({
        required_error: "A date of birth is required.",
    }),
    serviceDate: z.date({
        required_error: "A date of birth is required.",
    }),
    invoiceNumber: z.string().min(3, { message: 'Invoice Number must be at least 3 characters long' }),
    company: z.object({
        id: z.string(),
        name: z.string(),
        address: z.string(),
        city: z.string(),
        country: z.string(),
        email: z.string(),
        phone: z.string(),
        postalCode: z.string(),
        vatNumber: z.string(),
    }),
    customer: z.object({
        id: z.string(),
        name: z.string(),
        address: z.string(),
        city: z.string(),
        country: z.string(),
        email: z.string(),
        phone: z.string(),
        postalCode: z.string(),
        vatNumber: z.string(),
    }),
    services: z.array(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        quantity: z.number(),
    }))
})

export default function InvoiceEditModal({ invoice, setEdit }: { invoice: Invoice, setEdit: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [selectedCustomer, setSelectedCustomer] = React.useState<Partner>();
    const [selectedCompany, setSelectedCompany] = React.useState<Company>();
    const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false)
    const [companyValue, setCompanyValue] = React.useState<string>("")
    const [openCustomerPopover, setOpenCustomerPopover] = React.useState(false)
    const [customerValue, setCustomerValue] = React.useState<string>("")
    const [editInvoice, setEditInvoice] = React.useState<InvoiceSerialized>(invoice as InvoiceSerialized)
    const [invoiceStatus, setInvoiceStatus] = React.useState<InvoiceStatus>(invoice.status as InvoiceStatus)
    const { data: sessionData } = useSession()
    const updateInvoice = api.invoice.editInvoice.useMutation()
    const { data: companies } = api.company.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { data: customers } = api.partner.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { toast } = useToast();
    const form = useForm<z.infer<typeof InvoiceFormSchema>>({
        resolver: zodResolver(InvoiceFormSchema),
    });
    const handleGenerateInvoice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //Create a Blob and open it in a new window
        // TODO This is curently not working the template is broken
        e.preventDefault();
        // const blob = generatePDFInvoice(invoiceSelector);
        // console.log("Blob is: ",);
        // window.open(blob, "_blank")
    }
    const handleDueDate = (e: Date) => {
        setEditInvoice({
            ...editInvoice,
            dueDate: e
        })
    }
    const handleInvoiceDate = (e: Date) => {
        setEditInvoice({
            ...editInvoice,
            invoiceDate: e
        })

    }
    const handleServiceDate = (e: Date) => {
        setEditInvoice({
            ...editInvoice,
            invoiceServiceDate: e
        })

    }
    const handleInvoiceNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditInvoice({
            ...editInvoice,
            invoiceNumber: e.target.value
        })
    }
    useEffect(() => {
        console.log("Invoice is: ", editInvoice);
    }, [editInvoice])
    const handleAddService = () => {
        setEditInvoice({
            ...editInvoice,
            Services: [...editInvoice.Services, {
                id: generateRandomId(8),
                name: "",
                description: "",
                price: 0,
                quantity: 0,
            }]
        })
    }
    const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { name, value } = e.target
        setEditInvoice({
            ...editInvoice,
            Services: editInvoice.Services.map((service, i) => {
                if (i === index) {
                    return {
                        ...service,
                        [name]: value
                    }
                }
                return service
            })
        })

    };
    const handleCompanySelect = (company: Company) => {
        setEditInvoice({
            ...editInvoice,
            Company: company
        })
        setOpenCompanyPopover(false)
    }
    const handleCustomerSelect = (customer: Partner) => {
        setEditInvoice({
            ...editInvoice,
            Partner: customer
        })
        setOpenCustomerPopover(false)
    }
    const handleDeleteService = (id: string) => {
        setEditInvoice({
            ...editInvoice,
            Services: editInvoice.Services.filter(service => service.id !== id)
        })
    }
    const InvoiceConst: InvoiceStatus[] = ["Draft", "Paid", "Overdue", "Cancelled", "Refunded"]

    const handleInvoiceEdit = () => {
        console.log("Invoice is: ", editInvoice);
        updateInvoice.mutate({
            companyId: editInvoice.Company.id,
            partnerId: editInvoice.Partner.id,
            invoiceDate: editInvoice.invoiceDate,
            invoiceNumber: editInvoice.invoiceNumber,
            invoiceServiceDate: editInvoice.invoiceServiceDate,
            dueDate: editInvoice.dueDate,
            services: JSON.stringify(editInvoice.Services),
            id: editInvoice.id,
            status: editInvoice.status as InvoiceStatus,

        }, {
            onSuccess: () => {
                toast({
                    title: "Invoice edited",
                    description: "Invoice was successfully edited",
                    duration: 5000,
                })
                setEdit(false)
            },
        });
        setEdit(false);
    }
    return (
        <DialogContent className='p-10'>
            <DialogHeader>
                <DialogTitle>Edit invoice</DialogTitle>
                <DialogDescription>
                    After pressing Edit button you will edit an existing invoice for your company.
                </DialogDescription>
            </DialogHeader>
            <Card className='pt-4'>
                <CardContent>
                    <Form {...form}>
                        <form className='space-y-3 flex space-x-5'>
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
                                                !editInvoice.invoiceDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {editInvoice.invoiceDate ? format(editInvoice.invoiceDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="">
                                        <Calendar
                                            mode="single"
                                            selected={editInvoice.invoiceDate}
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
                                                !editInvoice.invoiceServiceDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {editInvoice.invoiceServiceDate ? format(editInvoice.invoiceServiceDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="">
                                        <Calendar
                                            mode="single"
                                            selected={editInvoice.invoiceServiceDate}
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
                                                !editInvoice.dueDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {editInvoice.dueDate ? format(editInvoice.dueDate, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="">
                                        <Calendar
                                            mode="single"
                                            selected={editInvoice.dueDate}
                                            onSelect={(e) => handleDueDate(e as Date)}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>

                            </div>
                            <div className='flex-col mb-10'>
                                <div>
                                    <Label className="block text-sm font-bold mb-2" htmlFor="date">
                                        Invoice Status
                                    </Label>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline">{invoiceStatus}</Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Options</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {Object.values(InvoiceConst).map((status) => (
                                                <DropdownMenuItem
                                                    key={status}
                                                    onSelect={() => {
                                                        setInvoiceStatus(status)
                                                        setEditInvoice({
                                                            ...editInvoice,
                                                            status: status as InvoiceStatus
                                                        })
                                                    }}
                                                >
                                                    {status}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                            </div>
                        </form>
                    </Form>
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
                                defaultValue={editInvoice?.invoiceNumber}
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
                                                {customers?.map((customer) => (
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
                            {editInvoice.Services?.map((service, index) => (
                                <div key={index} className="flex items-center">
                                    <div className="mb-6">
                                        <div>
                                            <hr className=" my-2 border-2 mt-3 mb-3" />
                                            <div className="grid grid-cols-5 gap-4">
                                                <div>
                                                    <Label htmlFor="description">Description</Label>
                                                    <Textarea placeholder='Description' name='description' onChange={(e) => {
                                                        handleServiceChange(e, index);

                                                    }} defaultValue={service.description} />
                                                </div>
                                                <div>
                                                    <div className='flex-col'>
                                                        <div>
                                                            <Label htmlFor="quantity" >Quantity</Label>
                                                        </div>
                                                        <Input onChange={(e) => {
                                                            handleServiceChange(e, index);
                                                        }} type="number" name='quantity' min={1} defaultValue={service.quantity} />
                                                    </div>
                                                </div>
                                                <div className='flex-col'>
                                                    <div>
                                                        <Label htmlFor="price" >Price</Label>
                                                    </div>
                                                    <div className=''>
                                                        <Input onChange={(e) => {
                                                            handleServiceChange(e, index);
                                                        }} type="number" name='price' defaultValue={service.price} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button className='mt-6' variant={"destructive"} onClick={() => handleDeleteService(service.id)}>Delete</Button>
                                                </div>

                                            </div>
                                        </div>
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
                </CardContent>
            </Card>
            <DialogFooter className='mr-auto'>
                <DialogClose asChild>
                    <Button onClick={handleInvoiceEdit}>Edit</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}

