
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { invoiceSlice } from '@/stores/invoiceSlice'
import type { Service } from 'types'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
export default function ServiceEditCreateItem({ service }: { service: Service }) {
    const invoiceDispatch = useDispatch()
    const [serviceState, setServiceState] = React.useState<Service>(service);
    const handleDelete = (service: Service) => {
        invoiceDispatch(invoiceSlice.actions.removeCreateService({
            service: service
        }))
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setServiceState({
            ...serviceState,
            [name]: value
        })

    };
    useEffect(() => {

        invoiceDispatch(invoiceSlice.actions.updateService({
            service: serviceState,
        }))
    }, [serviceState, invoiceDispatch])

    return (
        <div>
            <hr className=" my-2 border-2 mt-3 mb-3" />
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea placeholder='Description' name='description' onChange={(e) => {
                        handleInputChange(e);

                    }} defaultValue={service.description} />
                </div>
                <div>
                    <div className='flex-col'>
                        <div>
                            <Label htmlFor="quantity" >Quantity</Label>
                        </div>
                        <Input onChange={(e) => {
                            handleInputChange(e);
                        }} type="number" name='quantity' min={1} defaultValue={service.quantity} />
                    </div>
                </div>
                <div className='flex-col'>
                    <div>
                        <Label htmlFor="price" >Price</Label>
                    </div>
                    <div className=''>
                        <Input onChange={(e) => {
                            handleInputChange(e);

                        }} type="number" name='price' defaultValue={service.price} />
                    </div>
                </div>
                <div>
                    <Button className='mt-6' variant={"destructive"} onClick={() => handleDelete(service)}>Delete</Button>
                </div>

            </div>
        </div>


    )
}
