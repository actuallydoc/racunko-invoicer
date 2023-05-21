import { z } from 'zod';


import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

export const serviceRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
            include: {
                services: true,
            },
        })
        if (!user) throw new Error("User not found");
        return user?.services;
    }
    ),
    createService: protectedProcedure.input(z.object({
        userId: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
    })).mutation(async ({ ctx, input }) => {
        const service = await ctx.prisma.service.create({
            data: {
                userId: input.userId,
                name: input.name,
                description: input.description,
                price: input.price,
            }
        });
        return service;
    }
    ),
    updateService: protectedProcedure.input(z.object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
    })).mutation(async ({ ctx, input }) => {
        const service = await ctx.prisma.service.update({
            where: {
                id: input.id
            },
            data: {
                name: input.name,
                description: input.description,
                price: input.price,
            }
        });
        return service;
    }
    ),
    deleteService: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const service = await ctx.prisma.service.delete({
            where: {
                id: input.id
            },
        });
        return service;
    }
    ),
})
