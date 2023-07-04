/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogHeader, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { invoiceSlice } from '@/stores/invoiceSlice';
import { api } from '@/utils/api';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Partner } from '@prisma/client'
import { motion } from 'framer-motion'
import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from "zod"
const FormSchema = z.object({
    customerName: z.string().nonempty({ message: 'Name is required' }),
    customerAddress: z.string().nonempty({ message: 'Address is required' }),
    customerCity: z.string().nonempty({ message: 'City is required' }),
    customerZip: z.string().nonempty({ message: 'Zip is required' }),
    customerCountry: z.string().nonempty({ message: 'Country is required' }),
    customerEmail: z.string().nonempty({ message: 'Email is required' }),
    customerPhone: z.string().nonempty({ message: 'Phone is required' }),
    customerWebsite: z.string().optional(),
    customerVat: z.string().optional(),
});



export default function CustomerEditModal({ partner }: { partner: Partner }) {
    const customerDelete = api.partner.deletePartner.useMutation();
    const customerEdit = api.partner.updatePartner.useMutation();
    const customerDispatch = useDispatch();
    const { data: sessionData } = useSession({ required: true });

    const { data: customerData, refetch: refetchCustomers } = api.partner.getAll.useQuery({ id: partner.userId as string });
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            customerAddress: partner.address,
            customerCity: partner.city,
            customerCountry: partner.country,
            customerEmail: partner.email,
            customerName: partner.name,
            customerPhone: partner.phone,
            customerVat: partner.vat as string,
            customerWebsite: partner.website as string,
            customerZip: partner.zip,
        }
    });
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await customerDelete.mutateAsync({
                id: partner.id,
            }, {
                onSuccess: () => {
                    toast({
                        title: 'Partner Deleted',
                        description: 'Partner has been deleted successfully',
                    })
                    refetchCustomers().then(() => {
                        customerDispatch(invoiceSlice.actions.initPartners({
                            partners: customerData as Partner[]
                        }))
                    }).catch(() => {
                        toast({
                            title: 'Error',
                            description: 'Something went wrong',
                        })
                    })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: error.message,
                    })
                }
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
        }
    }
    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        try {
            await customerEdit.mutateAsync({
                id: partner.id,
                address: data.customerAddress,
                city: data.customerCity,
                country: data.customerCountry,
                email: data.customerEmail,
                name: data.customerName,
                phone: data.customerPhone,
                vat: data.customerVat as string,
                website: data.customerWebsite as string,
                zip: data.customerZip,
                user_id: sessionData?.user?.id as string,
            }, {
                onSuccess: () => {
                    toast({
                        title: 'Partner Edited',
                        description: 'Partner has been edited successfully',
                    })
                    refetchCustomers().then(() => {
                        customerDispatch(invoiceSlice.actions.initPartners({
                            partners: customerData as Partner[]
                        }))
                    }).catch(() => {
                        toast({
                            title: 'Error',
                            description: 'Something went wrong',
                        })
                    })

                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: error.message,
                    })
                }
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong',
            })
        }
    }

    return (
        <DialogContent className='w-fit'>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}

                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <DialogHeader>
                    <DialogTitle>Edit Customer</DialogTitle>
                    <DialogDescription>
                        After pressing Edit button you will edit an existing Customer.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid">
                    <Card className='w-fit p-2'>
                        <CardContent className="space-y-5">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3  space-y-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="customerName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Name" {...field} />
                                                    </FormControl>
                                                    {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="customerAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="customerCity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="City" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="customerZip"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Zip</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Zip" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="customerCountry"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Country" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="customerEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="customerPhone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Phone" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="customerWebsite"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Website</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Website" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="customerVat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Customer Vat</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Vat" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='space-x-3'>
                                        <Button type="submit">Edit</Button>
                                        <Button variant="destructive" type='button' onClick={handleDelete}>Delete</Button>

                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </DialogContent >

    )
}
