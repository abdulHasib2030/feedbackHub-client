import React, { useContext } from 'react';
import NavbarMain from '../components/NavbarMain';
import { Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import { AuthContext } from '../provider/AuthProvider';
import Loading from '../utlities/Loading';
import toast, { Toaster } from 'react-hot-toast';
import CountUp from 'react-countup';
const Layout = () => {
    const {loading, countReview, countService} = useContext(AuthContext)
            console.log(countReview, countService);
   if(loading) return <Loading/>
    return (
        <div className='relative'>
 
        <div className='max-w-screen-2xl mx-auto'>
        <NavbarMain/>
        <Toaster />
        <Outlet>
          
        </Outlet>
        
    </div>
    <div className="absolute hidden lg:block lg:-right-60  z-50 bg-black p-4 text-white rounded-lg w-44 font-bold">
                <div>
                    <h3>Total Number of Reviews Contributed to Our Platform</h3>
                    <CountUp end={countReview} duration={1} />
                </div>

                <div>
                    <h3>Total Number of Services Contributed to Our Platform</h3>
                    <CountUp end={countService} duration={1} />
                </div>

            </div>
  
    </div>
    );
};

export default Layout;