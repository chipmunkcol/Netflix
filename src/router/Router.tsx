
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Detail from '../pages/Detail';
import Home from '../pages/Home';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {path: "", element: <Home />, children:[
                {path: "movie/:movieId", element: <Detail />}
            ]}
        ]
    }
]) 