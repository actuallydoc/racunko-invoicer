import React, { useEffect } from 'react'
import type { Partner } from 'types'

export default function CustomerEditModal({ customerState, setShowModal, handleUpdateCustomer, handleDeleteCustomer }: { customerState: Partner, setShowModal: React.Dispatch<React.SetStateAction<boolean>>, handleUpdateCustomer: (customer: Partner) => void, handleDeleteCustomer: (customer: Partner) => void }) {

    const [customer, setCustomer] = React.useState<Partner>(customerState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [e.target.id]: e.target.value });
    }
    const handleUpdateCustomerCb = () => {
        handleUpdateCustomer(customer);
        setShowModal(false);
    }
    const handleDeleteCustomerCb = () => {
        console.log('delete');
        handleDeleteCustomer(customer)
        setShowModal(false);
    }
    useEffect(() => {
        console.log(customerState);
    }, [customerState]);

    return (
        <div className=" bg-gray-100">
            <div className="flex items-center justify-center h-full">
                <div className="w-full max-w-md">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <div className='pb-5'>
                                <button onClick={() => setShowModal(false)} className="text-3xl font-bold text-gray-500 hover:text-gray-400">&times;</button>
                            </div>
                            <div className='flex space-x-8'>

                                <div className='flex-col'>
                                    <div className='mb-6'>

                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                            Customer Name
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="name"
                                            value={customer.name}
                                            placeholder="Customer name"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                            Customer Address
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="address"
                                            type="text"
                                            value={customer.address}
                                            placeholder="Customer Address"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                                            Customer Zip
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="zip"
                                            type="text"
                                            value={customer.zip}
                                            placeholder="Customer Zip"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                            Customer City
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="city"
                                            type="text"
                                            value={customer.city}
                                            placeholder="Customer City"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                            Customer Country
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="country"
                                            type="text"
                                            value={customer.country}
                                            placeholder="Customer Country"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                            Customer Phone
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="phone"
                                            type="text"
                                            value={customer.phone}
                                            placeholder="Customer Phone"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Customer Email
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="text"
                                            value={customer.email as string}
                                            placeholder="Customer Email"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                                            Customer Website
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="website"
                                            type="text"
                                            value={customer.website as string}
                                            placeholder="Customer Website"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vat">
                                            Customer VAT (Optional)
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="vat"
                                            type="text"
                                            value={customer.vat as string}
                                            placeholder="Customer Vat"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleUpdateCustomerCb}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={handleDeleteCustomerCb}
                                    className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </form>
                </div>
            </div >
        </div >
    )
}

