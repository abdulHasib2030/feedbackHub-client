import React from 'react';
import Navbar from '../components/NavbarMain';
import { Outlet } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Banner from '../components/Banner';

const Home = () => {
    return (
        <div>
          <Layout></Layout>
           <Banner></Banner>
        </div>
    );
};

export default Home;