import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
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
]
import Navbar from '@/components/Dashboard/InvoiceTab/Navbar'
import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
export default function Index() {
    const [activeItem, setActiveItem] = useState<string>(Items[0] as string);
    const { data: sessionData, status } = useSession({ required: true })
    const dispatch = useDispatch();
    const { data: getInvoices, isFetched } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getCustomers } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getCompanies } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, { enabled: status === 'authenticated' })
    const { data: getServices } = api.service.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, {
        enabled: status === 'authenticated'
    })
    useEffect(() => {
        // Set the initial state of the invoices to the reducer with dispatching the action
        if (getInvoices) {
            dispatch(invoiceSlice.actions.initInvoices(getInvoices));
        }
        if (getCustomers) {

            dispatch(invoiceSlice.actions.initPartners({
                partners: getCustomers
            }));
        }
    }, [isFetched, getInvoices, dispatch, getCustomers])

    return (
        <div className=''>
            <div>
                <Navbar activeItemCallback={setActiveItem} />
            </div>
            <div className='flex pt-10 middle-container'>
                <div className=''>
                    {/* <HomeTab /> */}
                    {activeItem === "Home" ? <HomeTab Companies={getCompanies as Company[]} /> : null}
                    {activeItem === "Invoices" ? <InvoiceTab Companies={getCompanies as Company[]} Customers={getCustomers as Partner[]} /> : null}
                    {activeItem === "Customers" ? <CustomersTab Customers={getCustomers as Partner[]} /> : null}
                    {activeItem === "Companies" ? <CompaniesTab Companies={getCompanies as Company[]} /> : null}
                    {activeItem === "Services" ? <ServicesTab Services={getServices} /> : null}
                </div>
            </div >
        </div >
    )
}
