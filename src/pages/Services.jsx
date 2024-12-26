import React, { useContext, useEffect, useState } from 'react';
import Layout from '../Layout/Layout';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const MyServices = () => {
    const { user, setCountReview, setCountService } = useContext(AuthContext)
    const {result, lenReview} = useLoaderData()
    const [data, setData] = useState(result)
    setCountReview(lenReview)
    setCountService(result.length)

    const handleFilter = (slug) =>{
       
       
            axios.get(`${import.meta.env.VITE_URL}/service/${slug}`)
            .then(res => setData(res.data))
       
    }

    return (
        <div>
            < Helmet title='Services | FeedbackHub' />
                           
            <Layout />
            <div className='my-10'>
                <h1 className='text-center text-3xl font-bold'>All Services</h1>

                <div className="dropdown dropdown-hover flex justify-start z-50 mt-9">
                    <div tabIndex={0} role="button" className="btn bg-black text-white">Filter by Category</div>
                    <ul tabIndex={0} className="dropdown-content menu bg-black rounded-box text-white z-[1] w-52 p-2 shadow">
                        <li onClick={()=> handleFilter('home-cleaning')} className='hover:bg-gray-400' ><a>Home Cleaning</a></li>
                        <li onClick={()=> handleFilter('electronics-repair')}  className='hover:bg-gray-400'><a>Electronics Repair</a></li>
                        <li onClick={()=> handleFilter('catering-services')} className='hover:bg-gray-400'><a>Catering Services</a></li>
                        <li onClick={()=> handleFilter('moving-relocation')} className='hover:bg-gray-400'><a>Moving & Relocation</a></li>
                        <li onClick={()=> handleFilter('fitness-training')} className='hover:bg-gray-400'><a>Fitness Training</a></li>
                    </ul>
                </div>
                <div className='grid  md:grid-cols-2 grid-cols-1 gap-5 mt-7'>
                    {
                        data?.length !== 0 ?
                        data?.map(item =>

                            <Card key={item._id} className="w-full  flex-row">
                                <CardHeader
                                    shadow={false}
                                    floated={false}
                                    className="m-0 w-2/5 shrink-0 rounded-r-none"
                                >
                                    <img
                                        src={item.imageURL}
                                        alt="card-image"
                                        className="h-full w-full object-cover"
                                    />
                                </CardHeader>
                                <CardBody className='text-start'>
                                    <Typography variant="h6" color="gray" className="mb-4 font-bold text-xl">
                                        Title: {item.title}
                                    </Typography>
                                    <Typography variant="h4" color="blue-gray" className="mb-2">
                                        Category: {item.category}
                                    </Typography>
                                    <Typography color="gray" className="mb-8 font-normal">
                                        Description: {item.description}
                                    </Typography>
                                    <Typography color="gray" className="mb-8 font-normal">
                                        Price:  {item.price}
                                    </Typography>
                                    <a href="#" className="inline-block">
                                        <Button variant="text" className="flex items-center gap-2">
                                            <Link to={`/service-details/${item._id}`} className='link link-primary'>See Details</Link>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                                className="h-4 w-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                                />
                                            </svg>
                                        </Button>
                                    </a>
                                </CardBody>
                            </Card>
                        )
                        :
                        <div className='md:col-span-2'>
                            <h1 className='my-5 text-3xl font-bold '>No service found matching your filter criteria. Please try again with different parameters.</h1>
                        </div>
                    }
                </div>
            </div>

            <Footer/>
        </div>
    );
};

export default MyServices;