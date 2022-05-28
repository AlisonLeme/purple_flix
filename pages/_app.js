import PropTypes from 'prop-types';

import Head from 'next/head';

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react';

import '../styles/globals.css';
import theme from '../src/theme'
import createEmotionCache from '../src/createEmotionCache';
import CheckAuth from '../src/components/checkAuth/CheckAuth';

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache,  pageProps } = props;

  return (
      <CacheProvider value={emotionCache} >
        <Head>
          <title>PurpleFlix</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <SessionProvider session={pageProps.session}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {
              Component.requireAuth
                ? <CheckAuth Component={Component} pageProps={pageProps} />
                : <Component {...pageProps}/>
            }
          </ThemeProvider>
        </SessionProvider>
      </CacheProvider>
  );
};

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
