import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { ThemeProvider } from 'styled-components';
import { router } from './router/Router';

const darkMode = {
  bgColor: "#2c3e50",
	textColor: "#ecf0f1",
  eColor: "#f39c12",
  iTextColor: "#2c3e50"
}



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkMode}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);

