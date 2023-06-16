import React from 'react'
import { Service } from '@prisma/client'
import { Card, CardContent } from '@/components/ui/card'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent } from '@/components/ui/dialog'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

type ServiceForm = {
    serviceName: string;
    serviceDescription: string;
    serviceQuantity: number;
    servicePrice: number;
}

export default function ServiceCreateModal() {
    const { data: sessionData } = useSession();
    const createService = api.service.create.useMutation();
    const { register, handleSubmit, reset,
    } = useForm<ServiceForm>();
    const onSubmit = (data: ServiceForm) => {
        console.log(data);
        createService.mutate({
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
                reset();
            },
            onError: (error) => {
                toast({
                    title: "Service Creation Failed",
                    description: error.message,

                })
            }

        })
    };
    return (
        <DialogContent className='w-fit'>
            <DialogHeader>
                <DialogTitle>Create Customer</DialogTitle>
                <DialogDescription>
                    After pressing Create button you will create a new Customer for your company.
                </DialogDescription>
            </DialogHeader>
            <div className="grid">
                <Card className='w-fit p-2'>
                    <CardContent>
                        <form className='' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex-col space-y-5'>
                                <div className='flex space-x-5'>
                                    <div>
                                        <Label className="text-sm font-bold " htmlFor="serviceName">
                                            Service Name
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('serviceName')}
                                            type="text"
                                            placeholder="Service Name"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="serviceDescription">
                                            Service Description
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('serviceDescription')}
                                            type="text"
                                            placeholder="Service Description"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="serviceQuantity">
                                            Service Quantity
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('serviceQuantity')}
                                            type="number"
                                            placeholder="Service Quantity"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="servicePrice">
                                            Service Price
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('servicePrice')}
                                            type="number"
                                            placeholder="Service Price"
                                        />
                                    </div>

                                </div>
                            </div>
                            <Button type='submit' className='mt-5'>
                                Create
                            </Button>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </DialogContent >
    )
}

