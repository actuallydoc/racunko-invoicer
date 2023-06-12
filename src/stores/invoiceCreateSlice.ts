import { type Company } from "@prisma/client";
import { createSlice, configureStore } from "@reduxjs/toolkit";
import type { InvoiceSerialized, Service } from "types";


export const invoiceCreateSlice = createSlice({
    name: "invoiceCreate",
    initialState: {
        //Get the items from local storage if there are any
        createInvoice: {} as InvoiceSerialized,

    },
    reducers: {
        addService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            state.createInvoice.Services.push(service);
        },
        removeService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            state.createInvoice.Services = state.createInvoice.Services.filter((s) => s.id !== service.id);
        },
        updateService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            const index = state.createInvoice.Services.findIndex((s) => s.id === service.id);
            state.createInvoice.Services[index] = service;
        },
        updateInvoiceDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.createInvoice.invoiceDate = date;
        },
        updateServiceDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.createInvoice.invoiceServiceDate = date;
        },
        updateInvoiceDueDate(state, action: { payload: { date: Date } }) {
            const { date } = action.payload;
            state.createInvoice.dueDate = date;
        }

    },
});

const invoice = configureStore({
    reducer: invoiceCreateSlice.reducer,
})

export type RootState = ReturnType<typeof invoice.getState>;
export default invoice;
export const { addService, removeService } = invoiceCreateSlice.actions;