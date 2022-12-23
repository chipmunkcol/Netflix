import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { router } from './router/Router';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from './style/globalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './style/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
        <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
      </RecoilRoot>
  </React.StrictMode>  
);

