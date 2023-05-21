import React from 'react'
import TableHeader from './TableHeader'
import type { Partner } from 'types'
import TableItem from './TableItem'
export default function Table({ Partners, editPartner }: { Partners: Partner[] | undefined, editPartner: (partner: Partner) => void }) {
    return (
        <table className="min-w-full">
            <thead>
                <TableHeader />
            </thead>
            <tbody className='space-x-3'>
                {Partners?.map((partner) => (
                    <TableItem editPartner={editPartner} key={partner.id} partner={partner} />
                ))}
                {Partners?.length === 0 && (
                    <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center" colSpan={6}>
                            No partners found
                        </td>
                    </tr>
                )}
            </tbody>
        </table>

    )
}
