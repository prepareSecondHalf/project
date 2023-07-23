import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Script from "next/script";
import Footer from "components/Footer";
import Header from "components/Header";

import "styles/globals.css";
import { SessionProvider } from "next-auth/react";

// React-Query Setting
const client = new QueryClient({
  defaultOptions: {
    queries: {
      // ✅ globally default to 2 seconds
      staleTime: 1000 * 1,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Script
        type="text/javascript"
        src="https://code.jquery.com/jquery-1.12.4.min.js"
      />
      <Script
        type="text/javascript"
        src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
      />
      <SessionProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
