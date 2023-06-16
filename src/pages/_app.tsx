import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { api } from "@/utils/api";
import { Provider } from 'react-redux'
import "@/styles/globals.css";
import invoice from "@/stores/invoiceSlice";

import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ThemeProvider defaultTheme="system">
      <Provider store={invoice}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
          <Toaster />
        </SessionProvider>
      </Provider>

    </ThemeProvider >

  );
};

export default api.withTRPC(MyApp);
