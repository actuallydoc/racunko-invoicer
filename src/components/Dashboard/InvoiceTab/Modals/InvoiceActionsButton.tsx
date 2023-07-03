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
import { useState } from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Status = "Unpaid" | "Paid" | "Overdue" | "Refunded" | "Cancelled"

const status = ["Unpaid", "Paid", "Overdue", "Refunded", "Cancelled"]
type Checked = DropdownMenuCheckboxItemProps["checked"]
export function InvoiceActionsButton() {
    // Get this from the invoice

    const [status, setStatus] = useState<Status>("Unpaid")
    const [showActivityBar, setShowActivityBar] = useState<Checked>(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="mt-2">
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Invoice Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div>
                        <Dialog modal={true}>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    Edit
                                </DropdownMenuItem>
                            </DialogTrigger>
                            <InvoiceEditModal />
                        </Dialog>
                    </div>


                    {/* <DropdownMenuShortcut>⇧+del</DropdownMenuShortcut> */}

                    <DropdownMenuItem>
                        Export as PDF
                    </DropdownMenuItem>
                    <DropdownMenuGroup>
                        {/* Add  */}
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Mark as </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuCheckboxItem
                                        checked={showActivityBar}
                                        onCheckedChange={setShowActivityBar}
                                    >
                                        Paid
                                    </DropdownMenuCheckboxItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuItem>
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
