import React from 'react'
import type { Service } from 'types'

export default function ServiceItem({ service, deleteCallBack, handleServiceChange }: { service: Service, deleteCallBack: (id: string) => void, handleServiceChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => void }) {
    const handleDelete = () => {
        deleteCallBack(service.id as string)
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: string) => {
        handleServiceChange(e, id)
    }
    return (
        <div className=''>
            <hr className="border-gray-300 my-2 border-2" />
            <div className="flex items-center justify-between space-x-3">
                <div>
                    <div>
                        <label htmlFor="name" className="text-sm">Service Name</label>
                    </div>
                    <div>
                        <input onChange={(e) => {
                            handleChange(e, service.id as string)
                        }} name='name' type="text" className="w-1/2 border border-gray-300 rounded-md px-2 py-1" defaultValue={service.name as string} />
                    </div>
                </div>
                <div>
                    <div className='flex-col'>
                        <div>
                            <label htmlFor="quantity" className="text-sm">Quantity</label>
                        </div>
                        <input onChange={(e) => {
                            handleChange(e, service.id as string)
                        }} type="number" name='quantity' className="w-1/4 border border-gray-300 rounded-md px-2 py-1" defaultValue={1} />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="text-sm">Description</label>
                    <textarea placeholder='Description' name='description' onChange={(e) => {
                        handleChange(e, service.id as string)
                    }} className="w-full border border-gray-300 rounded-md px-2 py-1" defaultValue={service.description as string} />
                </div>
                <div className='flex-col'>
                    <div>
                        <label htmlFor="price" className="text-sm">Price</label>
                    </div>
                    <div className=''>
                        <input onChange={(e) => {
                            handleChange(e, service.id as string)
                        }} type="number" name='price' className="w-1/4 border  border-gray-300 rounded-md px-2 py-1" defaultValue={service.price as number} />
                    </div>
                </div>
                <div>
                    <button className="border border-gray-300 bg-red-600 text-white rounded-md px-2 py-1" onClick={handleDelete}>Delete</button>
                </div>

            </div>
        </div>


    )
}
