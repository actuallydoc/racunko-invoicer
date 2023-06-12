import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";



const invoice = z.object({
    id: z.string(),
    invoiceNumber: z.string(),
    partnerId: z.string(),
    companyId: z.string(),
    services: z.string(),
    invoiceDate: z.date(),
    invoiceServiceDate: z.date(),
    dueDate: z.date(),
    status: z.string(),
});
export const invoiceRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
            include: {
                invoices: true,
            },
        })
        if (!user) throw new Error("User not found"); //Handle user not found

        // If user exist fetch its invoices from database
        const invoices = await ctx.prisma.invoice.findMany({
            where: {
                userId: input.id,
            },
            include: {
                Company: true,
                Partner: true,
            },
        });

        return invoices;
    }),
    createInvoice: protectedProcedure.input(invoice).mutation(async ({ ctx, input }) => {


        const createdInvoice = await ctx.prisma.invoice.create({
            data: {
                userId: input.id,
                services: input.services,
                dueDate: input.dueDate,
                invoiceDate: input.invoiceDate,
                invoiceNumber: input.invoiceNumber,
                invoiceServiceDate: input.invoiceServiceDate,
                partnerId: input.partnerId,
                companyId: input.companyId,
                status: "Draft",
            },
        })

        return createdInvoice;
    }),
    editInvoice: protectedProcedure.input(z.object({ id: z.string(), invoiceNumber: z.string(), partnerId: z.string(), companyId: z.string(), services: z.string(), invoiceDate: z.date(), invoiceServiceDate: z.date(), dueDate: z.date(), })).mutation(async ({ ctx, input }) => {
        console.log(input.services);
        const updatedInvoice = await ctx.prisma.invoice.update({
            where: {
                id: input.id,
            },
            data: {
                services: input.services,
                dueDate: input.dueDate,
                invoiceDate: input.invoiceDate,
                invoiceNumber: input.invoiceNumber,
                invoiceServiceDate: input.invoiceServiceDate,
                partnerId: input.partnerId,
                companyId: input.companyId,
            },
        })

        return updatedInvoice;
    }
    ),
    deleteInvoice: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const deletedInvoice = await ctx.prisma.invoice.delete({
            where: {
                id: input.id,
            },
        })

        return deletedInvoice;
    }),

});