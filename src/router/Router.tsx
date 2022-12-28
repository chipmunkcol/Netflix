
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Detail from '../pages/Detail';
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
            {path: "tv", element: <TV />},
            {path: "mine", element: <Mine />},
            {path: "search/:search", element: <Search />, children:[
                {path: ":movieId", element: <Detail />}
            ]},
        ]
    }
]) 