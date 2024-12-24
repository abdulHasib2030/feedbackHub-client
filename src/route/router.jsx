import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logredirect from './Logredirect';
import Register from '../pages/Register';
import PrivateRoute from './PrivateRoute';
import AddServices from '../pages/AddServices';
import Services from '../pages/Services';
import MyServiceDetails from '../pages/MyServiceDetails';
import MyServices from '../pages/MyServices';

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
            {
                path: '/add-services',
                element: <PrivateRoute><AddServices></AddServices></PrivateRoute>
            },
            {
                path: '/services',
                element: <PrivateRoute><Services></Services></PrivateRoute>,
                loader: () => fetch(`${import.meta.env.VITE_URL}/services`),
            },
            {
                path: '/my-services',
                element: <PrivateRoute><MyServices></MyServices></PrivateRoute>,
            },
            {
                path: '/service-details/:id',
                element: <PrivateRoute><MyServiceDetails></MyServiceDetails></PrivateRoute>,
                loader: ({params}) => fetch(`${import.meta.env.VITE_URL}/service-details/${params.id}`)
            },



        ]
    }
])
export default router;