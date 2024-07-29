import "../styles/globals.css";
import "../styles/colors.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import Head from "next/head";

function PermaLockIt({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <title>PermaLockIt</title>
      <meta property="og:title" content="PermaLockIt" key="og:title" />
      <meta name="description" content="A contract is designed to permanently lock various types of tokens." />
      <meta property="og:description" content="" key="og:description" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.permalockit.com/" />
      <meta property="og:image" content="/og-image.png" />
    </Head>
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
    </>
  );
}

export default PermaLockIt;