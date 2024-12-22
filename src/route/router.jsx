import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logredirect from './Logredirect';
import Register from '../pages/Register';

const router = createBrowserRouter([
    {
        path:'/',
        elemetn: <h1>Home</h1>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path:'/login',
                element:<Logredirect><Login/></Logredirect>
            },
            {
                path:'/register',
                element:<Logredirect><Register/></Logredirect>
            },

        ]
    }
])
export default router;