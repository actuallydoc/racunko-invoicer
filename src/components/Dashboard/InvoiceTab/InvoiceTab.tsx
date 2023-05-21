import React from 'react'
import Table from './Table/Table'
import type { Invoice } from 'types'
export default function InvoiceTab({ Invoices }: { Invoices: Invoice[] }) {
    return (
        <div className="min-h-screen flex items-center ml-10">
            <div className="w-10/12 h-[850px] mb-16 bg-white rounded-3xl p-4 border-4">
                <div className='flex space-x-5'>
                    <div>
                        <input type="text" placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" />
                    </div>
                    <div>
                        <input type="date" placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" />
                    </div>
                    <div>
                        <input type="date" placeholder="Search" className="w-[150px] h-10 border-2 border-gray-300 rounded-lg p-2" />
                    </div>
                </div>

                <div>
                    <Table Invoices={Invoices} />
                </div>
            </div>
        </div>
    )
}



