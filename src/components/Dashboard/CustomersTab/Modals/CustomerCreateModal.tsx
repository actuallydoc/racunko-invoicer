import { Card, CardContent } from '@/components/ui/card'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent } from '@/components/ui/dialog'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { DevTool } from "@hookform/devtools";
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/components/ui/use-toast'
import { api } from '@/utils/api'
import { useSession } from 'next-auth/react'
import { DialogClose } from '@radix-ui/react-dialog'

const FormData = z.object({
    customerName: z.string(),
    customerAddress: z.string(),
    customerCity: z.string(),
    customerZip: z.string(),
    customerCountry: z.string(),
    customerEmail: z.string(),
    customerPhone: z.string(),
    customerVat: z.string().optional(),
    customerWebsite: z.string(),
})

type FormData = z.infer<typeof FormData>


const ValidationSchema = z.object({
    customerName: z.string().min(3, { message: "Customer name has to be longer" }).max(255),
    customerAddress: z.string().min(3, { message: "Customer Address has to be valid" }).max(255),
    customerCity: z.string().min(1, { message: "Customer City is required" }).max(255),
    customerZip: z.string().min(3, { message: "Customer Zip has to be valid" }).max(255),
    customerCountry: z.string().min(3, { message: "Customer Country has to be valid" }).max(255),
    customerEmail: z.string().email({ message: "Customer Email has to be valid" }),
    customerPhone: z.string().min(6, { message: "Customer Phone has to be valid" }).max(255),
    customerVat: z.string().optional(),
    customerWebsite: z.string().min(3).max(255).optional(),
})
type ValidationSchema = z.infer<typeof ValidationSchema>
// Use this here https://ui.shadcn.com/docs/components/date-picker#react-hook-form
export default function CustomerCreateModal() {
    const { data: sessionData } = useSession();
    const customerCreate = api.partner.createPartner.useMutation();
    const { register, control, handleSubmit, reset, formState,
        formState: { isSubmitSuccessful }
    } = useForm<ValidationSchema>({
        resolver: zodResolver(ValidationSchema),
    });
    const onSubmit = (data: FormData) => {
        customerCreate.mutate({
            name: data.customerName,
            address: data.customerAddress,
            city: data.customerCity,
            zip: data.customerZip,
            country: data.customerCountry,
            email: data.customerEmail,
            phone: data.customerPhone,
            vat: data.customerVat as string,
            user_id: sessionData?.user?.id as string,
            website: data.customerWebsite,
        }, {
            onSuccess: () => {
                toast({
                    title: "Customer Created",
                    description: "Customer has been created successfully",
                })
            }
        });
    }
    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset();
        }
    }, [formState, reset]);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Create Customer</DialogTitle>
                <DialogDescription>
                    After pressing Create button you will create a new Customer for your company.
                </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
                <Card>
                    <CardContent>
                        <form className='space-y-8' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex space-x-10'>
                                <div className='flex-col'>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerName">
                                            Customer Name
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerName')}
                                            type="text"
                                            placeholder="Customer Name"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerAddress">
                                            Customer Address
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerAddress')}
                                            type="text"
                                            placeholder="Customer Address"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerCity">
                                            Customer City
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerCity')}
                                            type="text"
                                            placeholder="Customer City"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerZip">
                                            Customer Zip
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerZip')}
                                            type="text"
                                            placeholder="Customer Zip"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerCountry">
                                            Customer Country
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerCountry')}
                                            type="text"
                                            placeholder="Customer Country"
                                        />
                                    </div>
                                </div>
                                <div className='flex-col'>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerPhone">
                                            Customer Phone
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerPhone')}
                                            type="text"
                                            placeholder="Customer Phone"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerEmail">
                                            Customer Email
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerEmail')}
                                            type="email"
                                            placeholder="Customer Email"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerWebsite">
                                            Customer Website
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerWebsite')}
                                            type="text"
                                            placeholder="Customer Website"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="customerVat">
                                            Customer VAT
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('customerVat')}
                                            type="text"
                                            placeholder="Customer VAT"
                                        />
                                    </div>
                                </div>
                            </div>

                            <Button type='submit'>
                                Create
                            </Button>


                        </form>
                    </CardContent>
                </Card>
            </div>
            {/* <DevTool control={control} /> */}
        </DialogContent >
    )
}

