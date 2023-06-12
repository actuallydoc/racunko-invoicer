import { type Company } from "@prisma/client";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { InvoiceSerialized, InvoiceType, Service } from "types";

export const invoiceSlice = createSlice({
    name: "invoiceSlice",
    initialState: {
        //Get the items from local storage if there are any
        items: [] as InvoiceSerialized[],
        editItem: {} as InvoiceSerialized,
    },
    reducers: {
        initInvoices(state, action: { payload: InvoiceType[]; }) {
            const invoicesSerialized = action.payload.map((invoice: InvoiceType) => {
                const invoiceSerialized = invoice as InvoiceSerialized;
                invoiceSerialized.Company = invoice.Company as unknown as Company;
                invoiceSerialized.Partner = invoice.Partner as unknown as Company;
                invoiceSerialized.Services = JSON.parse(invoice.services as string) as Service[];
                return invoiceSerialized;
            });
            state.items = invoicesSerialized as unknown as InvoiceSerialized[];
        },
        editInvoice(state, action: { payload: { item: InvoiceSerialized } }) {
            //When u click on the invoice push the data into this state and display it in the invoice form
            const { item } = action.payload;
            state.editItem = item;
            console.log(state.editItem);
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
        }

    },
});

const invoice = configureStore({
    reducer: invoiceSlice.reducer,
})

export type RootState = ReturnType<typeof invoice.getState>;
export default invoice;
export const { editInvoice, initInvoices, addService, removeService } = invoiceSlice.actions;