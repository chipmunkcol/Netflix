
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Detail from '../pages/Detail';
import DetailTV from '../pages/DetailTV';
import Home from '../pages/Home';
import Mine from '../pages/Mine';
import Search from '../pages/Search';
import TV from '../pages/TV';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {path: "", element: <Home />, children:[
                {path: "movie/:movieId", element: <Detail />}
            ]},
            {path: "tv", element: <TV />, children: [
                {path: ":tvId", element: <DetailTV />}
            ]},
            {path: "mine", element: <Mine />, children: [
                {path: "movie/:movieId", element: <Detail />},
                {path: "tv/:tvId", element: <DetailTV />}
            ]},
            {path: "search/:search", element: <Search />, children:[
                {path: ":movieId", element: <Detail />}
            ]},
        ]
    }
]) 