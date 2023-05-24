import React, { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io';
import CustomerCreateModal from './Modals/CustomerCreateModal';
import Table from './Table/Table';
import type { Partner } from 'types';
import CustomerEditModal from './Modals/CustomerEditModal';

export default function CustomersTab({ Customers, handleCreateCustomerCb, handleUpdateCustomerCb, handleDeleteCustomerCb }: { Customers: Partner[] | undefined, handleCreateCustomerCb: (formState: Partner) => void, handleUpdateCustomerCb: (formState: Partner) => void, handleDeleteCustomerCb: (formState: Partner) => void }) {
    //!TODO SCROLLABLE TABLE
    const [showCreateModal, setCreateShowModal] = useState(false);
    const [showUpdateModal, setUpdateShowModal] = useState(false);
    const [tempCustomer, setTempCustomer] = useState<Partner>({} as Partner);
    const [filteredCustomers, setFilteredCustomers] = useState<Partner[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<Partner>({} as Partner);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    const handleCreateCustomer = () => {
        setCreateShowModal(false);
        handleCreateCustomerCb(tempCustomer);
        console.log(tempCustomer);
    };
    const handleUpdateCustomer = (customer: Partner) => {
        setUpdateShowModal(true);
        handleUpdateCustomerCb(customer);
        setSelectedCustomer(customer);
    };
    const handleDeleteCustomer = (customer: Partner) => {
        setUpdateShowModal(false);
        console.log(customer);
        handleDeleteCustomerCb(customer);

    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = Customers?.filter((customer) => {
            return customer.name.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredCustomers(filtered as Partner[]);
        console.log(filtered);
    };
    useEffect(() => {
        setFilteredCustomers(Customers as Partner[]);
    }, [Customers]);

    return (
        <div className="min-h-screen flex items-center ml-10">
            {showCreateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <CustomerCreateModal customerState={setTempCustomer} handleCreateCustomer={handleCreateCustomer} setShowModal={setCreateShowModal} />
                </div>
            )}
            {showUpdateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <CustomerEditModal handleDeleteCustomer={handleDeleteCustomer} handleUpdateCustomer={handleUpdateCustomer} setShowModal={setUpdateShowModal} customerState={selectedCustomer} />
                </div>
            )}
            <div className="w-10/12 h-[850px] mb-16 bg-white rounded-3xl p-4 border-4">
                <div className='flex space-x-5 '>
                    <div className='flex space-x-5'>
                        <div>
                            <input type="text" onChange={handleFilter} placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" />
                        </div>
                        <div className='w-auto flex space-x-3'>
                            <div>
                                <button onClick={handleOpenCreateModal} className='flex space-x-5 text-black bg-[#D8FAD6] hover:bg-[#0F570A] hover:text-white p-3 rounded-xl'>
                                    <div>
                                        <p>Create</p>
                                    </div>
                                    <div className='pt-1'>
                                        <IoIosCreate />
                                    </div>

                                </button>
                            </div>


                        </div>
                    </div>
                </div>
                <div>
                    <Table Partners={filteredCustomers} editPartner={handleUpdateCustomer} />
                </div>
            </div>
        </div>
    )
}
