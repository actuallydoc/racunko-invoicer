import React from 'react'
import type { Service } from 'types'

export default function ServiceCreateModal({ serviceState, setShowModal, handleCreateService }: { serviceState: React.Dispatch<React.SetStateAction<Service>>, setShowModal: React.Dispatch<React.SetStateAction<boolean>>, handleCreateService: () => void }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        serviceState((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
            price: parseInt(e.target.value),
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
                                            Service Name
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="name"
                                            type="name"
                                            placeholder="Service name"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                            Service Description
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="description"
                                            type="text"
                                            placeholder="Service Description"
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                            Service Price
                                        </label>
                                        <input
                                            onChange={handleChange}
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="price"
                                            type="number"
                                            placeholder="Service Price"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={handleCreateService}
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

