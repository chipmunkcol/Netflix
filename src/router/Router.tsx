
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Coin from '../pages/Coin';
import Coins from '../pages/Coins';
import Error from '../pages/Error';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {
                path:'', element: <Coins />
            },
            {
                path:':coinId', element: <Coin />
            }
        ],
        errorElement: <Error />
    }
]) 