import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { api } from '@/utils/api';
import { useSession } from 'next-auth/react';
import React from 'react'
import { useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { useToast } from '@/components/ui/use-toast';

type Company = {
    companyName: string;
    companyAddress: string;
    companyCity: string;
    companyZip: string;
    companyCountry: string;
    companyEmail: string;
    companyPhone: string;
    companyVat: string;
    companyWebsite?: string | null;
};


export default function CompanyCreateModal() {
    const createCompany = api.company.createCompany.useMutation();
    const { register, control, handleSubmit, reset } = useForm();
    const { toast } = useToast();
    const { data: sessionData } = useSession({ required: true });
    const onSubmit = (data: Company) => {
        createCompany.mutate({
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
                reset();
            },
            onError: (error) => {
                toast({
                    title: 'Error',
                    description: error.message,
                })
            }
        });
    };

    return (
        <DialogContent className='w-fit'>
            <DialogHeader>
                <DialogTitle>Create Company</DialogTitle>
                <DialogDescription>
                    After pressing Create button you will create a new Company.
                </DialogDescription>
            </DialogHeader>
            <div className="grid">
                <Card className='w-fit p-2'>
                    <CardContent>
                        <form className='flex-col' onSubmit={handleSubmit(onSubmit)}>
                            <div className='flex-col space-y-5'>
                                <div className='flex space-x-5'>
                                    <div>
                                        <Label className="text-sm font-bold " htmlFor="companyName">
                                            Company Name
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyName')}
                                            type="text"
                                            placeholder="Company Name"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyAddress">
                                            Company Address
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyAddress')}
                                            type="text"
                                            placeholder="Company Address"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyCity">
                                            Company City
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyCity')}
                                            type="text"
                                            placeholder="Company City"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyZip">
                                            Company Zip
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyZip')}
                                            type="text"
                                            placeholder="Company Zip"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyCountry">
                                            Company Country
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyCountry')}
                                            type="text"
                                            placeholder="Company Country"
                                        />
                                    </div>
                                </div>
                                <div className='flex space-x-5'>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyPhone">
                                            Company Phone
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyPhone')}
                                            type="text"
                                            placeholder="Company Phone"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyEmail">
                                            Company Email
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyEmail')}
                                            type="email"
                                            placeholder="Company Email"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyWebsite">
                                            Company Website
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyWebsite')}
                                            type="text"
                                            placeholder="Company Website"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-sm font-bold mb-2" htmlFor="companyVat">
                                            Company VAT
                                        </Label>
                                        <Input
                                            className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                            {...register('companyVat')}
                                            type="text"
                                            placeholder="Company VAT"
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button className='mr-auto mt-5' type="submit">Create</Button>
                            </DialogFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </DialogContent >

    )
}

