import { number } from "zod";

export interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
}


export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token: string;
    access_token: string;
    expires_at: number;
    token_type: string;
    scope: string;
    id_token: string;
    session_state: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
    accounts: Account[];
    sessions: Session[];
    invoices: Invoice[];
    companies: Company[];
    partners: Partner[];
    services: Service[];
}

export interface Company {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    userId: User;
    vat: string;
    services: Service[];
    invoices: Invoice[];
}
export interface Partner {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    vat: string | null;
    userId: User;
    services: Service[];
}
export interface Service {
    id: string;
    name: string;
    price: number;
}


export interface Invoice {
    id: string;
    number: number;
    updatedAt: Date;
    createdAt: Date;
    userId: User;
    services: Service[];
}