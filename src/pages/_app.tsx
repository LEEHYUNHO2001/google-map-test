import { Global, ThemeProvider } from '@emotion/react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';

import { reset } from '@/styles/reset';
import { theme } from '@/styles/theme';
import { queryClient } from '@/utils/query';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={reset} />
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
