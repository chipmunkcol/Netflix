import styled from "styled-components";
import Circle from "./prac/Circle";
import {Outlet} from "react-router-dom"
import Header from "./components/Header";


function Root() {
  return (
    <div>
      {/* <Circle bgColor="teal"/>
      <Circle bgColor="tomato"/> */}
      <Header />
      <Outlet />
    </div>
  );
}

export default Root;
