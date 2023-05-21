import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Script from 'next/script';
import "styles/globals.css";

import Header from 'components/Header';
import Footer from 'components/Footer';

// React-Query Setting
const client = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <Script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
      <Script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
      <Header />
      <Component {...pageProps} />
      <Footer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
