import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { lightTheme } from 'src/theme';
import { ThemeProvider as MuiThemeProvider } from '@mui/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyle from 'src/theme/globalStyle';
import ContextProvider from 'src/store/Provider';

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <title>Reviewfolio</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta property="og:locale" content="ko_KR" />
        <link rel="main icon" href="favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ContextProvider>
            <MuiThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
            </MuiThemeProvider>
          </ContextProvider>
        </Hydrate>
        <ReactQueryDevtools position="bottom-right" />
        {/* {isProduction ? null : <ReactQueryDevtools position="bottom-right" />} */}
      </QueryClientProvider>
    </>
  );
};

export default App;
