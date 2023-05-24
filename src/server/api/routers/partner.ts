import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";


export const partnerRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
            include: {
                partners: true,
            },
        })
        if (!user) throw new Error("User not found");
        return user?.partners;
    }),
    updatePartner: protectedProcedure.input(z.object({
        id: z.string(),
        user_id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
        website: z.string().nullable(),
        vat: z.string().nullable(),

    })).mutation(async ({ ctx, input }) => {
        const partner = await ctx.prisma.partner.update({
            where: {
                id: input.id,
            },
            data: {
                name: input.name,
                email: input.email,
                phone: input.phone,
                address: input.address,
                city: input.city,
                zip: input.zip,
                country: input.country,
                website: input.website,
                vat: input.vat,
            }
        });
        return partner;
    }),
    deletePartner: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const partner = await ctx.prisma.partner.delete({
            where: {
                id: input.id,
            },
        });
        return partner;
    }),

    createPartner: protectedProcedure.input(z.object({
        user_id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
        website: z.string().nullable().default(null),
        vat: z.string().nullable(),
    })).mutation(async ({ ctx, input }) => {
        console.log(input);
        const partner = await ctx.prisma.partner.create({
            data: {
                userId: input.user_id,
                name: input.name,
                email: input.email,
                phone: input.phone,
                address: input.address,
                city: input.city,
                zip: input.zip,
                country: input.country,
                website: input.website,
                vat: input.vat,
            }
        });
        return partner;
    }
    )
});