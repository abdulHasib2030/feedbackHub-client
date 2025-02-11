import React, { useContext } from 'react';
import NavbarMain from '../components/NavbarMain';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../utlities/Loading';
import toast, { Toaster } from 'react-hot-toast';
import CountUp from 'react-countup';
import Footer from '../components/Footer';
const Layout = () => {
    const {loading, countReview, countService} = useContext(AuthContext)
           
   if(loading) return <Loading/>
    return (
        <div className='relative'>
 
        <div className=''>
        <NavbarMain/>
        
        <Toaster />
       
    </div>
  
  
    </div>
    );
};

export default Layout;