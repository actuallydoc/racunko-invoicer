import React, { useEffect, useState } from 'react'
import CompanyCreateModal from './Modals/CompanyCreateModal';
import CompanyEditModal from './Modals/CompanyEditModal';
import { IoIosCreate } from 'react-icons/io';
import Table from './Table/Table';
import type { Company } from '@prisma/client';
import { api } from '@/utils/api';

import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';


export default function CustomersTab({ Companies }: { Companies: Company[] | undefined }) {
    //!TODO SCROLLABLE TABLE
    // const [filteredCustomers, setFilteredCustomers] = React.useState<Partner[]>([]);
    const { data: sessionData } = useSession();
    const createCompany = api.company.createCompany.useMutation();
    const updateCompany = api.company.updateCompany.useMutation();
    const deleteCompany = api.company.deleteCompany.useMutation();
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
        createCompany.mutate({
            address: tempCompany.address,
            city: tempCompany.city,
            country: tempCompany.country,
            email: tempCompany.email,
            name: tempCompany.name,
            phone: tempCompany.phone,
            user_id: sessionData?.user.id as string,
            vat: tempCompany.vat,
            zip: tempCompany.zip,
            website: tempCompany.website as string,
        }, {
            onSuccess: () => {
                setCreateShowModal(false);
            }
        });
    };
    const handleUpdateCompanyModal = (company: Company) => {
        setSelectedCompany(company);
        setUpdateShowModal(true);
    };
    const handleUpdateCompany = (company: Company) => {
        updateCompany.mutate({
            id: company.id,
            address: company.address,
            city: company.city,
            country: company.country,
            email: company.email,
            name: company.name,
            phone: company.phone,
            vat: company.vat,
            zip: company.zip,
            website: company.website,
        }, {
            onSuccess: () => {
                toast.success('Company updated successfully');
                setUpdateShowModal(false);
            }
        });
    };

    const handleDeleteCompany = (company: Company) => {
        setUpdateShowModal(false);
        console.log(company);
        deleteCompany.mutate({
            id: company.id,
        }, {
            onSuccess: () => {
                toast.success('Company deleted successfully');
                setUpdateShowModal(false);
            }
        })

    };

    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const filtered = Companies?.filter((customer) => {
            return customer.name.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredCompanies(filtered as Company[]);
    };
    useEffect(() => {
        setFilteredCompanies(Companies as Company[]);
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
                    <CompanyEditModal handleDeleteCompany={handleDeleteCompany} handleUpdateCompany={handleUpdateCompany} setShowModal={setUpdateShowModal} companyState={selectedCompany} />
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
                    <Table Companies={filteredCompanies} editCompany={handleUpdateCompanyModal} />
                </div>
            </div>
        </div>
    )
}
