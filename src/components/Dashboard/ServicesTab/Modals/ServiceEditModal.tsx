/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { DialogContent } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { Form, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Service } from '@prisma/client'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const FormValidation = z.object({
    serviceName: z.string().min(3, { message: 'Service Name must be at least 3 characters long' }),
    serviceDescription: z.string().min(3, { message: 'Service Description must be at least 3 characters long' }),
    serviceQuantity: z.number().min(1, { message: 'Service Quantity must be at least 1' }),
    servicePrice: z.number().min(1, { message: 'Service Price must be at least 1' }),
})


export default function ServiceEditModal({ service }: { service: Service }) {
    const { data: sessionData } = useSession();
    const updateService = api.service.update.useMutation();
    const form = useForm<z.infer<typeof FormValidation>>({
        resolver: zodResolver(FormValidation),
        defaultValues: {
            serviceName: service.name,
            serviceDescription: service.description as string,
            serviceQuantity: service.quantity,
            servicePrice: service.price,
        }
    })
    // const updateService = api.service.update.useMutation();
    const onSubmit = async (data: z.infer<typeof FormValidation>) => {
        toast({
            title: "Service Updated",
            description: (
                <div>
                    <p>Service has been updated successfully</p>
                    <p>{JSON.stringify(data)}</p>
                </div>
            )
        })
        try {
            await updateService.mutateAsync({
                serviceId: service.id,
                id: sessionData?.user?.id as string,
                name: data.serviceName,
                description: data.serviceDescription,
                quantity: data.serviceQuantity,
                price: data.servicePrice,
            }, {
                onSuccess: () => {
                    toast({
                        title: "Service Updated",
                        description: "Service has been updated successfully"
                    })
                },
                onError: (error) => {
                    toast({
                        title: 'Error',
                        description: error.message,
                    })
                }
            })
        }
        catch (err) {
            console.log(err)
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
                    <DialogTitle>Create Customer</DialogTitle>
                    <DialogDescription>
                        After pressing Create button you will create a new Customer for your company.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid">
                    <Card className='w-fit p-2'>
                        <CardContent className='space-y-5'>
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3  space-y-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="serviceName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service Name</FormLabel>
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
                                            name="serviceDescription"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service Description</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Description" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="serviceQuantity"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service Quantity</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Quantity" type='number' min={1} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="servicePrice"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service Price</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Price" type='number' min={0} {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type='submit' className='mt-5'>
                                            Edit
                                        </Button>

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

