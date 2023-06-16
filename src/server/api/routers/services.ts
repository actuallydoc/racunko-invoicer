import { z } from 'zod';


import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

export const serviceRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {

        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id
            },
            include: {
                Services: true
            }
        })
        if (!user) throw new Error("User not found");
        return user.Services;
    }
    ),
    create: protectedProcedure.input(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        quantity: z.number(),
    })).mutation(async ({ ctx, input }) => {

        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id
            }
        })
        if (!user) throw new Error("User not found");
        const service = await ctx.prisma.service.create({
            data: {
                name: input.name,
                description: input.description,
                price: input.price,
                quantity: input.quantity,
                User: {
                    connect: {
                        id: input.id
                    }
                }
            }
        })
        return service;
    })
});