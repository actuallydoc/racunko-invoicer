import React, { useEffect, useState } from 'react'
import CustomerCreateModal from './Modals/CustomerCreateModal';
import { api } from '@/utils/api';
import CustomerEditModal from './Modals/CustomerEditModal';
import type { Partner } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { type RootState } from '@/stores/invoiceSlice';
import { DialogHeader, DialogTrigger, Dialog, DialogContent } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function CustomersTab() {
    const partnerSelector = useSelector((state: RootState) => state.partners);
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>Manage your customers</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-6 w-auto'>
                    <Dialog modal={true}>
                        <DialogTrigger className='w-fit'>
                            <Button variant={"outline"} className='flex items-center space-x-2'>
                                Create
                            </Button>
                        </DialogTrigger>
                        <CustomerCreateModal />
                    </Dialog>
                    <div className='flex space-x-2'>
                        <Table >
                            <TableCaption>A list of your recent customers.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Customer name</TableHead>
                                    <TableHead>Customer Address</TableHead>
                                    <TableHead>Customer Country</TableHead>
                                    <TableHead>Customer VAT</TableHead>
                                    <TableHead>Customer Phone</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {partnerSelector?.map((partner: Partner, index) => (
                                    <TableRow key={index} className='hover:cursor-pointer'>
                                        <TableCell className="font-medium">{partner.name}</TableCell>
                                        <TableCell>{partner.address}</TableCell>
                                        <TableCell>{partner.country}</TableCell>
                                        <TableCell>{partner.vat}</TableCell>
                                        <TableCell>{partner.phone}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div >
    )
}
