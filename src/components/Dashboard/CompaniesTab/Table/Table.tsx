import React from 'react'
import TableHeader from './TableHeader'
import type { Company } from 'types'
import TableItem from './TableItem'
export default function Table({ Companies, editCompany }: { Companies: Company[] | undefined, editCompany: (company: Company) => void }) {
    return (
        <div className="max-h-[770px] overflow-y-scroll overflow-x-hidden">
            <table className="min-w-full">
                <thead>
                    <TableHeader />
                </thead>
                <tbody className='space-x-3'>
                    {Companies?.map((company) => (
                        <TableItem editCompany={editCompany} key={company.id} company={company} />
                    ))}
                    {Companies?.length === 0 && (
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center" colSpan={6}>
                                No companies found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}
