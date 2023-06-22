/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const FormSchema = z.object({
    companyName: z.string().min(3, {
        message: "Compay name must be at least 3 characters.",
    }),
    companyAddress: z.string().min(3, {
        message: "Compay address must be at least 3 characters.",
    }),
    companyCity: z.string().min(3, {
        message: "Compay city must be at least 3 characters.",
    }),
    companyZip: z.string().min(3, {
        message: "Compay zip must be at least 3 characters.",
    }),
    companyCountry: z.string().min(3, {
        message: "Compay country must be at least 3 characters.",
    }),
    companyPhone: z.string().min(3, {
        message: "Compay phone must be at least 3 characters.",
    }),
    companyEmail: z.string().email({
        message: "Invalid email address.",
    }),
    companyWebsite: z.string().url({
        message: "Invalid website url.",
    }).optional(),
    companyVat: z.string().min(3, {
        message: "Compay vat must be at least 3 characters.",
    }),
    companyId: z.string().min(3, {
        message: "Compay id must be at least 3 characters.",
    }),

})




export default function CompanyCreateModal() {
    const createCompany = api.company.createCompany.useMutation();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });
    const { toast } = useToast();
    const { data: sessionData } = useSession({ required: true });


    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        toast({
            title: 'Creating company',
            description: (
                <div className='flex flex-col space-y-2'>
                    <p>{JSON.stringify(data)}</p>
                </div>
            )
        })
        try {
            await createCompany.mutateAsync({
                address: data.companyAddress,
                city: data.companyCity,
                name: data.companyName,
                zip: data.companyZip,
                country: data.companyCountry,
                email: data.companyEmail,
                phone: data.companyPhone,
                vat: data.companyVat,
                website: data.companyWebsite as string,
                user_id: sessionData?.user?.id as string
            }, {
                onSuccess: () => {
                    toast({
                        title: 'Company created',
                        description: 'Company has been created successfully',
                    })
                    form.reset();
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
                    <DialogTitle>Create Company</DialogTitle>
                    <DialogDescription>
                        After pressing Create button you will create a new Company.
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
                                            name="companyName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Name</FormLabel>
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
                                            name="companyAddress"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Address" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="companyCity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company City</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="City" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="companyZip"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Zip</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Zip" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="companyCountry"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Country</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Country" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="companyEmail"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Email</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Email" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="companyPhone"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Phone</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Phone" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="companyWebsite"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Website</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Website" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="companyVat"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Company Vat</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Vat" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <Button type="submit">Submit</Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </motion.div>
        </DialogContent >

    )
}

