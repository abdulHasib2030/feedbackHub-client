import React from 'react';
import Navbar from '../components/NavbarMain';
import { Outlet, useLoaderData } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Banner from '../components/Banner';
import Feature from '../components/Feature';
import Partner from '../components/Partner';
import RecentReview from '../components/RecentReview';

const Home = () => {
    const loadData = useLoaderData()
    return (
        <div>
          <Layout></Layout>
           <Banner></Banner>
           <Feature data={loadData}></Feature>
           <Partner></Partner>
           <RecentReview></RecentReview>
        </div>
    );
};

export default Home;