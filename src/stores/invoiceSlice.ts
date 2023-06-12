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
                invoiceSerialized.Company = invoice.Company;
                invoiceSerialized.Partner = invoice.Partner;
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
    },
});

const invoice = configureStore({
    reducer: invoiceSlice.reducer,
})

export type RootState = ReturnType<typeof invoice.getState>;
export default invoice;
export const { editInvoice, initInvoices } = invoiceSlice.actions;