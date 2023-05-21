import React from 'react'
import type { Company } from 'types'

export default function CompanyCreateModal({ companyState, setShowModal, handleCreateCompany }: { companyState: React.Dispatch<React.SetStateAction<Company>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>, handleCreateCompany: () => void }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        companyState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))

        console.log(e.target.id + ' ' + e.target.value)
    }

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
                                            Company Name
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="name"
                                            placeholder="Company name"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                                            Company Address
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="address"
                                            type="text"
                                            placeholder="Company Address"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zip">
                                            Company Zip
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="zip"
                                            type="text"
                                            placeholder="Company Zip"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                                            Company City
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="city"
                                            type="text"
                                            placeholder="Company City"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                                            Company Country
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="country"
                                            type="text"
                                            placeholder="Company Country"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                            Company Phone
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="phone"
                                            type="text"
                                            placeholder="Company Phone"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                            Company Email
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="email"
                                            type="text"
                                            placeholder="Company Email"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
                                            Company Website
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="website"
                                            type="text"
                                            placeholder="Company Website"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vat">
                                            Company VAT
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="vat"
                                            type="text"
                                            placeholder="Company Vat"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleCreateCompany}
                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="button"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

