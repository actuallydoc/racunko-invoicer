import type { UseTRPCMutationResult } from '@trpc/react-query/shared'
import React from 'react'
import { Invoice, Service } from 'types'

export default function InvoiceItem({ invoice, deletecb }: { deletecb: (id: string) => Promise<void>, invoice: Invoice & { services: Service[] } }) {
    const handleDelete = () => {
        deletecb(invoice.id).then(() => {
            console.log("deleted");
        })
            .catch((err) => {
                console.log(err);
            }
            )
    }
    return (
        <div>
            <h1>{invoice.id}</h1>
            <h1>{invoice.createdAt.toString()}</h1>
            <h1>{invoice.updatedAt.toString()}</h1>
            <h1>{invoice.userId.name}</h1>
            {invoice.services.map((service) => (
                <div key={service.id}>
                    <h1>{service.name}</h1>
                    <h1>{service.price}</h1>
                </div>
            ))}
            <button onClick={handleDelete}>Delete</button>

        </div>
    )
}
