import React from 'react'
import Table from './Table/Table'
import type { Company, Partner } from 'prisma/prisma-client'
import "flatpickr/dist/themes/material_green.css";

import InvoiceCreateModal from './Modals/InvoiceCreateModal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Check, ChevronsUpDown } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import InvoiceEditModal from './Modals/InvoiceEditModal';

interface InvoiceTabProps {
    Companies: Company[];
    Customers: Partner[];
}
export default function InvoiceTab({ Companies, Customers }: InvoiceTabProps) {
    const [fromDate, setFromDate] = React.useState<Date>(new Date());
    const [toDate, setToDate] = React.useState<Date>(new Date());
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [editInvoice, setEditInvoice] = React.useState<boolean>(false)

    return (
        <div className="mt-10 flex justify-center items-center">
            <Card>
                <CardHeader>
                    <CardTitle>Invoice Table</CardTitle>
                    <CardDescription>Manage your invoices here.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 w-full">
                    <div className='flex space-x-2'>
                        <Popover>
                            <PopoverTrigger asChild >
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !fromDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fromDate ? format(fromDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className=" w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={fromDate}
                                    onSelect={(date) => setFromDate(date as unknown as Date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <div className='pt-2'>
                            <p>to</p>
                        </div>
                        <Popover>
                            <PopoverTrigger asChild >
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start  text-left font-normal",
                                        !toDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {toDate ? format(toDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 ">
                                <Calendar
                                    mode="single"
                                    selected={toDate}
                                    onSelect={(date) => setToDate(date as unknown as Date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className='space-x-10'>
                        <Dialog modal={true}>
                            <DialogTrigger className=''>
                                <Button variant={'outline'} className='flex space-x-5 '>
                                    Create
                                </Button>
                            </DialogTrigger>
                            <InvoiceCreateModal companies={Companies} customers={Customers} />

                        </Dialog>

                        <Dialog modal={true} >
                            {editInvoice &&
                                <InvoiceEditModal Companies={Companies} Customers={Customers} />
                            }
                        </Dialog>

                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {/* Some how this is undefined */}
                                    {value.length
                                        ? Companies.find((company) => company.name === value)?.name : "Select company..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            {/* TODO: Filter the invoices by the selected company */}
                            <PopoverContent className="w-[200px] p-0 ">
                                <Command className=''>
                                    <CommandInput placeholder="Search Company..." />
                                    <CommandEmpty>No companies found.</CommandEmpty>
                                    <CommandGroup>
                                        {Companies.map((company, index) => (
                                            <CommandItem
                                                key={index}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value ? "" : currentValue)
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === company.name ? "opacity-100" : "opacity-0"
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
                    <div className='mt-5'>
                        <Table setOpenEditModal={setEditInvoice} Companies={Companies} Customers={Customers} />
                    </div>
                </CardContent>
            </Card>
        </div >

    )
}



