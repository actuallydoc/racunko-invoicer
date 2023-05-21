import { createTRPCRouter } from "@/server/api/trpc";
import { partnerRouter } from "@/server/api/routers/partner";
import { invoiceRouter } from "@/server/api/routers/invoice";
import { companyRouter } from "./routers/company";
import { serviceRouter } from "./routers/services";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  partner: partnerRouter,
  invoice: invoiceRouter,
  company: companyRouter,
  service: serviceRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
