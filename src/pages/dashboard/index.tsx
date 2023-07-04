import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
import CustomersTab from '@/components/Dashboard/CustomersTab/CustomersTab'
import CompaniesTab from '@/components/Dashboard/CompaniesTab/CompaniesTab'
// import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
import type { Company, Partner, Service } from '@prisma/client'
import { useDispatch } from 'react-redux'
import { invoiceSlice } from '@/stores/invoiceSlice'

import Navbar from '@/components/Dashboard/InvoiceTab/Navbar'
import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
import { toast } from '@/components/ui/use-toast'
export default function Index() {
    const [activeItem, setActiveItem] = useState<string>("Dashboard");
    const { data: sessionData, status } = useSession({
        required: true, onUnauthenticated() {
            toast({
                variant: "destructive",
                title: 'You are not logged in',
                description: 'Please log in to continue',
            })
        },
    })
    const dispatch = useDispatch();
    const { data: getInvoices, isFetched } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, {
        enabled: status === 'authenticated',
        refetchOnWindowFocus: false
    })
    const { data: getCustomers } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, {
        enabled: status === 'authenticated',
        refetchOnWindowFocus: false
    })
    const { data: getCompanies } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string }, {
        enabled: status === 'authenticated',
        refetchOnWindowFocus: false
    })
    const { data: getServices } = api.service.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string, }, {
        enabled: status === 'authenticated',
        refetchOnWindowFocus: false,

    },)
    useEffect(() => {
        toast({
            title: 'Welcome back❤',
            description: (
                <>
                    <div className='flex space-x-1 text-lg' >
                        <div>
                            <p>You are logged in as </p>
                        </div>
                        <div>
                            <p className='font-bold'>{sessionData?.user?.name}</p>
                        </div>
                    </div>

                </>
            ),
        })
        // Set the initial state of the invoices to the reducer with dispatching the action
        if (getInvoices) {
            dispatch(invoiceSlice.actions.initInvoices(getInvoices));
        }
        if (getCustomers) {
            dispatch(invoiceSlice.actions.initPartners({
                partners: getCustomers
            }));
        }
        if (getCompanies) {
            dispatch(invoiceSlice.actions.initCompanies(getCompanies))
        }
    }, [isFetched, getInvoices, dispatch, getCustomers, sessionData, getCompanies])

    return (
        <div className=''>
            <div>
                <Navbar activeItemCallback={setActiveItem} />
            </div>
            <div className='flex pt-10 middle-container'>
                <div className=''>
                    {/* <HomeTab /> */}
                    {activeItem === "Dashboard" ? <HomeTab Companies={getCompanies as Company[]} /> : null}
                    {activeItem === "Invoices" ? <InvoiceTab Companies={getCompanies as Company[]} Customers={getCustomers as Partner[]} /> : null}
                    {activeItem === "Customers" ? <CustomersTab /> : null}
                    {activeItem === "Companies" ? <CompaniesTab /> : null}
                    {activeItem === "Services" ? <ServicesTab Services={getServices as Service[]} /> : null}
                </div>
            </div >
        </div >
    )
}
