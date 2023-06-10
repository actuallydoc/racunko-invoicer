import React, { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io';
import CustomerCreateModal from './Modals/CustomerCreateModal';
import Table from './Table/Table';
import { api } from '@/utils/api';
import CustomerEditModal from './Modals/CustomerEditModal';
import type { Partner } from '@prisma/client';
import { toast } from 'react-toastify';
import { useSession } from 'next-auth/react';

export default function CustomersTab({ Customers }: { Customers: Partner[] | undefined }) {
    //!TODO SCROLLABLE TABLE
    const { data: sessionData } = useSession();
    const createCustomer = api.partner.createPartner.useMutation();
    const updateCustomer = api.partner.updatePartner.useMutation();
    const deleteCustomer = api.partner.deletePartner.useMutation();
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
        createCustomer.mutate({
            address: tempCustomer.address,
            city: tempCustomer.city,
            country: tempCustomer.country,
            email: tempCustomer.email,
            name: tempCustomer.name,
            phone: tempCustomer.phone,
            user_id: sessionData?.user.id as string,
            vat: tempCustomer.vat,
            zip: tempCustomer.zip,
            website: tempCustomer.website,
        }, {
            onSuccess: () => {
                toast.success('Customer created successfully');
                setCreateShowModal(false);
            }
        })
    };
    const handleUpdateCustomerModal = (customer: Partner) => {
        setSelectedCustomer(customer);
        setUpdateShowModal(true);
    };

    const handleUpdateCustomer = (customer: Partner) => {
        setUpdateShowModal(true);
        updateCustomer.mutate({
            id: customer.id,
            address: customer.address,
            city: customer.city,
            country: customer.country,
            email: customer.email,
            name: customer.name,
            phone: customer.phone,
            user_id: sessionData?.user.id as string,
            vat: customer.vat,
            zip: customer.zip,
            website: customer.website,
        }, {
            onSuccess: () => {
                toast.success('Customer updated successfully');
                setUpdateShowModal(false);
            }
        });
        setSelectedCustomer(customer);
    };
    const handleDeleteCustomer = (customer: Partner) => {
        setUpdateShowModal(false);
        console.log(customer);
        deleteCustomer.mutate({
            id: customer.id,
        }, {
            onSuccess: () => {
                toast.success('Customer deleted successfully');
                setUpdateShowModal(false);
            }
        });

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
                    <Table Partners={filteredCustomers} editPartner={handleUpdateCustomerModal} />
                </div>
            </div>
        </div>
    )
}
