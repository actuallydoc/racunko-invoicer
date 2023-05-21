import React, { useEffect, useState } from 'react'
import LineChart from './Charts/LineChart'
import VerticalBarChart from './Charts/VerticalBarChart'
import type { Invoice, Service } from 'types'

interface HomeTabProps {
    Invoices: (Invoice & { services: Service[]; })[] | undefined;
}

export default function HomeTab({ Invoices }: HomeTabProps) {
    const [revenue, setRevenue] = useState<number>(0)

    useEffect(() => {

        const calculateRevenue = () => {
            let total = 0
            Invoices?.map((invoice) => {
                invoice.services.map((service) => {
                    total += service.price
                }
                )
            })
            console.log(total)
            setRevenue(total)
        }
        if (Invoices) {
            calculateRevenue()
        }

    }, [Invoices])

    return (
        <div className='flex-col space-y-5 ml-10 mt-[10%]'>
            <div className='flex space-x-3'>
                <LineChart />
                <div>
                    <div className="box-border w-80 h-60 bg-white rounded-3xl p-4 border-4 ...">
                        <div className='flex  content-center justify-center text-center'>
                            <div className='flex flex-col content-center space-y-4'>
                                <div className='text-2xl font-mono'>
                                    <p>Total Invoices</p>
                                </div>
                                <div className='text-2xl font-mono'>
                                    <p>{Invoices?.length}</p>
                                </div>
                                <div>
                                    <div className='text-2xl font-mono'>
                                        <p>Total Revenue</p>
                                    </div>
                                    <div className='text-2xl font-mono'>
                                        <p>{revenue}$</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='flex space-x-3'>

                <VerticalBarChart />
                <div className="box-border w-1/4 h-[350px] bg-white text-bold rounded-3xl p-4 border-4 ...">
                </div>
            </div>


        </div >
    )
}
