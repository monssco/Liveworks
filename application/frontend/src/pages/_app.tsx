import "../styles/index.css";
import type { AppProps /*, AppContext */ } from 'next/app'
import "../utils/amplify";
import { apolloClient } from "src/graphql/client";

import {
  ApolloProvider,
} from "@apollo/client";


function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={apolloClient()}>
          <Component {...pageProps} />
      </ApolloProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp