import {createBrowserRouter, Routes, Route} from "react-router-dom"
import Root from "../Root";
import About from "./About";
import Header from "../components/Header";
import Home from "./Home";
import Error from "./Error";
import ErrorComponent from "../components/ErrorComponent";
import User from "./User";
import Follower from "./Follower";


export const router = createBrowserRouter([{
    path:"/",
    element: <Root />,
    children: [
    {
        path:'',
        element: <Home />
    },  
    {
        path:'about',
        element: <About />,
        errorElement: <ErrorComponent />
    },
    {
        path:'users/:userId',
        element: <User />,
        children: [
            {
                path:'follower',
                element: <Follower />
            }
        ]
    }
    ],
    errorElement: <Error/>
}])