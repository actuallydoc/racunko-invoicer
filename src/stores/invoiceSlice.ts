import type { Partner, Company } from "@prisma/client";
import { createSlice, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import type { InvoiceSerialized, InvoiceStatus, InvoiceType, Service } from "types";

export const invoiceSlice = createSlice({
    name: "invoiceSlice",
    initialState: {
        //Get the items from local storage if there are any
        items: [] as InvoiceSerialized[],
        partners: [] as Partner[],
        createItem: {
            Services: [] as Service[],
        } as InvoiceSerialized,
        companies: [] as Company[],
    },
    reducers: {
        initCompanies(state, action: { payload: Company[] }) {

            state.companies = action.payload;
        },
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
        updateCreateStatus(state, action: { payload: { status: InvoiceStatus } }) {
            const { status } = action.payload;
            state.createItem.status = status;
        },
        addCreateService(state, action: { payload: { service: Service } }) {
            const { service } = action.payload;
            return {
                ...state,
                createItem: {
                    ...state.createItem,
                    Services: [...state.createItem.Services, service]
                }
            };
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
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof invoice.getState>;
export default invoice;
export const { initInvoices, addCreateService, updateCreateStatus, removeCreateService, resetCreate, updateCreateCompany, updateCreateInvoiceDate, updateCreateInvoiceDueDate, updateCreateInvoiceNumber, updateCreatePartner, updateCreateService, updateCreateServiceDate, updatePartner, addPartner, initPartners, removePartner } = invoiceSlice.actions;