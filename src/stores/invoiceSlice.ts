import type { Partner, Company } from "@prisma/client";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { InvoiceSerialized, InvoiceType, Service } from "types";

export const invoiceSlice = createSlice({
    name: "invoiceSlice",
    initialState: {
        //Get the items from local storage if there are any
        items: [] as InvoiceSerialized[],
        editItem: {} as InvoiceSerialized,
        partners: [] as Partner[],
        createItem: {
            Services: [] as Service[],
        } as InvoiceSerialized,
        companies: [] as Company[],
    },
    reducers: {
        initInvoices(state, action: { payload: InvoiceType[]; }) {
            const invoicesSerialized = action.payload.map((invoice: InvoiceType) => {
                const invoiceSerialized: InvoiceSerialized = {
                    ...invoice, // Copy all properties from the original invoice
                    Company: invoice.Company as unknown as Company,
                    Partner: invoice.Partner as unknown as Company,
                    Services: JSON.parse(invoice.services as string) as Service[]
                };
                return invoiceSerialized;
            });
            state.items = invoicesSerialized as unknown as InvoiceSerialized[];
        },
        editInvoice(state, action: { payload: { item: InvoiceSerialized } }) {
            //When u click on the invoice push the data into this state and display it in the invoice form
            const { item } = action.payload;
            state.editItem = item;
        },
        reset(state) {
            state.editItem = {} as InvoiceSerialized;
        },
        addService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            state.editItem.Services.push(service);
        },
        removeService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            state.editItem.Services = state.editItem.Services.filter((s) => s.id !== service.id);
        },
        updateService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            const index = state.editItem.Services.findIndex((s) => s.id === service.id);
            state.editItem.Services[index] = service;
        },
        updateInvoiceDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.editItem.invoiceDate = date;
        },
        updateServiceDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.editItem.invoiceServiceDate = date;
        },

        updateInvoiceDueDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.editItem.dueDate = date;
        },
        updateInvoiceCompany(state, action: { payload: { company: Company } }) {
            const { company } = action.payload;
            state.editItem.Company = company;
            console.log(company);
            console.log(state.editItem.Company)
        },
        updateInvoicePartner(state, action: { payload: { partner: Partner } }) {
            const { partner } = action.payload;
            state.editItem.Partner = partner;
        },
        updateInvoiceNumber(state, action: { payload: { invoiceNumber: string } }) {
            const { invoiceNumber } = action.payload;
            state.editItem.invoiceNumber = invoiceNumber;
        },
        addCreateService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            // FIXME: Apprarently push is not a function??

            state.createItem.Services.push(service);
        },
        removeCreateService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            state.createItem.Services = state.createItem.Services.filter((s) => s.id !== service.id);
        },
        updateCreateService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            const index = state.createItem.Services.findIndex((s) => s.id === service.id);
            state.createItem.Services[index] = service;
        },
        updateCreateInvoiceDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.createItem.invoiceDate = date;
        },
        updateCreateServiceDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.createItem.invoiceServiceDate = date;
        },

        updateCreateInvoiceDueDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.createItem.dueDate = date;
        },
        updateCreateCompany(state, action: { payload: { company: Company } }) {
            const { company } = action.payload;
            state.createItem.Company = company;
        },
        updateCreatePartner(state, action: { payload: { partner: Partner } }) {
            const { partner } = action.payload;
            state.createItem.Partner = partner;
        },
        updateCreateInvoiceNumber(state, action: { payload: { invoiceNumber: string } }) {
            const { invoiceNumber } = action.payload;
            state.createItem.invoiceNumber = invoiceNumber;
        },
        resetCreate(state) {
            state.createItem = {
                Services: [] as Service[],
            } as InvoiceSerialized;
        },
        initPartners(state, action: { payload: { partners: Partner[] } }) {
            const { partners } = action.payload;
            state.partners = partners;
        },
        addPartner(state, action: { payload: { partner: Partner } }) {
            const { partner } = action.payload;
            state.partners.push(partner);
        },
        removePartner(state, action: { payload: { partner: Partner } }) {
            const { partner } = action.payload;
            state.partners = state.partners.filter((p) => p.id !== partner.id);
        },
        updatePartner(state, action: { payload: { partner: Partner } }) {
            const { partner } = action.payload;
            const index = state.partners.findIndex((p) => p.id === partner.id);
            state.partners[index] = partner;
        }

    },
});

const invoice = configureStore({
    reducer: invoiceSlice.reducer,
})

export type RootState = ReturnType<typeof invoice.getState>;
export default invoice;
export const { editInvoice, initInvoices, reset, addService, removeService, updateInvoiceCompany, addCreateService, removeCreateService, resetCreate, updateCreateCompany, updateCreateInvoiceDate, updateCreateInvoiceDueDate, updateCreateInvoiceNumber, updateCreatePartner, updateCreateService, updateCreateServiceDate, updateInvoiceDate, updateInvoiceDueDate, updateInvoiceNumber, updateInvoicePartner, updateService, updateServiceDate, updatePartner, addPartner, initPartners, removePartner } = invoiceSlice.actions;