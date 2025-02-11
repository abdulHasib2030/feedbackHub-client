import React, { useContext } from 'react';
import Navbar from '../components/NavbarMain';
import { Outlet, useLoaderData } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Banner from '../components/Banner';
import Feature from '../components/Feature';
import Partner from '../components/Partner';
import RecentReview from '../components/RecentReview';
import { AuthContext } from '../provider/AuthProvider';
import MostReviewService from '../components/MostReviewService';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';
import Count from '../components/Count';
import NavbarMain from '../components/NavbarMain';

const Home = () => {
    const { result, lenReview, lenService, recentReview, mostReviewService } = useLoaderData()
    const { countReview, setCountReview,
        countService, setCountService, } = useContext(AuthContext)
    setCountReview(lenReview)
    setCountService(lenService)
    return (
        <div className='relative '>
            <Helmet
                title="FeedbackHub | Home" />
{/* 
            <Layout ></Layout> */}
            <NavbarMain></NavbarMain>
            <Banner></Banner>
            <Feature data={result}></Feature>
            <Partner></Partner>
            <RecentReview data={recentReview}></RecentReview>
            <Count></Count>
            <MostReviewService data={mostReviewService}></MostReviewService>
            <Footer></Footer>
        </div>
    );
};

export default Home;