import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import Footer from 'components/Footer';
import Header from 'components/Header';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" />
        <Script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js" />
      </Head>
      <body>
        <Header />
        <Main />
        <NextScript />
        <Footer />
      </body>
    </Html>
  )
}
