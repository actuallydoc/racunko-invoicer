import React, { useEffect, useState } from 'react'
import type { Company } from 'types';
import CompanyCreateModal from './Modals/CompanyCreateModal';
import CompanyEditModal from './Modals/CompanyEditModal';
import { IoIosCreate } from 'react-icons/io';
import Table from './Table/Table';

export default function CustomersTab({ Companies, handleCreateCompanyCb, handleUpdateCompanyCb, handleDeleteCompanyCb }: { Companies: Company[], handleCreateCompanyCb: (formState: Company) => void, handleUpdateCompanyCb: (formState: Company) => void, handleDeleteCompanyCb: (formState: Company) => void }) {
    //!TODO SCROLLABLE TABLE
    // const [filteredCustomers, setFđđilteredCustomers] = React.useState<Partner[]>([]);

    //Create modal for creating new customers
    const [showCreateModal, setCreateShowModal] = useState(false);
    const [showUpdateModal, setUpdateShowModal] = useState(false);
    const [tempCompany, setTempCompany] = useState<Company>({} as Company);
    const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company>({} as Company);
    const handleOpenCreateModal = () => {
        setCreateShowModal(true);
    };
    const handleCreateCompany = () => {
        setCreateShowModal(false);
        handleCreateCompanyCb(tempCompany);
        console.log(tempCompany);
    };
    const handleUpdateCompany = (company: Company) => {
        setUpdateShowModal(true);
        handleUpdateCompanyCb(company);
        setSelectedCompany(company);
    };
    const handleDeleteCustomer = (company: Company) => {
        setUpdateShowModal(false);
        console.log(company);
        handleDeleteCompanyCb(company);

    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = Companies.filter((customer) => {
            return customer.name.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredCompanies(filtered);
        console.log(filtered);
    };
    useEffect(() => {
        setFilteredCompanies(Companies);
    }, [Companies]);

    return (
        <div className="min-h-screen flex items-center ml-10">
            {showCreateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <CompanyCreateModal companyState={setTempCompany} handleCreateCompany={handleCreateCompany} setShowModal={setCreateShowModal} />
                </div>
            )}
            {showUpdateModal && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
                    <CompanyEditModal handleDeleteCustomer={handleDeleteCustomer} handleUpdateCompany={handleUpdateCompany} setShowModal={setUpdateShowModal} companyState={selectedCompany} />
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
                    <Table Companies={filteredCompanies} editCompany={handleUpdateCompany} />
                </div>
            </div>
        </div>
    )
}
