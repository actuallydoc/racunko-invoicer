import HomeTab from '@/components/Dashboard/HomeTab/HomeTab'
import Sidebar from '@/components/Dashboard/Sidebar/Sidebar'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { api } from '@/utils/api'
import InvoiceTab from '@/components/Dashboard/InvoiceTab/InvoiceTab'
import type { Company, InvoiceObject, Partner, Service } from 'types'
import CustomersTab from '@/components/Dashboard/CustomersTab/CustomersTab'
import CompaniesTab from '@/components/Dashboard/CompaniesTab/CompaniesTab'
import ServicesTab from '@/components/Dashboard/ServicesTab/ServicesTab'
import { Document, Page, pdfjs } from 'react-pdf'
import jsPDF from 'jspdf'
import PDFViewer from "@/components/Dashboard/InvoiceTab/PDFViewer"
import generatePDFInvoice from '@/utils/invoicer'
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
    const [invoices, setInvoices] = useState<(InvoiceObject & { services: Service[]; })[] | undefined>(undefined)
    const { data: sessionData } = useSession({ required: true })
    //Fetch data
    const { data: getInvoices, refetch: refetchInvoices, isSuccess: getInvoiceStatus } = api.invoice.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getCustomers, refetch: refetchCustomers, isSuccess: getCustomerStatus } = api.partner.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    const { data: getCompanies, refetch: refetchCompanies, isSuccess: getCompanyStatus } = api.company.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
    // const { data: getServices, refetch: refetchServices } = api.service.getAll.useQuery({ id: sessionData?.user?.id?.toString() as string })
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
    const editInvoice = api.invoice.editInvoice.useMutation();
    const deleteInvoice = api.invoice.deleteInvoice.useMutation();
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
        //!TODO Fix this typescript mess
        setTimeout(() => {
            refetchInvoices().then((data) => {
                console.log("Refetching invoices");
                if (data.isSuccess) {
                    //Convert services to JSON from string
                    data.data?.map((invoice) => {
                        invoice.services = JSON.parse(invoice.services) as Service[];
                    })
                    setInvoices(data.data as unknown as InvoiceObject[]);
                    toast.success(`Invoice ${formState.invoiceNumber as string} created`);
                }
            }
            ).catch((err) => {

                toast.error("Error creating invoice");
            }
            )
        }, 2000)

    }
    const handleUpdateInvoice = (formState: InvoiceObject) => {
        console.log(formState);
        editInvoice.mutate({
            id: formState.id as string,
            companyId: formState?.Company?.id as string,
            dueDate: formState?.dueDate as Date,
            invoiceDate: formState?.invoiceDate as Date,
            invoiceNumber: formState?.invoiceNumber as string,
            partnerId: formState.Partner?.id as string,
            invoiceServiceDate: formState.invoiceServiceDate as Date,
            services: JSON.stringify(formState.services),
        })
        //!TODO Fix this typescript mess
        setTimeout(() => {
            refetchInvoices().then((data) => {
                console.log("Refetching invoices");
                if (data.isSuccess) {
                    //Convert services to JSON from string
                    data.data?.map((invoice) => {
                        invoice.services = JSON.parse(invoice.services as string) as unknown as Service[];
                    })
                    setInvoices(data.data as unknown as InvoiceObject[]);
                    toast.success(`Invoice ${formState.invoiceNumber as string} updated`);
                }
            }
            ).catch((err) => {

                toast.error("Error updating invoice");
            }
            )
        }, 2000)
    }
    const handleDeleteInvoice = (formState: InvoiceObject) => {
        deleteInvoice.mutate({
            id: formState.id as string,
        })
        //!TODO Fix this typescript mess
        setTimeout(() => {
            refetchInvoices().then((data) => {
                console.log("Refetching invoices");
                if (data.isSuccess) {
                    //Convert services to JSON from string
                    data.data?.map((invoice) => {
                        invoice.services = JSON.parse(invoice.services as string) as unknown as Service[];
                    })
                    setInvoices(data.data as unknown as InvoiceObject[]);
                    toast.success(`Invoice ${formState.invoiceNumber as string} deleted`);
                }
            }
            ).catch(() => {

                toast.error("Error deleting invoice");
            }
            )
        }, 2000)
    }

    //Yes this is a mess, but it works. Fix this later
    useEffect(() => {
        if (getInvoiceStatus) {
            //Convert services to JSON from string
            getInvoices?.map((invoice) => {
                invoice.services = JSON.parse(invoice.services) as Service[];
            })
            setInvoices(getInvoices as unknown as InvoiceObject[]);
        }
        console.log("Invoices", getInvoices);
    }, [getInvoiceStatus])
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
                {activeItem === "Invoices" ? <InvoiceTab handleDeleteInvoice={handleDeleteInvoice} handleEditInvoice={handleUpdateInvoice} Services={getServices} Companies={getCompanies as Company[] | undefined} Customers={getCustomers as Partner[] | undefined} handleCreateInvoice={handleCreateInvoice} Invoices={invoices as unknown as InvoiceObject[]} /> : null}
                {activeItem === "Customers" ? <CustomersTab handleDeleteCustomerCb={handleDeleteCustomer} handleUpdateCustomerCb={handleUpdateCustomer} Customers={getCustomers as Partner[] | undefined} handleCreateCustomerCb={handleCreateCustomer} /> : null}
                {activeItem === "Companies" ? <CompaniesTab handleCreateCompanyCb={handleCreateCompany} handleDeleteCompanyCb={handleDeleteCompany} handleUpdateCompanyCb={handleUpdateCompany} Companies={getCompanies as Company[] | undefined} /> : null}
                {activeItem === "Services" ? <ServicesTab Services={getServices} handleDeleteServiceCb={handleDeleteService} handleUpdateServiceCb={handleUpdateService} handleCreateServiceCb={handleCreateService} /> : null}
            </div>
            <ToastContainer />
        </div>
    )
}
