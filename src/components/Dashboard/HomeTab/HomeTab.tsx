import React, { useEffect, useState } from 'react'
import LineChart from './Charts/LineChart'
import VerticalBarChart from './Charts/VerticalBarChart'

import { RiFilePaper2Fill } from 'react-icons/ri'
import { BiMoneyWithdraw } from 'react-icons/bi'
import type { Company, Invoice } from '@prisma/client'
interface HomeTabProps {
    Invoices: Invoice[] | undefined;
    Companies: Company[] | undefined;
}


//!TODO Add so u select a company and see the revenue for that company on the second dropdown
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
export default function HomeTab({ Invoices, Companies }: HomeTabProps) {
    // const [revenue, setRevenue] = useState<number>(0)
    const [currentMonth, setCurrentMonth] = useState<string>('')
    const [currentCompany, setCurrentCompany] = useState<string | undefined>(undefined)
    useEffect(() => {
        // const calculateRevenue = () => {
        //     let total = 0
        //     Invoices?.map((invoice) => {
        //         invoice.services?.map((service) => {
        //             if (invoice.Company?.name === currentCompany) {
        //                 total += Number(service.price)
        //             }
        //             setRevenue(total)

        //         })
        //     })

        //     console.log(total)
        // }
        // if (Invoices) {
        //     if (Invoices?.length > 0) {
        //         calculateRevenue()
        //     }
        // }
    }, [Invoices, currentCompany])
    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentMonth(e.target.value)
    }
    const handleCompanyDropDown = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentCompany(e.target.value)

    }

    useEffect(() => {
        const calculateMonth = () => {
            const date = new Date()
            const month = date.toLocaleString('default', { month: 'long' })
            setCurrentMonth(month)
        }
        calculateMonth()
    }, [])

    return (
        <div className='flex-col space-y-5 ml-10 mt-[10%]'>
            <div className='flex space-x-3'>
                <div className='flex space-x-4'>
                    <div className=''>
                        <LineChart />
                    </div>
                    <div>
                        <VerticalBarChart />
                    </div>

                </div>
                <div>
                    <div className="box-border w-80 h-44  bg-white rounded-3xl p-5 border-4 ...">
                        <div className='flex'>
                            <div>
                                <div className='text-6xl mt-5 text-[#3E00C2] rounded-full p-2 bg-slate-200'>
                                    <RiFilePaper2Fill />
                                </div>
                            </div>
                            <div className='flex-col space-y-2 ml-auto mr-auto mt-5'>
                                <div>
                                    <p className='text-4xl text-[#23005B]'>{Invoices?.length}</p>
                                </div>
                                <div>
                                    <p className='text-lg font-medium text-[#5321CA]'>Invoices created</p>
                                </div>
                                <div className="relative">
                                    <select defaultValue={currentMonth} onChange={handleMonthChange} className="block appearance-none w-full bg-slate-200 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transition duration-300 ease-in-out">
                                        {months.map((month) => (
                                            <option key={month} value={month}>{month}</option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M10 12l-5-5 1.5-1.5L10 9.5 13.5 5 15 6.5z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div>

                            </div>
                        </div>

                    </div>

                </div>
            </div >

            <div className='flex space-x-3'>
                <div className="box-border w-1/4 h-[350px] bg-white text-bold rounded-3xl p-4 border-4 ...">
                </div>
                <div className="box-border w-80 h-44  bg-white rounded-3xl p-5 border-4 ...">
                    <div className='flex'>
                        <div>
                            <div className='text-6xl mt-5 text-[#3E00C2] rounded-full p-2 bg-slate-200'>
                                <BiMoneyWithdraw />
                            </div>
                        </div>
                        <div className='flex-col space-y-2 ml-auto mr-auto mt-5'>
                            <div>
                                {/* <p className='text-4xl text-[#23005B]'>{revenue}€</p> */}
                            </div>
                            <div>
                                <p className='text-lg font-medium text-[#5321CA]'>Revenue</p>
                            </div>
                            <div className="relative">
                                <select defaultValue={currentCompany} onChange={handleCompanyDropDown} className="block appearance-none w-full bg-slate-200 border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 transition duration-300 ease-in-out">
                                    <option disabled selected value={"123"}> -- select an option -- </option>
                                    {Companies ? Companies?.map((company) => (
                                        <option key={company.id} value={company.name}>{company.name}</option>
                                    )) : <option value=''>No Companies </option>}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M10 12l-5-5 1.5-1.5L10 9.5 13.5 5 15 6.5z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div>

                        </div>
                    </div>

                </div>
            </div>


        </div >
    )
}
