import React, { useEffect, useState } from 'react'
import CompanyCreateModal from './Modals/CompanyCreateModal';
import CompanyEditModal from './Modals/CompanyEditModal';
import type { Company } from '@prisma/client';
import { api } from '@/utils/api';

import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export default function CustomersTab({ Companies }: { Companies: Company[] | undefined }) {
    const { data: sessionData } = useSession({ required: true });
    const createCompany = api.company.createCompany.useMutation();
    const updateCompany = api.company.updateCompany.useMutation();
    const deleteCompany = api.company.deleteCompany.useMutation();
    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>Company Management</CardTitle>
                    <CardDescription>Manage your companies</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 w-full">

                    <div className='space-x-10'>
                        <Dialog modal={true}>
                            <DialogTrigger className=''>
                                <Button variant={'outline'} className='flex space-x-5 '>
                                    Create
                                </Button>
                            </DialogTrigger>
                            <CompanyCreateModal />
                        </Dialog>
                    </div>
                    <div className='mt-5'>

                        <Table >
                            <TableCaption>A list of your recent Companies.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Company name</TableHead>
                                    <TableHead>Company Address</TableHead>
                                    <TableHead>Company Country</TableHead>
                                    <TableHead>Company VAT</TableHead>
                                    <TableHead>Company Phone</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Companies?.map((company: Company, index) => (
                                    <TableRow key={index} className='hover:cursor-pointer'>
                                        <TableCell className="font-medium">{company.name}</TableCell>
                                        <TableCell>{company.address}</TableCell>
                                        <TableCell>{company.country}</TableCell>
                                        <TableCell>{company.vat}</TableCell>
                                        <TableCell>{company.phone}</TableCell>
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
