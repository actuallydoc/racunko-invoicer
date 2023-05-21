import { string, z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";



export const invoiceRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
            include: {
                invoices: {
                    include: {
                        services: true,
                    }
                }
            },
        })
        if (!user) throw new Error("User not found");
        return user?.invoices;
    }),
    createInvoice: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const createdInvoice = await ctx.prisma.invoice.create({
            data: {

                user: {
                    connect: {
                        id: input.id,
                    },
                },
                services: {
                    create: [
                        {
                            name: "Service 1",
                            price: 10,
                        },
                        {
                            name: "Service 2",
                            price: 20,
                        }
                    ]

                },

            },
            include: { services: true }

        })
        console.log(createdInvoice);
        return createdInvoice;
    }),
    updateInvoice: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const updatedInvoice = await ctx.prisma.invoice.update({
            where: {
                id: input.id,
            },
            data: {
                services: {
                    create: [
                        {
                            name: "Service 1",
                            price: 10,
                        },
                        {
                            name: "Service 2",
                            price: 20,
                        }
                    ]

                },
            },
            include: { services: true }
        })
        return updatedInvoice;
    }),
    deleteInvoice: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const deletedInvoice = await ctx.prisma.invoice.delete({
            where: {
                id: input.id,
            },
        })
        return deletedInvoice;
    }
    ),
    deleteAllInvoices: protectedProcedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
        const deletedInvoice = await ctx.prisma.invoice.deleteMany({
            where: {
                userId: input.id,
            },
        })
        return deletedInvoice;
    }
    ),
});