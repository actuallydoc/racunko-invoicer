import React, { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io';
import CustomerCreateModal from './Modals/CustomerCreateModal';
import { api } from '@/utils/api';
import CustomerEditModal from './Modals/CustomerEditModal';
import type { Partner } from '@prisma/client';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { useSelector } from 'react-redux';
import { RootState } from '@/stores/invoiceSlice';
import { Dialog } from '@radix-ui/react-dialog';
import { DialogHeader, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function CustomersTab({ Customers }: { Customers: Partner[] | undefined }) {



    const partnerSelector = useSelector((state: RootState) => state.partners);
    const { data: sessionData } = useSession();
    const createCustomer = api.partner.createPartner.useMutation();
    const updateCustomer = api.partner.updatePartner.useMutation();
    const deleteCustomer = api.partner.deletePartner.useMutation();
    const [showCreateModal, setCreateShowModal] = useState(false);
    const [showUpdateModal, setUpdateShowModal] = useState(false);
    const [tempCustomer, setTempCustomer] = useState<Partner>({} as Partner);
    const [filteredCustomers, setFilteredCustomers] = useState<Partner[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Partner>({} as Partner);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    const handleCreateCustomer = () => {
        setCreateShowModal(false);
        createCustomer.mutate({
            address: tempCustomer.address,
            city: tempCustomer.city,
            country: tempCustomer.country,
            email: tempCustomer.email,
            name: tempCustomer.name,
            phone: tempCustomer.phone,
            user_id: sessionData?.user.id as string,
            vat: tempCustomer.vat,
            zip: tempCustomer.zip,
            website: tempCustomer.website,
        }, {
            onSuccess: () => {
                toast.success('Customer created successfully');
                setCreateShowModal(false);
            }
        })
    };
    const handleUpdateCustomerModal = (customer: Partner) => {
        setSelectedCustomer(customer);
        setUpdateShowModal(true);
    };

    const handleUpdateCustomer = (customer: Partner) => {
        setUpdateShowModal(true);
        updateCustomer.mutate({
            id: customer.id,
            address: customer.address,
            city: customer.city,
            country: customer.country,
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            user_id: sessionData?.user.id as string,
            vat: customer.vat,
            zip: customer.zip,
            website: customer.website,
        }, {
            onSuccess: () => {
                toast.success('Customer updated successfully');
                setUpdateShowModal(false);
            }
        });
        setSelectedCustomer(customer);
    };
    const handleDeleteCustomer = (customer: Partner) => {
        setUpdateShowModal(false);
        console.log(customer);
        deleteCustomer.mutate({
            id: customer.id,
        }, {
            onSuccess: () => {
                toast.success('Customer deleted successfully');
                setUpdateShowModal(false);
            }
        });

    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = Customers?.filter((customer) => {
            return customer.name.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredCustomers(filtered as Partner[]);
        console.log(filtered);
    };
    useEffect(() => {
        setFilteredCustomers(Customers as Partner[]);
    }, [Customers]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>Manage your customers</CardDescription>
                </CardHeader>
                <CardContent className='grid gap-6 w-full'>
                    <div>
                        <Dialog modal={true}>
                            <DialogHeader>
                                <Label>Create Customer</Label>
                            </DialogHeader>
                            <CustomerCreateModal />
                            <DialogTrigger>
                                <Button onClick={handleOpenCreateModal} className='flex items-center space-x-2'>
                                    Create
                                </Button>
                            </DialogTrigger>
                        </Dialog>
                    </div>


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
        </div>
    )
}
