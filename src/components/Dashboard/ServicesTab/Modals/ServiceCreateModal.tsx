/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { Form, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'

const FormValidation = z.object({
    serviceName: z.string().min(3, { message: 'Service Name must be at least 3 characters long' }),
    serviceDescription: z.string().min(3, { message: 'Service Description must be at least 3 characters long' }),
    serviceQuantity: z.number().min(1, { message: 'Service Quantity must be at least 1' }),
    servicePrice: z.number().min(1, { message: 'Service Price must be at least 1' }),
})

// TODO: Fix this component some kind of useForm problem # react_hook_form__WEBPACK_IMPORTED_MODULE_4__.useFormContext)(...
export default function ServiceCreateModal() {
    const { data: sessionData } = useSession();
    const createService = api.service.create.useMutation();
    const form = useForm<z.infer<typeof FormValidation>>({
        resolver: zodResolver(FormValidation),
    });
    const onSubmit = async (data: z.infer<typeof FormValidation>) => {
        try {
            console.log(data);
            await createService.mutateAsync({
                description: data.serviceDescription,
                name: data.serviceName,
                price: data.servicePrice,
                quantity: data.serviceQuantity,
                id: sessionData?.user?.id as string
            }, {
                onSuccess: () => {
                    toast({
                        title: "Service Created",
                        description: "Service has been created successfully",
                    })
                    form.reset();
                },
                onError: (error) => {
                    toast({
                        title: "Service Creation Failed",
                        description: error.message,
                    })
                }
            });
        } catch (error) {
            toast({
                title: "Service Creation Failed",
                description: "Something went wrong",
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
                    <DialogTitle>Create Customer</DialogTitle>
                    <DialogDescription>
                        After pressing Create button you will create a new Customer for your company.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid">
                    <Card className='w-fit p-2'>
                        <CardContent className='space-y-5'>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3  space-y-6">
                                    <div className="grid grid-cols-2 gap-3">
                                        <FormField
                                            control={form.control}
                                            name="serviceName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Service Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Service Name" {...field} />
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
                                                    <FormLabel>Description</FormLabel>
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
                                            Create
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

