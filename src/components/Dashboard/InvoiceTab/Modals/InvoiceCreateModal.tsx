import React from 'react'
import "flatpickr/dist/themes/material_green.css";

import type { Company, Partner } from '@prisma/client';

import { api } from '@/utils/api';

import { useSession } from 'next-auth/react';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
import { useToast } from "@/components/ui/use-toast"
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
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { DialogClose } from '@radix-ui/react-dialog';
import { Form, useForm } from 'react-hook-form';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { InvoiceStatus } from 'types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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

const InvoiceConst: InvoiceStatus[] = ["Draft", "Paid", "Overdue", "Cancelled", "Refunded"]

export default function InvoiceCreateModal() {
    const { data: sessionData } = useSession();
    const { data: companies } = api.company.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { data: customers } = api.partner.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const createInvoice = api.invoice.createInvoice.useMutation();
    const { toast } = useToast()
    const createInvoiceSelector = useSelector((state: RootState) => state.createItem);
    const createInvoiceDispatch = useDispatch();
    const [selectedCustomer, setSelectedCustomer] = React.useState<Partner>();
    // const [emptyServices, setEmptyServices] = React.useState<Service[]>([]);
    const [selectedCompany, setSelectedCompany] = React.useState<Company>();
    const [openCompanyPopover, setOpenCompanyPopover] = React.useState(false)
    const [companyValue, setCompanyValue] = React.useState<string>("")
    const [openCustomerPopover, setOpenCustomerPopover] = React.useState(false)
    const [customerValue, setCustomerValue] = React.useState<string>("")
    const [invoiceStatus, setInvoiceStatus] = React.useState<InvoiceStatus>("Draft")
    const form = useForm<z.infer<typeof InvoiceFormSchema>>({
        resolver: zodResolver(InvoiceFormSchema),
    })
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
        createInvoice.mutate({
            companyId: selectedCompany?.id as string,
            partnerId: selectedCustomer?.id as string,
            invoiceDate: createInvoiceSelector.invoiceDate,
            dueDate: createInvoiceSelector.dueDate,
            invoiceNumber: createInvoiceSelector?.invoiceNumber,
            invoiceServiceDate: createInvoiceSelector.invoiceServiceDate,
            services: JSON.stringify(createInvoiceSelector.Services),
            id: sessionData?.user?.id as string,
            status: invoiceStatus,
        }, {
            onSuccess: () => {
                toast({
                    title: "Invoice Action",
                    description: "Invoice created successfully",
                })
                createInvoiceDispatch(invoiceSlice.actions.resetCreate())
            },
        })



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
                                                        createInvoiceDispatch(invoiceSlice.actions.updateCreateStatus({
                                                            status: status
                                                        }))
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
                            {createInvoiceSelector.Services?.map((service, index) => (
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
                </CardContent>
            </Card>
            <DialogFooter className='mr-auto'>
                <DialogClose asChild>
                    <Button onClick={handleInvoiceCreate}>Create</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    )
}
