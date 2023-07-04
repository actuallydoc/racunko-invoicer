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

const FormSchema = z.object({
    serviceName: z.string().min(3, { message: 'Service Name must be at least 3 characters long' }),
    serviceDescription: z.string().min(3, { message: 'Service Description must be at least 3 characters long' }),
    serviceQuantity: z.string().min(1, { message: 'Service Quantity must be at least 1' }),
    servicePrice: z.string().min(1, { message: 'Service Price must be at least 1' }),
})

export default function ServiceCreateModal() {
    const { toast } = useToast();
    const { data: sessionData } = useSession();
    const createService = api.service.create.useMutation();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema)
    });
    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: 'Creating company',
            description: (
                <div className='flex flex-col space-y-2'>
                    <p>{JSON.stringify(data)}</p>
                </div>
            )
        })
        try {
            console.log(data);
            await createService.mutateAsync({
                description: data.serviceDescription,
                name: data.serviceName,
                price: parseInt(data.servicePrice),
                quantity: parseInt(data.serviceQuantity),
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
                    <DialogTitle>Create Company</DialogTitle>
                    <DialogDescription>
                        After pressing Create button you will create a new Company.
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
                                <Button type="submit">Create</Button>
                            </form>
                        </Form>

                    </CardContent>
                </Card>
            </motion.div>
        </DialogContent>
    )
}

