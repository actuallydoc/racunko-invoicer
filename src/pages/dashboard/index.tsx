import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
import type { Company, InvoiceObject, Partner, Service } from 'types'
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
    const { data: getInvoices, refetch: refetchInvoices, isSuccess: getInvoiceStatus } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getCustomers, refetch: refetchCustomers, isSuccess: getCustomerStatus } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getCompanies, refetch: refetchCompanies, isSuccess: getCompanyStatus } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    // const { data: getServices, refetch: refetchServices } = api.service.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const [invoices, setInvoices] = useState<InvoiceObject[] | undefined>(undefined)
    //Fake services data for UserServices
    const getServices: Service[] = [
        {
            id: "1",
            name: "Service 1",
            price: 100,
            description: "Description 1",
            quantity: null
        },
        {
            id: "2",
            name: "Service 2",
            price: 200,
            description: "Description 2",
            quantity: null
        },
    ]
    //Customer/Partner
    const createCustomer = api.partner.createPartner.useMutation();
    const updateCustomer = api.partner.updatePartner.useMutation();
    const deleteCustomer = api.partner.deletePartner.useMutation();
    //Company
    const createCompany = api.company.createCompany.useMutation();
    const updateCompany = api.company.updateCompany.useMutation();
    const deleteCompany = api.company.deleteCompany.useMutation();
    //Invoice
    const createInvoice = api.invoice.createInvoice.useMutation();
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
                console.log("Refetching invoices");
            }
            ).catch((err) => {
                console.log(err);
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
                console.log("Refetching invoices");
            }
            ).catch((err) => {
                console.log(err);
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
                console.log("Refetching invoices");
            }
            ).catch((err) => {
                console.log(err);
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
            refetchInvoices().then(() => {
                console.log("Refetching invoices");
            }
            ).catch((err) => {
                console.log(err);
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
            refetchInvoices().then(() => {
                console.log("Refetching invoices");
            }
            ).catch((err) => {
                console.log(err);
            }
            )
        }, 2000)
    }
    const handleDeleteCompany = (formState: Company) => {
        deleteCompany.mutate({
            id: formState.id,
        })
        setTimeout(() => {
            refetchInvoices().then(() => {
                console.log("Refetching invoices");
            }
            ).catch((err) => {
                console.log(err);
            }
            )
        }, 2000)
    }
    const handleCreateService = (formState: Service) => {
        console.log(formState);

    }
    const handleUpdateService = (formState: Service) => {
        console.log(formState);

    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleDeleteService = (formState: Service) => {
        // deleteService.mutate({
        //     id: formState.id as string,
        // })
    }
    const handleCreateInvoice = (formState: InvoiceObject) => {
        console.log(formState);
        createInvoice.mutate({
            companyId: formState?.Company?.id as string,
            dueDate: formState?.dueDate as Date,
            invoiceDate: formState?.invoiceDate as Date,
            invoiceNumber: formState?.invoiceNumber as string,
            partnerId: formState.Partner?.id as string,
            invoiceServiceDate: formState.invoiceServiceDate as Date,
            services: JSON.stringify(formState.services),
            id: sessionData?.user?.id?.toString() as string,
        })
        setTimeout(() => {
            refetchInvoices().then(() => {
                const invoices = getInvoices?.map((invoice) => {
                    return {
                        ...invoice,
                        services: JSON.parse(invoice.services as string) as Service[],
                    }
                }, [])
                setInvoices(invoices as unknown as InvoiceObject[])
            }
            ).catch((err) => {
                console.log(err);
            }
            )
        }, 2000)

    }

    //Doesnt work just converts the last one to json object and not all of them
    useEffect(() => {
        if (getInvoices) {
            const invoices = getInvoices?.map((invoice) => {
                // Check if services is already an object
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                const services = typeof invoice.services === 'object'
                    ? invoice.services
                    : JSON.parse(invoice.services);

                return {
                    ...invoice,
                    services: services as Service[],
                };
            });

            setInvoices(invoices as unknown as InvoiceObject[]);
        }
    }, []);
    return (
        <div className='flex bg-[#90C28B]'>
            <div>
                <div className='ml-4 pt-5 '>
                    <Sidebar activeItemCallback={setActiveItem} />
                </div>
            </div>
            <div className='w-full h-full'>
                {/* <HomeTab /> */}

                {activeItem === "Home" ? <HomeTab Companies={getCompanies as Company[] | undefined} Invoices={invoices as (InvoiceObject & { services: string; })[] | undefined} /> : null}
                {activeItem === "Invoices" ? <InvoiceTab Services={getServices} Companies={getCompanies as Company[] | undefined} Customers={getCustomers as Partner[] | undefined} handleCreateInvoice={handleCreateInvoice} Invoices={invoices as unknown as InvoiceObject[]} /> : null}
                {activeItem === "Customers" ? <CustomersTab handleDeleteCustomerCb={handleDeleteCustomer} handleUpdateCustomerCb={handleUpdateCustomer} Customers={getCustomers as Partner[] | undefined} handleCreateCustomerCb={handleCreateCustomer} /> : null}
                {activeItem === "Companies" ? <CompaniesTab handleCreateCompanyCb={handleCreateCompany} handleDeleteCompanyCb={handleDeleteCompany} handleUpdateCompanyCb={handleUpdateCompany} Companies={getCompanies as Company[] | undefined} /> : null}
                {activeItem === "Services" ? <ServicesTab Services={getServices} handleDeleteServiceCb={handleDeleteService} handleUpdateServiceCb={handleUpdateService} handleCreateServiceCb={handleCreateService} /> : null}
            </div>
            <ToastContainer />
        </div>
    )
}
