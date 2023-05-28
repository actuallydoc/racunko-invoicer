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
  invoices: Invoice[]?;
  companies: Company[]?;
  partners: Partner[]?;
  services: Service[]?;
}

export interface Company {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  userId: string;
  vat: string;
  services: Service[]?;
  invoices: Invoice[]?;
  partners: Partner[]?;
  website: string?;
  city: string;
  zip: string;
  country: string;
}
export interface Partner {
  id: string;
  name: string;
  userId: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  email: string | null;
  website: string | null;
  vat: string | null;
  services: Service[]?;
  invoices: Invoice[]?;
  companies: Company[]?;

}
export interface Service {
  id: string | undefined;
  name: string | null;
  price: number | null;
  description: string | null;
  quantity: number | null;
}

enum Status {
  PAID = "PAID",
  UNPAID = "UNPAID",
  PARTIALLY_PAID = "PARTIALLY_PAID",
  OVERDUE = "OVERDUE",
  VOID = "VOID",
  REFUNDED = "REFUNDED",
}


export interface InvoiceObject {
  id: string?;
  updatedAt: Date?;
  createdAt: Date?;
  userId: User;
  invoiceNumber: string;
  dueDate: Date;
  invoiceDate: Date;
  invoiceServiceDate: Date?;
  Services: Service[] | undefined;
  Company: Company?;
  Partner: Partner?;
  status: Status;
}
