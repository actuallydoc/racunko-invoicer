import { z } from 'zod';


import { protectedProcedure, createTRPCRouter } from "@/server/api/trpc";

export const serviceRouter = createTRPCRouter({
    getAll: protectedProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: input.id,
            },
        })
        if (!user) throw new Error("User not found");
        console.log(user);
        return user?.services as string;
    }
    ),
});