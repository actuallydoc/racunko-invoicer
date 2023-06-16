import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import React from 'react'
import { Button } from '@/components/ui/button'
import { type Service } from '@prisma/client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ServiceCreateModal from './Modals/ServiceCreateModal'
export default function CustomersTab({ Services }: { Services: Service[] }) {

    return (
        <div className="">
            <Card>
                <CardHeader>
                    <CardTitle>Service Table</CardTitle>
                    <CardDescription>Manage your Services here.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 w-full">

                    <div className='space-x-10'>
                        <Dialog modal={true}>
                            <DialogTrigger className=''>
                                <Button variant={'outline'} className='flex space-x-5 '>
                                    Create
                                </Button>
                            </DialogTrigger>
                            <ServiceCreateModal />
                        </Dialog>
                    </div>
                    <div className='mt-5'>
                        <Table>
                            <TableCaption>A list of your recent Services.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Service Name</TableHead>
                                    <TableHead>Service Price</TableHead>
                                    <TableHead>Service Quantity</TableHead>

                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Services?.map((service: Service, index) => (
                                    <TableRow key={index} className='hover:cursor-pointer'>
                                        <TableCell className="font-medium">{service.name}</TableCell>
                                        <TableCell>{service.price as unknown as string}</TableCell>
                                        <TableCell>{service.quantity as unknown as string}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </CardContent>

            </Card>
        </div >
    )
}
