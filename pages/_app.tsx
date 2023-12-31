import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ServiceWorker from '../serviceworkierRegistraction/ServiceWorker';


export default function App({ Component, pageProps }: AppProps) {



  return (
    <>
    <Head>
      
      <link rel="manifest" href="/manifest.json" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="apple-mobile-web-app-title" content="PWAGram" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-57x57.png" sizes="57x57" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-60x60.png" sizes="60x60" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-72x72.png" sizes="72x72" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-76x76.png" sizes="76x76" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-114x114.png" sizes="114x114" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-120x120.png" sizes="120x120" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-144x144.png" sizes="144x144" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-152x152.png" sizes="152x152" />
  <link rel="apple-touch-icon" href="/images/icons/apple-icon-180x180.png" sizes="180x180" />
  <meta name="msapplication-TileImage" content="/src/images/icons/app-icon-144x144.png" />
  <meta name="msapplication-TileColor" content="#fff" />
  <meta name="theme-color" content="#3f51b5" />
    </Head>
    {/* <ServiceWorker /> */}
    <Component {...pageProps} />
    </>
  )
}
