/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useToast } from "@/components/ui/use-toast"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { api } from "@/utils/api"
import { useSession } from "next-auth/react"
import type { Service } from "@prisma/client"

const FormValidation = z.object({
    serviceName: z.string().min(3, { message: 'Service Name must be at least 3 characters long' }),
    serviceDescription: z.string().min(3, { message: 'Service Description must be at least 3 characters long' }),
    serviceQuantity: z.string().min(1, { message: 'Service Quantity must be at least 1' }),
    servicePrice: z.string().min(1, { message: 'Service Price must be at least 1' }),
})


export default function ServiceEditModal({ service }: { service: Service }) {
    const { data: sessionData } = useSession();
    const { toast } = useToast();
    const updateService = api.service.update.useMutation();
    const form = useForm<z.infer<typeof FormValidation>>({
        resolver: zodResolver(FormValidation),
        defaultValues: {
            serviceName: service.name,
            serviceDescription: service.description as string,
            serviceQuantity: service.quantity.toString(),
            servicePrice: service.price.toString(),
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
                quantity: parseInt(data.serviceQuantity),
                price: parseInt(data.servicePrice),
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
        <DialogContent>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            > <DialogHeader>
                    <DialogTitle>Edit Service</DialogTitle>
                    <DialogDescription>
                        After pressing Edit button you will edit an existing service
                    </DialogDescription>
                </DialogHeader>
                <Card className="p-2">

                    <CardContent className="space-y-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3  space-y-6">
                                <div className="grid grid-cols-4 ">
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
                                                    <Input placeholder="Description" {...field} />
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
                                                    <Input placeholder="Quantity" type="number" min={1} {...field} />
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
                                                    <Input placeholder="Price" type="number"{...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                </div>
                                <Button type="submit">Edit</Button>
                            </form>
                        </Form>

                    </CardContent>
                </Card>
            </motion.div>
        </DialogContent>
    )
}

