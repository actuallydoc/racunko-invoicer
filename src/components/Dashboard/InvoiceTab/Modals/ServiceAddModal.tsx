import React from 'react'

export default function ServiceAddModal() {
    const handleCloseModal = () => {
        console.log('close')
    }
    return (
        <div>
            <div className=" bg-gray-100">
                <div className="flex items-center justify-center h-full">
                    <div className="w-full ">
                        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                            <div className="mb-4">
                                <div className='pb-5'>
                                    <button onClick={handleCloseModal} className="text-3xl font-bold text-gray-500 hover:text-gray-400">&times;</button>
                                </div>

                                <div className='flex pb-10 space-x-5'>
                                    <div className='flex-col'>

                                        <div>
                                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                                                Service window
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
