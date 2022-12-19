import { Outlet } from "react-router-dom"
import { GlobalStyle } from "./style/globalStyle";
import styled, { ThemeProvider } from 'styled-components';
import { darkMode, whiteMode } from "./style/theme";
import { useState } from 'react';
import { useRecoilValue } from "recoil";
import { recoilDarkMode } from "./states/recoilTheme";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';


function App() {

  const isDark = useRecoilValue(recoilDarkMode)

  return (
    <>
      <ThemeProvider theme={isDark ? darkMode : whiteMode}>
        <GlobalStyle />
        <Outlet />
        <ReactQueryDevtools initialIsOpen={true}/>
      </ThemeProvider>
    </>
  );
}

export default App;
  
