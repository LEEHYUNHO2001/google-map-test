import { Global, ThemeProvider } from '@emotion/react';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout';
import { reset } from '@/styles/reset';
import { theme } from '@/styles/theme';
import { queryClient } from '@/utils/query';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Layout>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
          </Hydrate>
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
