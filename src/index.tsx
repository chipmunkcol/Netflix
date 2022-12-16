import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { router } from './router/Router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const darkMode = {
  bgColor: "#2c3e50",
  iBgColor: "#111",
	textColor: "#ecf0f1",
  eColor: "#f39c12",
  iTextColor: "#2c3e50"
}

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkMode}>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={true}/>
    </QueryClientProvider>
);

