import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
} from "@/server/api/trpc";



export const companyRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
            include: {
                companies: true,
            },
        })
        if (!user) throw new Error("User not found");
        return user?.companies;
    }
    ),
    createCompany: protectedProcedure.input(z.object({
        user_id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
        website: z.undefined().or(z.string()),
        vat: z.string(),
    })).mutation(async ({ ctx, input }) => {
        console.log(input);
        const company = await ctx.prisma.company.create({
            data: {
                userId: input.user_id,
                name: input.name,
                email: input.email,
                phone: input.phone,
                address: input.address,
                city: input.city,
                zip: input.zip,
                country: input.country,
                vat: input.vat,
                website: input.website as string,
            }
        });
        return company;
    }
    ),
    updateCompany: protectedProcedure.input(z.object({
        id: z.string(),
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        zip: z.string(),
        country: z.string(),
        //make website optional
        website: z.nullable(z.string()),
        vat: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const company = await ctx.prisma.company.update({
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
                vat: input.vat,
                website: input.website ? input.website : undefined,
            }
        });
        return company;
    }
    ),
    deleteCompany: protectedProcedure.input(z.object({
        id: z.string(),
    })).mutation(async ({ ctx, input }) => {
        const company = await ctx.prisma.company.delete({
            where: {
                id: input.id,
            }
        });
        return company;
    }
    ),
});
