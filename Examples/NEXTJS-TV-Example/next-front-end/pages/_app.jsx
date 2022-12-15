import "../styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import "./styles.css";
import Head from "next/head";
import { MarketProvider } from "../providers/market";
import { globalCss } from "@nextui-org/react";
import {SSRProvider} from '@react-aria/ssr'; 
const globalStyles = globalCss({
  body: { background: "#FFF" },
});

function MyApp({ Component, pageProps }) {
  globalStyles();
  return (
    <SSRProvider>
      <NextUIProvider theme={"light"}>
        <MarketProvider>
          <Head>
            <script src="/static/datafeeds/udf/dist/bundle.js" />
          </Head>
          <Component {...pageProps} />
        </MarketProvider>
      </NextUIProvider>
    </SSRProvider>
  );
}

export default MyApp;
