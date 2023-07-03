import React, { useEffect, useState } from 'react'

import "flatpickr/dist/themes/material_green.css";
import type { Invoice } from '@prisma/client';
import { api } from '@/utils/api';

import { Button } from "@/components/ui/button"

import { useSelector, useDispatch } from 'react-redux';
import { invoiceSlice, type RootState } from '@/stores/invoiceSlice';
import { DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import ServiceCreateItem from './ServiceCreateItem';
import { Card, CardContent } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { DialogClose } from '@radix-ui/react-dialog';


export default function InvoiceEditModal({ invoice, setEdit }: { invoice: Invoice, close: React.Dispatch<React.SetStateAction<boolean>> }) {
    useEffect(() => { console.log("InvoiceEditModal") }, [])
    const { data: sessionData } = useSession()
    const { data: companies } = api.company.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { data: customers } = api.partner.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const { toast } = useToast();

    const invoiceSelector = useSelector((state: RootState) => state.editItem);

    const handleGenerateInvoice = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        //Create a Blob and open it in a new window
        // TODO This is curently not working the template is broken
        e.preventDefault();
        // const blob = generatePDFInvoice(invoiceSelector);
        // console.log("Blob is: ",);
        // window.open(blob, "_blank")
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
                    <DialogClose>
                        <Button onClick={() => setEdit(false)}>
                            Save
                        </Button>
                    </DialogClose>
                </CardContent>
            </Card>
        </DialogContent >
    )
}

