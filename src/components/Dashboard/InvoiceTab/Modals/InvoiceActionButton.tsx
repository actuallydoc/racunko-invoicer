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
import type { InvoiceSerialized, InvoiceType } from 'types';
import { toast } from '@/components/ui/use-toast';
import type { Invoice } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import InvoiceEditModal from './InvoiceEditModal';
import { useDispatch } from 'react-redux';
import { invoiceSlice } from '@/stores/invoiceSlice';
import generatePDFInvoice from '@/utils/invoicer';
import { useSession } from 'next-auth/react';

type Status = "Unpaid" | "Paid" | "Overdue" | "Refunded" | "Cancelled" | "Draft"

const statusConsts: Status[] = ["Unpaid", "Paid", "Overdue", "Refunded", "Cancelled", "Draft"]
// TODO: Add all the functionality to this component
export default function InvoiceActionsButton({ invoice }: { invoice: Invoice }) {
    const deleteInvoice = api.invoice.deleteInvoice.useMutation();
    const changeInvoiceStatus = api.invoice.updateStatus.useMutation();
    const { data: sessionData } = useSession({ required: true });
    const [edit, setEdit] = useState(false);
    const invoiceDispatch = useDispatch();
    const { data: invoiceData, refetch: refetchInvoices } = api.invoice.getAll.useQuery({
        id: sessionData?.user?.id as string
    })

    const generateInvoicePDF = (invoice: InvoiceSerialized) => {
        const blob = generatePDFInvoice(invoice);
        console.log("Blob is: ",);
        window.open(blob, "_blank")
    }

    const changeStatus = (status: Status, invoice: InvoiceSerialized) => {
        changeInvoiceStatus.mutate({
            id: invoice.id,
            status: status,

        }, {
            onSuccess: () => {
                toast({
                    title: "Invoice Status Changed",
                    description: "Invoice status has been changed successfully",
                })
                refetchInvoices().then(() => {
                    invoiceDispatch(invoiceSlice.actions.initInvoices(invoiceData as InvoiceType[]))
                }).catch((err) => {
                    console.log("Error in refetching invoices: ", err);
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
                refetchInvoices().then(() => {
                    invoiceDispatch(invoiceSlice.actions.initInvoices(invoiceData as InvoiceType[]))
                }).catch((err) => {
                    console.log("Error in refetching invoices: ", err);
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
                                        <DropdownMenuItem onClick={() => generateInvoicePDF(invoice as InvoiceSerialized)}>PDF</DropdownMenuItem>
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
                                            <DropdownMenuCheckboxItem key={item} checked={invoice.status === item ? true : false} onClick={() => {
                                                changeStatus(item, invoice as InvoiceSerialized)
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
