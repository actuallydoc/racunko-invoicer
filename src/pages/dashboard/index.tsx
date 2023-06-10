import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
import CustomersTab from '@/components/Dashboard/CustomersTab/CustomersTab'
import CompaniesTab from '@/components/Dashboard/CompaniesTab/CompaniesTab'
import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
import type { Company, Invoice, Partner } from '@prisma/client'
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
    // const [invoices, setInvoices] = useState<Invoice[] | undefined>(undefined)
    const { data: sessionData, status } = useSession({ required: true })
    //Fetch data
    const { data: getInvoices, isFetched: invoicesFetched } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getCustomers, refetch: refetchCustomers } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getCompanies, refetch: refetchCompanies } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })

    //Customer/Partner
    const createCustomer = api.partner.createPartner.useMutation();
    const updateCustomer = api.partner.updatePartner.useMutation();
    const deleteCustomer = api.partner.deletePartner.useMutation();
    //Company
    const createCompany = api.company.createCompany.useMutation();
    const updateCompany = api.company.updateCompany.useMutation();
    const deleteCompany = api.company.deleteCompany.useMutation();
    //Service
    // const createService = api.service.createService.useMutation();
    // const updateService = api.service.updateService.useMutation();
    // const deleteService = api.service.deleteService.useMutation();
    const handleCreateCustomer = (formState: Partner) => {
        // console.log(formState);
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
        setTimeout(() => {
            refetchCustomers().then(() => {
                toast.success(`Customer ${formState.name} created`);
            }
            ).catch((err) => {
                console.log(err);
                toast.error("Error creating customer");
            }
            )
        }, 2000)
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
        setTimeout(() => {
            refetchCustomers().then(() => {
                toast.success(`Customer ${formState.name} updated`);
            }
            ).catch(() => {
                toast.error("Error updating customer");
            }
            )
        }, 2000)
    };
    const handleDeleteCustomer = (formState: Partner) => {

        deleteCustomer.mutate({
            id: formState.id,
        })
        setTimeout(() => {
            refetchCustomers().then(() => {
                toast.success(`Customer ${formState.name} deleted`);
            }
            ).catch(() => {
                toast.error("Error deleting customer");
            }
            )
        }, 2000)
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
            website: formState.website as string,
            vat: formState.vat,
        })
        setTimeout(() => {
            refetchCompanies().then(() => {
                toast.success(`Company ${formState.name} created`);
            }
            ).catch(() => {
                toast.error("Error creating company");
            }
            )
        }, 2000)
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
        setTimeout(() => {
            refetchCompanies().then(() => {
                toast.success(`Company ${formState.name} updated`);
            }
            ).catch(() => {
                toast.error("Error updating company");
            }
            )
        }, 2000)
    }
    const handleDeleteCompany = (formState: Company) => {
        deleteCompany.mutate({
            id: formState.id,
        })
        setTimeout(() => {
            refetchCompanies().then(() => {
                toast.success("Company deleted");
            }
            ).catch(() => {
                toast.error("Error deleting company");
            }
            )
        }, 2000)
    }
    const handleCreateService = (formState: string) => {
        console.log(formState);

    }
    const handleUpdateService = (formState: string) => {
        console.log(formState);

    }

    useEffect(() => {
        console.log("Fetching invoices");
        if (invoicesFetched) {
            console.log('====================================');
            console.log(getInvoices);
            console.log('====================================');
        }
    }, [getInvoices, invoicesFetched])
    return (
        <div className='flex bg-[#90C28B]'>
            <div>
                <div className='ml-4 pt-5 '>
                    <Sidebar activeItemCallback={setActiveItem} />
                </div>
            </div>
            <div className='w-full h-full'>
                {/* <HomeTab /> */}

                {activeItem === "Home" ? <HomeTab Companies={getCompanies} Invoices={getInvoices} /> : null}
                {activeItem === "Invoices" ? <InvoiceTab Companies={getCompanies as Company[]} Customers={getCustomers as Partner[]} Invoices={getInvoices} /> : null}
                {activeItem === "Customers" ? <CustomersTab handleDeleteCustomerCb={handleDeleteCustomer} handleUpdateCustomerCb={handleUpdateCustomer} Customers={getCustomers} handleCreateCustomerCb={handleCreateCustomer} /> : null}
                {activeItem === "Companies" ? <CompaniesTab handleCreateCompanyCb={handleCreateCompany} handleDeleteCompanyCb={handleDeleteCompany} handleUpdateCompanyCb={handleUpdateCompany} Companies={getCompanies as Company[]} /> : null}
                {/* {activeItem === "Services" ? <ServicesTab Services={getServices} handleDeleteServiceCb={handleDeleteService} handleUpdateServiceCb={handleUpdateService} handleCreateServiceCb={handleCreateService} /> : null} */}
            </div>
            <ToastContainer />
        </div>
    )
}
