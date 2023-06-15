import { Card, CardContent } from '@/components/ui/card'
import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent } from '@radix-ui/react-dialog'
import React from 'react'


export default function CustomerCreateModal() {
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
                        <div className='flex-col mb-5'>
                            <Label className="text-sm font-bold mb-2" htmlFor="invoiceNumber">
                                Invoice Number
                            </Label>
                            <Input

                                className="shadow appearance-none border rounded  py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                                id="invoiceNumber"
                                type="name"
                                placeholder="Customer Name"

                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </DialogContent>
    )
}

