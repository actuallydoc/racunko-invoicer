import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import 'react-toastify/dist/ReactToastify.css';
import { api } from "@/utils/api";
import { Provider } from 'react-redux'
import "@/styles/globals.css";
import invoice from "@/stores/invoiceSlice";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={invoice}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);
