import type { Invoice } from "@prisma/client"


//The same we get raw without the services being serialized from json to object
type InvoiceType = Invoice & {
    Company: Company;
    Partner: Partner;
}


export interface Service {
    id: string;
    name: string;
    price: number;
    description: string;
    quantity: number;
}

// This type is the final type that we will use in the app
interface InvoiceSerialized extends Invoice {
    Company: Company;
    Partner: Partner;
    Services: Service[];
}

export type InvoiceStatus = "Draft" | "Paid" | "Overdue" | "Unpaid" | "Refunded" | "Cancelled"