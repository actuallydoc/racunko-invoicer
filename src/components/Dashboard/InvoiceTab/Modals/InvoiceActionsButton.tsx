import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
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
import InvoiceEditModal from "./InvoiceEditModal"
import { useEffect, useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Invoice } from "@prisma/client"
import { api } from "@/utils/api"
import { toast } from "@/components/ui/use-toast"

type Status = "Unpaid" | "Paid" | "Overdue" | "Refunded" | "Cancelled" | "Draft"

const statusConsts: Status[] = ["Unpaid", "Paid", "Overdue", "Refunded", "Cancelled", "Draft"]
type Checked = DropdownMenuCheckboxItemProps["checked"]
export function InvoiceActionsButton({ invoice }: { invoice: Invoice }) {
    // Get this from the invoice
    const deleteInvoice = api.invoice.deleteInvoice.useMutation();
    const changeInvoiceStatus = api.invoice.editInvoice.useMutation();
    const [entryStatus, setEntryStatus] = useState<Status>(invoice.status as Status);

    const [edit, setEdit] = useState(false);

    const changeStatus = (status: Status) => {
        changeInvoiceStatus.mutate({
            ...invoice,
            status: status,

        }, {
            onSuccess: () => {
                toast({
                    title: "Invoice Status Changed",
                    description: "Invoice status has been changed successfully",
                })
            },
        })

    }
    const handleDelete = () => {
        deleteInvoice.mutate({
            id: invoice.id
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
        <DropdownMenu>
            <DropdownMenuTrigger className="mt-2">
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Invoice Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setEdit(true)}>
                        Edit
                    </DropdownMenuItem>
                    {/* <DropdownMenuShortcut>⇧+del</DropdownMenuShortcut> */}
                    <DropdownMenuItem>
                        Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Mark as </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    {statusConsts.map(item => (
                                        // You should change the status of the invoice in the database here when the user clicks on the item
                                        <DropdownMenuCheckboxItem key={item} checked={entryStatus === item} onClick={() => {
                                            setEntryStatus(item)
                                            changeStatus(item)
                                        }}>
                                            {item}
                                        </DropdownMenuCheckboxItem>
                                    ))}
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleDelete}>
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
    )
}
