import React, { useEffect } from 'react'

import type { Service } from 'types'
export default function ServiceItem({ service }: { service: Service }) {
  const handleDelete = () => {
    console.log('====================================');
    console.log('Delete: ', service);
    console.log('====================================');
  }
  // TODO: Implement this to change the service inside the parent "InvoiceEditTab"
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log('====================================');
    console.log('Change: ', service);
    console.log('====================================');

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
              handleChange(e)
            }} name='name' type="text" className="w-1/2 border border-gray-300 rounded-md px-2 py-1" defaultValue={service.name} />
          </div>
        </div>
        <div>
          <div className='flex-col'>
            <div>
              <label htmlFor="quantity" className="text-sm">Quantity</label>
            </div>
            <input onChange={(e) => {
              handleChange(e)
            }} type="number" name='quantity' className="w-1/4 border border-gray-300 rounded-md px-2 py-1" defaultValue={1} />
          </div>
        </div>

        <div>
          <label htmlFor="description" className="text-sm">Description</label>
          <textarea placeholder='Description' name='description' onChange={(e) => {
            handleChange(e)
          }} className="w-full border border-gray-300 rounded-md px-2 py-1" defaultValue={service.description} />
        </div>
        <div className='flex-col'>
          <div>
            <label htmlFor="price" className="text-sm">Price</label>
          </div>
          <div className=''>
            <input onChange={(e) => {
              handleChange(e)
            }} type="number" name='price' className="w-1/4 border  border-gray-300 rounded-md px-2 py-1" defaultValue={service.price} />
          </div>
        </div>
        <div>
          <button className="border border-gray-300 bg-red-600 text-white rounded-md px-2 py-1" onClick={handleDelete}>Delete</button>
        </div>

      </div>
    </div>


  )
}
