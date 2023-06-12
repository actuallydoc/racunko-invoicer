import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
import CustomersTab from '@/components/Dashboard/CustomersTab/CustomersTab'
import CompaniesTab from '@/components/Dashboard/CompaniesTab/CompaniesTab'
// import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
import type { Company, Partner } from '@prisma/client'
import { useDispatch } from 'react-redux'
import { invoiceSlice } from '@/stores/invoiceSlice'
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
    const { data: sessionData, status } = useSession({ required: true })
    const dispatch = useDispatch();
    const { data: getInvoices, isFetched } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getCustomers } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getCompanies } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    useEffect(() => {
        // Set the initial state of the invoices to the reducer with dispatching the action
        if (getInvoices) {
            dispatch(invoiceSlice.actions.initInvoices(getInvoices));
        }
    }, [isFetched, getInvoices, dispatch])
    return (
        <div className='flex bg-[#030610]'>
            <div>
                <div className='ml-4 pt-5 '>
                    <Sidebar activeItemCallback={setActiveItem} />
                </div>
            </div>
            <div className='w-full h-full'>
                {/* <HomeTab /> */}
                {activeItem === "Home" ? <HomeTab Companies={getCompanies} Invoices={getInvoices} /> : null}
                {activeItem === "Invoices" ? <InvoiceTab Companies={getCompanies as Company[]} Customers={getCustomers as Partner[]} /> : null}
                {activeItem === "Customers" ? <CustomersTab Customers={getCustomers} /> : null}
                {activeItem === "Companies" ? <CompaniesTab Companies={getCompanies as Company[]} /> : null}
                {/* {activeItem === "Services" ? <ServicesTab Services={getServices} handleDeleteServiceCb={handleDeleteService} handleUpdateServiceCb={handleUpdateService} handleCreateServiceCb={handleCreateService} /> : null} */}
            </div>
            <ToastContainer />
        </div>
    )
}
