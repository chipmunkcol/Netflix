import { Outlet } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import Header from "./pages/Header";
import { whiteMode } from "./state/whiteModeState";
import { GlobalStyle } from "./style/globalStyle";
import { theme, whiteTheme } from "./style/theme";



function App() {

const isWhiteMode = useRecoilValue(whiteMode)

  return (
    <>
        <ThemeProvider theme={isWhiteMode ? whiteTheme : theme}>
        <GlobalStyle />
          <Header />
          <Outlet />
        </ThemeProvider>
    </>
  );
}

export default App;
  
