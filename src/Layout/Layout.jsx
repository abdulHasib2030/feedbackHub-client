import React, { useContext } from 'react';
import NavbarMain from '../components/NavbarMain';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../utlities/Loading';
import toast, { Toaster } from 'react-hot-toast';
const Layout = () => {
    const {loading} = useContext(AuthContext)

   if(loading) return <Loading/>
    return (
        <div className='max-w-screen-2xl mx-auto'>
        <NavbarMain/>
        <Toaster />
        <Outlet>
          
        </Outlet>
        
    </div>
    );
};

export default Layout;