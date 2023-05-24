import React, { useEffect, useState } from 'react'
import { IoIosCreate } from 'react-icons/io';
import ServiceCreateModal from './Modals/ServiceCreateModal';
import Table from './Table/Table';
import type { Service } from 'types';
import ServiceEditModal from './Modals/ServiceEditModal';

export default function CustomersTab({ Services, handleCreateServiceCb, handleUpdateServiceCb, handleDeleteServiceCb }: { Services: Service[], handleCreateServiceCb: (formState: Service) => void, handleUpdateServiceCb: (formState: Service) => void, handleDeleteServiceCb: (formState: Service) => void }) {
    //!TODO SCROLLABLE TABLE
    const [showCreateModal, setCreateShowModal] = useState(false);
    const [showUpdateModal, setUpdateShowModal] = useState(false);
    const [tempService, setTempService] = useState<Service>({} as Service);
    const [filteredServices, setFilteredServices] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service>({} as Service);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    const handleCreateService = () => {
        setCreateShowModal(false);
        handleCreateServiceCb(tempService);
        console.log(tempService);
    };
    const handleUpdateService = (service: Service) => {
        setUpdateShowModal(true);
        handleUpdateServiceCb(service);
        setSelectedService(service);
    };
    const handleDeleteService = (service: Service) => {
        setUpdateShowModal(false);
        console.log(service);
        handleDeleteServiceCb(service);

    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = Services.filter((service) => {
            if (service.name === null) return service;
            return service?.name.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredServices(filtered);
        console.log(filtered);
    };
    useEffect(() => {
        setFilteredServices(Services);
    }, [Services]);

    return (
        <div className="min-h-screen flex items-center ml-10">
            {showCreateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <ServiceCreateModal serviceState={setTempService} handleCreateService={handleCreateService} setShowModal={setCreateShowModal} />
                </div>
            )}
            {showUpdateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <ServiceEditModal handleDeleteService={handleDeleteService} handleUpdateService={handleUpdateService} setShowModal={setUpdateShowModal} serviceState={selectedService} />
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
                    <Table Services={filteredServices} editService={handleUpdateService} />
                </div>
            </div>
        </div>
    )
}
