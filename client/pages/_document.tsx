import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
        <Script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
