import React from 'react'
import type { Service } from 'types'
import TableItem from './TableItem'
import TableHeader from './TableHeader'

export default function Table({ Services, editService }: { Services: Service[] | undefined, editService: (service: Service) => void }) {
    return (
        <table className="min-w-full">
            <thead>
                <TableHeader />
            </thead>
            <tbody>
                {Services?.map((service) => (
                    <TableItem editService={editService} key={service.id} service={service} />
                ))}
            </tbody>
        </table>
    )
}
