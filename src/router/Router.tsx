
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import TodoList from '../pages/TodoList';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <App />,
        children: [
            {path:'', element: <TodoList />}
        ]
    }
]) 