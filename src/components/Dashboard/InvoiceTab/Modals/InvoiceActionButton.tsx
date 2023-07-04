import React, { useEffect, useState } from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { api } from '@/utils/api';
import { InvoiceSerialized } from 'types';
import { toast } from '@/components/ui/use-toast';
import { Invoice } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import InvoiceEditModal from './InvoiceEditModal';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceSlice, RootState } from '@/stores/invoiceSlice';

type Status = "Unpaid" | "Paid" | "Overdue" | "Refunded" | "Cancelled" | "Draft"

const statusConsts: Status[] = ["Unpaid", "Paid", "Overdue", "Refunded", "Cancelled", "Draft"]
// TODO: Add all the functionality to this component
export default function InvoiceActionsButton({ invoice }: { invoice: Invoice }) {
    const deleteInvoice = api.invoice.deleteInvoice.useMutation();
    const changeInvoiceStatus = api.invoice.editInvoice.useMutation();
    const editInvoiceDispatch = useDispatch();
    const [edit, setEdit] = useState(false);

    const changeStatus = (status: Status, invoice: InvoiceSerialized) => {
        changeInvoiceStatus.mutate({
            ...invoice,
            status: status,
            companyId: invoice.companyId,
            dueDate: invoice.dueDate,
            id: invoice.id,
            invoiceDate: invoice.invoiceDate,
            invoiceNumber: invoice.invoiceNumber,
            invoiceServiceDate: invoice.invoiceServiceDate,
            partnerId: invoice.partnerId,
            services: JSON.parse(invoice.services as string) as string,

        }, {
            onSuccess: () => {
                toast({
                    title: "Invoice Status Changed",
                    description: "Invoice status has been changed successfully",
                })
            },
        })

    }
    const handleDelete = (id: string) => {
        deleteInvoice.mutate({
            id
        }, {
            onSuccess: () => {
                toast({
                    title: "Invoice Deleted",
                    description: "Invoice has been deleted successfully",
                })
            },
            onError: () => {
                toast({
                    title: "Invoice Not Deleted",
                    description: "Invoice has not been deleted successfully",
                })
            }
        })
    }

    return (
        <div>
            <Dialog open={edit} >
                <InvoiceEditModal setEdit={setEdit} invoice={invoice} />
            </Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger className="mt-2">
                    <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Invoice Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuGroup>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                            setEdit(true)
                        }}>
                            Edit
                        </DropdownMenuItem>

                        {/* <DropdownMenuShortcut>⇧+del</DropdownMenuShortcut> */}
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Export as </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuItem>PDF</DropdownMenuItem>
                                        <DropdownMenuItem>CSV</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>More...</DropdownMenuItem>
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>Mark as </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        {statusConsts.map(item => (
                                            // You should change the status of the invoice in the database here when the user clicks on the item
                                            <DropdownMenuCheckboxItem key={item} checked={invoice.status === status ? true : false} onClick={() => {
                                                changeStatus(item, invoice)
                                            }}>
                                                {item}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                        <DropdownMenuItem onClick={() => handleDelete(invoice.id)}>
                            Delete
                            <DropdownMenuShortcut>⇧+del</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>Team</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Send via </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>Email</DropdownMenuItem>
                                    <DropdownMenuItem>Message</DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>More...</DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>

                    </DropdownMenuGroup>


                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    )
}
