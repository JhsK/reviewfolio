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
        {/* <meta name="description" content="프론트엔드 개발자 Sungkyu의 기술 블로그 입니다." />
        <meta name="keywords" content="HTML, CSS, Javascript, React, Next, Frontend, Blog" />
        <meta name="author" content="SungKyu" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sungkyu.info" />
        <meta property="og:title" content="Sungkyu Blog" />
        <meta property="og:image" content="https://github.com/JhsK/sungkyu/blob/master/front/public/profile.jpeg" />
        <meta property="og:description" content="프론트엔드 개발자 Sungkyu의 기술 블로그 입니다." />
        <meta property="og:site_name" content="Sungkyu" />
        <meta property="og:image:width" content="285" />
        <meta property="og:image:height" content="167" /> */}
        <meta property="og:locale" content="ko_KR" />
        <link rel="main icon" href="favicon.ico" />
        {/* <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/moonspam/NanumSquare@1.0/nanumsquare.css"
        /> document head에 넣어야함 */}
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
