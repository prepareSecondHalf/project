import type { AppProps } from "next/app";
// import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Script from "next/script";
import "styles/globals.css";
import { Provider } from "react-redux";
import { applyMiddleware, createStore, compose } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import Reducer from "../_reducers";
import { useState, useEffect } from "react";
import { SessionProvider  } from 'next-auth/react'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

// React-Query Setting
// const client = new QueryClient();
// React-redux Setting
const createStoreWidthMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

export default function App({ Component, pageProps }: AppProps) {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    // <QueryClientProvider client={client}>
    // typeof window !== "undefined" ? (
    domLoaded ? (
      
      <Provider
        store={createStoreWidthMiddleware(
          Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
      >
        <Script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        />
        <Script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        />
        <SessionProvider session={pageProps.session}>
          <Component {...pageProps} />
        {/* <ReactQueryDevtools /> */}
        </SessionProvider>
      </Provider>
    ) : (
      // </QueryClientProvider>
      console.log("ERROR")
    )
  );
}
