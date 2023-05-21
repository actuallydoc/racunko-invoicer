import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
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
    const { data: getInvoices } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })


    useEffect(() => {
        console.log(sessionData)
        if (sessionData?.user?.name?.toString() as string) {
            toast.success(`Welcome ${sessionData?.user?.name?.toString() as string}`);
        }
    }, [sessionData])
    useEffect(() => {
        console.log(activeItem)
    }, [activeItem])
    return (
        <div className='flex bg-[#90C28B]'>
            <div>
                <div className='ml-4 pt-5 '>
                    <Sidebar activeItemCallback={setActiveItem} />
                </div>
            </div>

            <div className='w-full h-full'>
                {/* <HomeTab /> */}
                {activeItem === "Home" ? <HomeTab invoices={getInvoices} /> : null}
                {activeItem === "Invoices" ? <InvoiceTab /> : null}
            </div>
            <ToastContainer />
        </div>
    )
}
