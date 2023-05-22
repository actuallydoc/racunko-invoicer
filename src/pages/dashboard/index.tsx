import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
import type { Company, Invoice, Partner, Service } from 'types'
import CustomersTab from '@/components/Dashboard/CustomersTab/CustomersTab'
import CompaniesTab from '@/components/Dashboard/CompaniesTab/CompaniesTab'
import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
const Items = [
    "Home",
    "Invoices",
    "Customers",
    "Companies",
    "Services",
    "Storage",
    "Folders",
    "Trash",
    "Settings",
    "Logout",

]

export default function Index() {
    const [activeItem, setActiveItem] = useState<string>(Items[0] as string);
    const { data: sessionData } = useSession({ required: true })
    //Fetch data
    const { data: getInvoices } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getCustomers } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getCompanies } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getServices } = api.service.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    //Customer/Partner
    const createCustomer = api.partner.createPartner.useMutation();
    const updateCustomer = api.partner.updatePartner.useMutation();
    const deleteCustomer = api.partner.deletePartner.useMutation();

    //Company
    const createCompany = api.company.createCompany.useMutation();
    const updateCompany = api.company.updateCompany.useMutation();
    const deleteCompany = api.company.deleteCompany.useMutation();
    //Service
    const createService = api.service.createService.useMutation();
    const updateService = api.service.updateService.useMutation();
    const deleteService = api.service.deleteService.useMutation();
    const handleCreateCustomer = (formState: Partner) => {
        console.log(formState);
        createCustomer.mutate({
            user_id: sessionData?.user?.id?.toString() as string,
            name: formState.name,
            email: formState.email as string,
            phone: formState.phone,
            address: formState.address,
            city: formState.city,
            zip: formState.zip,
            country: formState.country,
            website: formState.website as string,
            vat: formState.vat,
        })
    };
    const handleUpdateCustomer = (formState: Partner) => {
        console.log(formState);
        updateCustomer.mutate({
            id: formState.id,
            user_id: sessionData?.user?.id?.toString() as string,
            name: formState.name,
            email: formState.email as string,
            phone: formState.phone,
            address: formState.address,
            city: formState.city,
            zip: formState.zip,
            country: formState.country,
            website: formState.website as string,
            vat: formState.vat,
        })
    };
    const handleDeleteCustomer = (formState: Partner) => {

        deleteCustomer.mutate({
            id: formState.id,
        })
    }
    const handleCreateCompany = (formState: Company) => {
        console.log(formState);
        createCompany.mutate({
            user_id: sessionData?.user?.id?.toString() as string,
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            address: formState.address,
            city: formState.city,
            zip: formState.zip,
            country: formState.country,
            website: formState.website,
            vat: formState.vat,
        })
    }
    const handleUpdateCompany = (formState: Company) => {
        console.log(formState);
        updateCompany.mutate({
            id: formState.id,
            name: formState.name,
            email: formState.email,
            phone: formState.phone,
            address: formState.address,
            city: formState.city,
            zip: formState.zip,
            country: formState.country,
            website: formState.website,
            vat: formState.vat,
        })
    }
    const handleDeleteCompany = (formState: Company) => {
        deleteCompany.mutate({
            id: formState.id,
        })

    }
    const handleCreateService = (formState: Service) => {
        console.log(formState);
        createService.mutate({
            userId: sessionData?.user?.id?.toString() as string,
            description: formState.description,
            price: formState.price,
            name: formState.name,
        })
    }
    const handleUpdateService = (formState: Service) => {
        console.log(formState);
        updateService.mutate({
            id: formState.id,
            description: formState.description,
            price: formState.price,
            name: formState.name,
        })
    }
    const handleDeleteService = (formState: Service) => {
        deleteService.mutate({
            id: formState.id,
        })
    }
    const handleCreateInvoice = (formState: Invoice) => {
        console.log(formState);
    }
    useEffect(() => {
        if (sessionData?.user?.name?.toString() as string) {
            toast.success(`Welcome ${sessionData?.user?.name?.toString() as string}`);
        }
    }, [sessionData])
    return (
        <div className='flex bg-[#90C28B]'>
            <div>
                <div className='ml-4 pt-5 '>
                    <Sidebar activeItemCallback={setActiveItem} />
                </div>
            </div>
            <div className='w-full h-full'>
                {/* <HomeTab /> */}
                {activeItem === "Home" ? <HomeTab Invoices={getInvoices} /> : null}
                {activeItem === "Invoices" ? <InvoiceTab Companies={getCompanies} Customers={getCustomers} createInvoice={handleCreateInvoice} handleCreateInvoice={handleCreateInvoice} Invoices={getInvoices} /> : null}
                {activeItem === "Customers" ? <CustomersTab handleDeleteCustomerCb={handleDeleteCustomer} handleUpdateCustomerCb={handleUpdateCustomer} Customers={getCustomers} handleCreateCustomerCb={handleCreateCustomer} /> : null}
                {activeItem === "Companies" ? <CompaniesTab handleCreateCompanyCb={handleCreateCompany} handleDeleteCompanyCb={handleDeleteCompany} handleUpdateCompanyCb={handleUpdateCompany} Companies={getCompanies} /> : null}
                {activeItem === "Services" ? <ServicesTab Services={getServices} handleDeleteServiceCb={handleDeleteService} handleUpdateServiceCb={handleUpdateService} handleCreateServiceCb={handleCreateService} /> : null}
            </div>
            <ToastContainer />
        </div>
    )
}
