import type { Invoice } from "@prisma/client"

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