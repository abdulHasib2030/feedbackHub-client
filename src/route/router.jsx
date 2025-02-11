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
import MyReviews from '../pages/MyReviews';
import ErrorPage from '../pages/ErrorPage';
import Layout from '../Layout/Layout';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Contact from '../pages/Contact';

// const axiosSecure = useAxiosSecure()

const router = createBrowserRouter([
    {
        path:'/',
        elemetn: <Layout></Layout>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: ()=> fetch(`${import.meta.env.VITE_URL}/`)
            },
            {
                path:'/login',
                element:<Logredirect><Login/></Logredirect>,
                loader: ()=> fetch(`${import.meta.env.VITE_URL}/login`)
            },
            {
                path:'/register',
                element:<Logredirect><Register/></Logredirect>,
                loader: ()=> fetch(`${import.meta.env.VITE_URL}/register`)
            },
            {
                path:'/contact',
                element:<Contact />,
            },
            {
                path: '/add-services',
                element: <PrivateRoute><AddServices></AddServices></PrivateRoute>,
                loader: ()=> fetch(`${import.meta.env.VITE_URL}/addSerShow`)
            },
            {
                path: '/services',
                element: <Services></Services>,
                loader: () => fetch(`${import.meta.env.VITE_URL}/services`),
            },
            {
                path: '/my-services/:email',
                element: <PrivateRoute><MyServices></MyServices></PrivateRoute>,
                loader: ({params})=> fetch(`${import.meta.env.VITE_URL}/myServices/${params.email}`),
                // loader: async ({ params }) => {
                //     const response = await axiosSecure.get(`/myServices/${params.email}`);
                //     return response.data;
                // }
            },
            {
                path: '/my-reviews',
                element: <PrivateRoute><MyReviews/></PrivateRoute>,
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