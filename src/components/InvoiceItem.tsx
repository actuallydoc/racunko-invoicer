
import React from 'react'
import type { InvoiceObject, Service } from 'types'

export default function InvoiceItem({ invoice, deletecb }: { deletecb: (id: string) => Promise<void>, invoice: InvoiceObject & { services: Service[] } }) {
    const handleDelete = () => {
        deletecb(invoice.id as string).then(() => {
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
            {invoice.createdAt ? <h1>{invoice.createdAt.toString()}</h1> : <h1>no date</h1>}
            {invoice.dueDate ? <h1>{invoice.dueDate.toString()}</h1> : <h1>no date</h1>}
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
