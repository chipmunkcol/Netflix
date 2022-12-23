import { Outlet } from "react-router-dom"
import Header from "./pages/Header";
import { GlobalStyle } from "./style/globalStyle";



function App() {


  return (
    <>
        <Header />
        <Outlet />
    </>
  );
}

export default App;
  
